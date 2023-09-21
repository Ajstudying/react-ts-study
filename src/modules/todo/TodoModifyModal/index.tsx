import { MutableRefObject, useRef } from "react";
import { ButtonContainer, Container, Wrapper } from "./styles";
//ts컨피그만 routing설정하면서 경로 설정하면 아래로 바꿨을 때 오류 생겨서
//webpack 설정도 추가해줘야 함.
// import { Button } from "../../../components/Button/styles";
import { Button } from "@/components/Button/styles";

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
    // <div
    //   style={{
    //     width: "100%",
    //     height: "100vh",
    //     position: "fixed",
    //     top: 0,
    //     left: 0,
    //     zIndex: 9990,
    //     backgroundColor: "rgba(0,0,0,0.7)",
    //     // opacity: open ? 0 : 1, //트랜지션 넣을 경우 이런 느낌으로..?
    //     // transform: "opacity 0.2s",
    //   }}
    // >
    <Wrapper>
      <Container>
        <input defaultValue={memo} ref={inputRef}></input>
        <ButtonContainer>
          <Button primary onClick={handleConfirm}>
            수정
          </Button>
          <Button onClick={onCancel}>취소</Button>
        </ButtonContainer>
      </Container>
    </Wrapper>
  );
};

export default TodoModifyModal;
