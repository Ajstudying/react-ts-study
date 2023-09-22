import { MutableRefObject, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostsData } from "../data";

const PostForm = () => {
  const navigate = useNavigate();

  const inputTitle = useRef() as MutableRefObject<HTMLInputElement>;
  const inputContent = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const inputNickname = useRef() as MutableRefObject<HTMLInputElement>;
  const inputFile = useRef<HTMLInputElement>(null);

  const { postsData, mutatePostsData } = usePostsData();

  const handleAdd = () => {
    const title = inputTitle.current;
    const content = inputContent.current;
    const nickname = inputNickname.current;
    const createTime = new Date().toLocaleString();
    const file = inputFile.current?.files?.[0];

    let imageURL; // imageURL 변수 선언
    if (file) {
      imageURL = URL.createObjectURL(file); // 파일이 있다면 Blob URL 생성
    }

    mutatePostsData([
      {
        id: postsData.length + 1,
        title: title.value,
        content: content.value,
        nickname: nickname.value,
        createTime: createTime,
        imgURL: imageURL,
      },
      ...postsData,
    ]);
    navigate("/posts");

    //   const newPost = {
    //     title: title.value,
    //     content: content.value,
    //     nickname: nickname.value,
    //     createTime: createTime,
    //     imgURL: imageURL,
    //   };
    //   title.value = "";
    //   content.value = "";
    //   nickname.value = "";
    //   navigate("/posts", { state: { newPost } });
  };

  const handleCancel = () => {
    navigate("/posts");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: 500,
      }}
    >
      <input placeholder="제목" ref={inputTitle}></input>
      <textarea placeholder="본문" ref={inputContent}></textarea>
      <input placeholder="닉네임" ref={inputNickname}></input>
      <input type="file" ref={inputFile}></input>
      <button onClick={handleAdd}>저장</button>
      <button onClick={handleCancel}>취소</button>
    </div>
  );
};

export default PostForm;
