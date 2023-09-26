import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostDetail from "../PostDetail";
import { PostContainer } from "./styles";
import { PostData, usePostsData } from "../data";
import http from "@/utils/http";

//*** 이벤트 업 이벤트 다운 공부할 것**** */
const PostList = () => {
  const [page, setPage] = useState(0);
  const {
    postsData: posts,
    removePostData,
    isPostDataValidating,
  } = usePostsData(page);
  const [postList, setPostList] = useState<PostData[]>([]);

  const [showModifyModal, setShowModifyModal] = useState(false);
  const [modifyItem, setModifyItem] = useState({
    index: 0,
    title: "",
    content: "",
    imgURL: "",
  });

  const navigate = useNavigate();

  const handleClickItem = (id: number) => {
    navigate(`/posts/detail/${id}`);
  };

  const handleRemove = (id: number) => {
    setPostList(postList.filter((post) => post.id !== id));
    removePostData(id);
  };
  // const handleRemove = (index: number) => {
  //   mutatePostsData(posts.filter((_, idx) => idx !== index));
  // };

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
      if (response.data.length !== 0) {
        setPostList(response.data);
      }
    })();
  }, []);

  return (
    <>
      <PostContainer>
        {postList.map((item) => (
          <article
            key={`post-item-${item.id}`}
            onClick={(p) => {
              // handleClickItem(p.id);
            }}
          >
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
              {/* <h5>{item.nickname}</h5> */}
              {item.imgURL && <img width={500} src={item.imgURL} alt="사진" />}
              <h5>{item.createTime}</h5>
              <button
                onClick={() => {
                  handleClickItem(item.id);
                }}
              >
                수정
              </button>
              <button
                onClick={() => {
                  handleRemove(item.id);
                }}
              >
                삭제
              </button>
            </div>
          </article>
        ))}
      </PostContainer>
    </>
  );
};

export default PostList;
