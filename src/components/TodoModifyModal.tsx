import { MutableRefObject, useRef } from "react";

interface TodoModifyModalProps {
  index: number;
  memo: string;
  onConfirm: (payload: { index: number; memo: string }) => void;
  // open: boolean;//트랜지션 넣을 경우 이런 느낌으로..?
  onCancel: () => void;
}

const TodoModifyModal = ({
  index,
  memo,
  onConfirm,
  // open,//트랜지션 넣을 경우 이런 느낌으로..?
  onCancel,
}: TodoModifyModalProps) => {
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const handleConfirm = () => {
    onConfirm({ index, memo: inputRef.current.value });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9990,
        backgroundColor: "rgba(0,0,0,0.7)",
        // opacity: open ? 0 : 1, //트랜지션 넣을 경우 이런 느낌으로..?
        // transform: "opacity 0.2s",
      }}
    >
      <div style={{ width: "300px", padding: 20, backgroundColor: "white" }}>
        <input defaultValue={memo} ref={inputRef}></input>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 20 }}>
          <button onClick={handleConfirm}>수정</button>
          <button onClick={onCancel}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default TodoModifyModal;