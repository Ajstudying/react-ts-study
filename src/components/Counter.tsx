import { useState } from "react";
import Alert from "./Alert";

//1. props와 state 둘다 렌더링 결과물에 영향을 주는 변수
//2. props는 함수 매개변수처럼 컴포넌트에 전달
//3. state는 함수 내에 선언된 변수(변수 변경 함수가 존재)

const Counter = () => {
  // const [상태값, 상태변경 함수] = useState<상태타입>(초깃값)
  // const [count, setCount] = useState<number>(0)
  //위처럼 쓰는 것도 가능하지만 자주 쓰진 않음.
  //상태값 정의: UI에 변경이 필요한 변수state
  //상태값이 변경이 생기면 컴포넌트를 다시 렌더링 한다.(함수를 처음부터 끝까지 다시 실행한다.)
  //정확히는
  //1. 상태값이 변경이 생기면 컴포넌트 렌더링 요청이 발생
  //2. 컴포넌트의 속성값  변동이 있으면 렌더링 한다.

  //처음 렌더링 할 때 (mounted)만 초깃값이 적용되고,
  //그 이후에 렌더링 될때는 기존에 저장된 값을 다시 불러옴.
  //렌더링한 값은 배열로 저장되어있어서 그 값을 가져와서 쓰여짐.
  const [count, setCount] = useState(0);
  console.log(count);

  const handleIncrement = () => {
    // 숫자값 증가
    // 상태값 변경 함수에 변경값을 대입
    //상태값 변경 요청 -> innerText가 변경 -> 렌더링
    setCount(count + 1);
  };
  const handleAlertColsed = () => {};

  return (
    <>
      <Alert message="증가되었습니다." onClose={handleAlertColsed} />
      <div>
        <p>현재 카운트: {count}</p>
        <button onClick={handleIncrement}>증가</button>
      </div>
    </>
  );
};

export default Counter;
