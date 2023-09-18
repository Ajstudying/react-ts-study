import { useEffect, useState } from "react";
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
  const [showAlert, setShowAlert] = useState(false);
  // console.log(count);
  // console.log(showAlert);
  console.log("--렌더링하는 상태 값--");
  console.log(count, showAlert); // 렌더링은 한번만 일어남.

  const handleIncrement = () => {
    // 숫자값 증가
    // 상태값 변경 함수에 변경값을 대입
    //상태값 변경 요청 -> innerText가 변경 -> 렌더링
    console.log("--카운트값 증가--");
    setCount(count + 1);
    // setShowAlert(true);

    //변경된 상태값 출력
    //상태값은 변경이 안 됨
    // console.log("--변경된 상태 값--");
    // console.log(count, showAlert);
    //렌더링 할 때 실질적으로 변수에 적용이 되고, 지금 위와 같은 상태에서는
    //변수에 적용되어있지 않음.
    //구조분해 할당은 값을 가져오는 거지 객체 참조가 아니기 때문.

    //리액트는 18부터는 이벤트 핸들러 함수 안에서는
    //비동기 블럭에 상태변경 요청을 해도
    //변경 요청 한번에 몰아서 처리한다.
    // (async () => {
    //   setShowAlert(true);
    // })();
  };
  const handleAlertColsed = () => {
    setShowAlert(false);
  };

  //바뀐 상태값 캐치
  //상태값 변경이나 컴포넌트 라이프사이클 변동에 따른 처리
  // useEffect(함수블럭, 의존변수배열)
  // 의존변수가 바뀌면 함수 블럭이 실행됨.
  // 가장 처음에(의존변수가 초기화되는 시점)실행됨.
  useEffect(() => {
    if (count != 0) {
      console.log("--얼럿박스 표시--");
      setShowAlert(true);
    }
  }, [count]); //이 부분에 state값 말고 속성값을 넣는 것도 가능하다.

  return (
    <>
      {/* 조건부 렌더링 괄호 안에는 식1개짜리만 쓸 수 있음. */}
      {showAlert && (
        // <Alert message="증가되었습니다." onClose={handleAlertColsed} />
        <Alert
          message={`증가되었습니다. 현재값: ${count}`}
          onClose={handleAlertColsed}
        />
      )}
      <div>
        <p>현재 카운트: {count}</p>
        <button onClick={handleIncrement}>증가</button>
      </div>
    </>
  );
};

export default Counter;
