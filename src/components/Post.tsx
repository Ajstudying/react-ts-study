import { MutableRefObject, useEffect, useRef, useState } from "react";

interface PostItem {
  title: string;
  content: string;
  nickname: string;
  createTime: string;
  imgURL?: string;
}
interface ModifyItem {
  index: number;
  title: string;
  content: string;
  imgURL?: string;
}
const Post = () => {
  const [postList, setPostList] = useState<PostItem[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [editing, setEditing] = useState(null);
  const [modifyItem, setModifyItem] = useState({
    index: 0,
    title: "",
    content: "",
    imgURL: null,
  });

  const inputTitle = useRef() as MutableRefObject<HTMLInputElement>;
  const inputContent = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const inputNickname = useRef() as MutableRefObject<HTMLInputElement>;
  const inputFile = useRef<HTMLInputElement>(null);

  const modifyTitle = useRef() as MutableRefObject<HTMLInputElement>;
  const modifyContent = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const modifyFile = useRef() as MutableRefObject<HTMLInputElement>;

  const handleShowCreate = () => {
    if (!showCreate) {
      setShowCreate(true);
      setShowButton(false);
      setEditing(null);
    }
  };

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

    setPostList([
      {
        title: title.value,
        content: content.value,
        nickname: nickname.value,
        createTime: createTime,
        imgURL: imageURL,
      },
      ...postList,
    ]);
    title.value = "";
    content.value = "";
    nickname.value = "";
    setShowCreate(false);
    setShowButton(true);
  };

  const handleRemove = (index: number) => {
    setPostList(postList.filter((_, idx) => idx !== index));
  };

  const handleModify = ({ index, title, content, imgURL }: ModifyItem) => {
    setPostList(
      postList.map((post, idx) => {
        if (index === idx) {
          return { ...post, title: title, content: content, imgURL: imgURL };
        }
        return post;
      })
    );
    setEditing(null);
    setShowButton(true);
  };
  const handleCancel = () => {
    setShowCreate(false);
    setShowButton(true);
  };

  return (
    <>
      {showCreate && (
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
      )}
      <section>
        {showButton && <button onClick={handleShowCreate}>작성</button>}
        {postList.map((item, index) => (
          <article key={index}>
            {editing === index ? (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    width: 500,
                  }}
                >
                  <input
                    type="text"
                    defaultValue={item.title}
                    ref={modifyTitle}
                  />
                  <textarea
                    defaultValue={item.content}
                    ref={modifyContent}
                  ></textarea>
                  <input type="file" ref={modifyFile} />
                  <button
                    onClick={() => {
                      const file = modifyFile.current?.files?.[0];
                      const imgURL = file ? URL.createObjectURL(file) : null;
                      handleModify({
                        index: modifyItem.index,
                        title: modifyTitle.current.value,
                        content: modifyContent.current.value,
                        imgURL,
                      });
                    }}
                  >
                    확인
                  </button>
                  <button
                    onClick={() => {
                      setEditing(null);
                      setShowButton(true);
                    }}
                  >
                    취소
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
                <h5>{item.nickname}</h5>
                {item.imgURL && (
                  <img width={500} src={item.imgURL} alt="사진" />
                )}
                <h5>{item.createTime}</h5>
                <button
                  onClick={() => {
                    setEditing(index);
                    setModifyItem({ ...modifyItem, index: index });
                    setShowCreate(false);
                  }}
                >
                  수정
                </button>
                <button
                  onClick={() => {
                    handleRemove(index);
                    setEditing(null);
                  }}
                >
                  삭제
                </button>
              </>
            )}
          </article>
        ))}
      </section>
    </>
  );
};

export default Post;
