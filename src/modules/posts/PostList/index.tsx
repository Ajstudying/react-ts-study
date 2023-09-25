import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostDetail from "../PostDetail";
import { PostContainer } from "./styles";
import { usePostsData } from "../data";
import http from "@/utils/http";
import axios from "axios";

interface PostItem {
  id?: number;
  title: string;
  content: string;
  // nickname: string;
  createTime: string;
  imgURL?: string;
}

//*** 이벤트 업 이벤트 다운 공부할 것**** */
const PostList = () => {
  const [page, setPage] = useState(0);
  const { postsData: posts, isPostDataValidating } = usePostsData(page);

  const [postList, setPostList] = useState<PostItem[]>([]);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [modifyItem, setModifyItem] = useState({
    index: 0,
    title: "",
    content: "",
    imgURL: "",
  });

  const navigate = useNavigate();

  // const handleRemove = (index: number) => {
  //   mutatePostsData(posts.filter((_, idx) => idx !== index));
  // };
  const handleClickItem = (index: number) => {
    // navigate(`/posts/detail/${index}`);
    setShowModifyModal(true);
    setModifyItem({
      index,
      title: posts[index].title,
      content: posts[index].content,
      imgURL: posts[index].imgURL,
    });
  };

  const handleremove = (index: number) => {
    (async () => {
      const id = postList[index].id;
      const response = await http.delete(`/posts/${id}`);
      if (response.status === 200) {
        setPostList(postList.filter((_, idx) => idx !== index));
      }
    })();
  };

  const handleCancle = () => {
    setShowModifyModal(false);
  };

  // const location = useLocation();
  // const newPost = location.state?.newPost;

  // useEffect(() => {
  //   if (newPost) {
  //     setPostList([newPost, ...postList]);
  //   }
  // }, [newPost]);

  useEffect(() => {
    (async () => {
      const response = await http.get("/posts"); //any 타입 js처럼 사용 가능
      // const response = await http.get<PostData>("/posts");// 타입선언도 가능.
      // const response = await http.get("/post");
      console.log(response);
    })();
  }, []);

  return posts.map((item, index) => (
    <PostContainer>
      <article id="item.id" key={index}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            width: 500,
          }}
        >
          <h3>{item.title}</h3>
          <p>{item.content}</p>
          <h5>{item.nickname}</h5>
          {item.imgURL && <img width={500} src={item.imgURL} alt="사진" />}
          <h5>{item.createTime}</h5>
          <button
            onClick={() => {
              handleClickItem(index);
            }}
          >
            수정
          </button>
          <button
            onClick={() => {
              // handleRemove(index);
            }}
          >
            삭제
          </button>
        </div>
        {/* {showModifyModal && <PostDetail id={modifyItem.index} />} */}
      </article>
    </PostContainer>
  ));
};

export default PostList;
