import { MutableRefObject, useEffect, useRef, useState } from "react";
import { POSTS_DATA_KEY, PostData, usePostsData } from "../data";
import { useNavigate, useParams } from "react-router-dom";
import http from "@/utils/http";
import axios from "axios";
import { PostContainer } from "../PostList/styles";

interface ModifyPost {
  title: string;
  content: string;
}

const PostDetail = () => {
  //초기값 설정을 꼭 해줘야 함!! ㅠㅠ
  const [post, setPost] = useState<PostData | null>(null);
  const [modifyPost, setModifyPost] = useState<ModifyPost>();
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);

  const modifyTitle = useRef() as MutableRefObject<HTMLInputElement>;
  const modifyContent = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const modifyFile = useRef() as MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();

  // const postJson = localStorage.getItem(POSTS_DATA_KEY);
  // const post = JSON.parse(postJson) as PostData[];

  const handleConfirm = (id: number) => {
    const file = modifyFile.current?.files?.[0];

    let imageURL; // imageURL 변수 선언
    if (file) {
      imageURL = URL.createObjectURL(file); // 파일이 있다면 Blob URL 생성
    }

    setModifyPost({
      title: modifyTitle.current.value,
      content: modifyContent.current.value,
    });

    (async () => {
      await http.put(`/posts/${id}`, modifyPost);
      navigate("/posts");
    })();
  };
  const handleCancle = () => {
    navigate("/posts");
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get<PostData>(
          `http://localhost:8080/posts/${postId}`
        );

        if (response.status === 200) {
          setPost(response.data);
          setModifyPost({
            title: response.data.title,
            content: response.data.content,
          });
        }
      } catch (e: any) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <>
      <PostContainer>
        {post ? (
          <article key={post.id}>
            <input defaultValue={post.title} ref={modifyTitle}></input>
            {post.imgURL !== null ? (
              <input defaultValue={post.imgURL} type="file" ref={modifyFile} />
            ) : (
              <input type="file" ref={modifyFile} />
            )}
            <textarea
              defaultValue={post.content}
              ref={modifyContent}
            ></textarea>
            <button
              onClick={() => {
                handleConfirm(post.id);
              }}
            >
              수정
            </button>
            <button onClick={handleCancle}>취소</button>
          </article>
        ) : (
          <p>Loading...</p>
        )}
      </PostContainer>
    </>
  );
};

export default PostDetail;
