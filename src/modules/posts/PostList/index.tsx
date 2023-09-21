import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostDetail from "../PostDetail";
import { PostContainer } from "./styles";

interface PostItem {
  title: string;
  content: string;
  nickname: string;
  createTime: string;
  imgURL?: string;
}

const PostList = () => {
  const [postList, setPostList] = useState<PostItem[]>([]);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [modifyItem, setModifyItem] = useState({
    index: 0,
    title: "",
    content: "",
    imgURL: "",
  });

  const navigate = useNavigate();

  const handleRemove = (index: number) => {
    setPostList(postList.filter((_, idx) => idx !== index));
  };
  const handleClickItem = (index: number) => {
    // navigate(`/posts/detail/${index}`);
    setShowModifyModal(true);
    setModifyItem({
      index,
      title: postList[index].title,
      content: postList[index].content,
      imgURL: postList[index].imgURL,
    });
  };

  const handleModifyModalConfirm = ({
    index,
    title,
    content,
    imgURL,
  }: {
    index: number;
    title: string;
    content: string;
    imgURL: string;
  }) => {
    setPostList(
      postList.map((item, idx) => {
        if (index === idx) {
          return { ...item, title, content, imgURL };
        }
        return item;
      })
    );
    setShowModifyModal(false);
  };

  const location = useLocation();
  const newPost = location.state?.newPost;

  useEffect(() => {
    if (newPost) {
      setPostList([newPost, ...postList]);
    }
  }, [newPost]);

  return postList.map((item, index) => (
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
              handleRemove(index);
            }}
          >
            삭제
          </button>
        </div>
        {showModifyModal && (
          <PostDetail
            index={modifyItem.index}
            title={modifyItem.title}
            content={modifyItem.content}
            onConfirm={handleModifyModalConfirm}
          />
        )}
      </article>
    </PostContainer>
  ));
};

export default PostList;
