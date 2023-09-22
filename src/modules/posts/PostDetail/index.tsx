import { MutableRefObject, useRef } from "react";
import { POSTS_DATA_KEY, PostData, usePostsData } from "../data";
import { useNavigate } from "react-router-dom";

const PostDetail = (id: number) => {
  const { postsData, createPostData } = usePostsData(0);

  const modifyTitle = useRef() as MutableRefObject<HTMLInputElement>;
  const modifyContent = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const modifyFile = useRef() as MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();

  const postJson = localStorage.getItem(POSTS_DATA_KEY);
  const post = JSON.parse(postJson) as PostData[];

  const handleConfirm = (id: number) => {};
  const handleCancle = () => {
    navigate("/posts");
  };

  return (
    <>
      <article id="id">
        <input defaultValue={title} ref={modifyTitle}></input>
        {imgURL !== null ? (
          <input defaultValue={imgURL} type="file" ref={modifyFile} />
        ) : (
          <input type="file" ref={modifyFile} />
        )}
        <textarea defaultValue={content} ref={modifyContent}></textarea>
        <button
          onClick={() => {
            handleConfirm(id);
          }}
        >
          수정
        </button>
        <button onClick={handleCancle}>취소</button>
      </article>
    </>
  );
};

export default PostDetail;
