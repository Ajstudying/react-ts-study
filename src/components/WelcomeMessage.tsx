//함수의 매개변수를 정의
interface WelcomeMessageProps {
  name?: string;
}

//리액트에서 컴포넌트 함수인데,
// JSX.Element를 반환하는 함수

//React 컴포넌트는 매개변수를 객체로 받아야 함
//{name}: WelcomeMessageProps 이거는 props: WelcomeMessageProps 이렇게 써도 됨.
//React Props: 함수의 객체형태 매개변수
const WelcomeMessage = ({ name = "ChatGPT" }: WelcomeMessageProps) => {
  // const name = "ChatGPT";

  //<></>: Fragment 조각
  // JSX: js 가상DOM 객체, HTML 스타일로 작성
  // <></>: JSX Element임. img 같은 것도 <img /> 이렇게 셀프 클로징 해줘야 함.

  // 컴포넌트에서 최상위 부모엘리먼트는 1개만 존재
  // return <></>; //아래처럼 디브를 넣을 거면 디브가 중복되지 않도록 잘 생각해야 함.
  return (
    <div>
      {/* 바인딩(bind): 데이터(변수값)을 템플릿에 연결 */}
      {/* 리액트는 단방향 바인딩만 지원 코드 -> 템플릿 */}
      {/* {name}: jsx의 자바스크립트 표현식 */}

      {/* jsx: 속성={값} */}
      {/* jsx: 속성={객체} */}
      <h1 style={{ color: "green" }}>Welcome, {name}! </h1>
      <p>This is an example of JSX in React.</p>
    </div>
  );
};

export default WelcomeMessage;
