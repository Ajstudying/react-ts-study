import { MutableRefObject, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface TodoModifyModalProps {
  index: number;
  title: string;
  content: string;
  imgURL?: string;
  onConfirm: (payload: {
    index: number;
    title: string;
    content: string;
    imgURL: string;
  }) => void;
  onCancle: () => void;
}

const PostDetail = ({
  index,
  title,
  content,
  imgURL,
  onConfirm,
  onCancle,
}: TodoModifyModalProps) => {
  const modifyTitle = useRef() as MutableRefObject<HTMLInputElement>;
  const modifyContent = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const modifyFile = useRef() as MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();

  // const [modifyItem, setModifyItem] = useState({
  //   index: 0,
  //   title: "",
  //   content: "",
  //   imgURL: null,
  // });

  const handleConfirm = (index: number) => {
    const file = modifyFile.current?.files?.[0];
    const imgURL = file ? URL.createObjectURL(file) : null;
    const title = modifyTitle.current.value;
    const content = modifyContent.current.value;

    onConfirm({ index, title: title, content: content, imgURL: imgURL });
  };

  return (
    <>
      <article id="index">
        <input defaultValue={title} ref={modifyTitle}></input>
        {imgURL !== null ? (
          <input defaultValue={imgURL} type="file" ref={modifyFile} />
        ) : (
          <input type="file" ref={modifyFile} />
        )}
        <textarea defaultValue={content} ref={modifyContent}></textarea>
        <button
          onClick={() => {
            handleConfirm(index);
          }}
        >
          수정
        </button>
        <button onClick={onCancle}>취소</button>
      </article>
    </>
  );
};

export default PostDetail;
