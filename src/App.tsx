import { Button, ButtonProps, PrimaryButton } from "./components/Button/styles";
// FC: function component
// 임포트 경로는 제대로 하고 이름만 바꿔서 사용 가능.
import FCButton from "./components/Button";
import { useState } from "react";

const App = () => {
  //인터페이스의 필드형식을 가져오려면
  // 인터페이스["필드명"] -> ex) "md" | "sm" | "lg", string
  const [size, setSize] = useState<ButtonProps["size"]>("md");
  // const [size, setSize] = useState<"md" | "sm" | "lg">("md");

  return (
    <>
      {/* HTMLButtonElemnet의 기본 속성을 모두 사용할 수 있음. */}
      <PrimaryButton
        onClick={() => {
          alert("click");
        }}
      >
        버튼
      </PrimaryButton>
      {/* Function Component에 선언된 속성만 사용 가능(타입스크립트) */}
      <FCButton label="버튼" />
      <Button primary>primary</Button>
      <Button>default</Button>
      {/* ------ */}
      {/* <Button size="md">default - md</Button>
      <Button size="sm">default - sm</Button>
      <Button size="lg">default - lg</Button> */}
      <button onClick={() => setSize("lg")}>스타일변경 - 라지</button>
      <button onClick={() => setSize("sm")}>스타일변경 - 스몰</button>
      {/* styled-components의 속성이 바뀌면 클래스가 변경이된다. 
          근데, 현재 없는 클래스면 style 태그와 클래스를 header에 생성 
          그래서 리액트 초기 로딩이 오래걸림.*/}
      <Button size={size}>default - dynamic</Button>
    </>
  );
};

export default App;
