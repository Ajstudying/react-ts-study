// 리액트는 컴포넌트(component) 단위 개발
// 컴포넌트: 페이지, 세부화면, 위젯, 아이콘, 버튼
// 컴포넌트: 재사용이 가능한 UI 조각
// 컴포넌트: 템플릿(틀) + 작동코드

// 리액트 컴포넌트는 파일명과 함수명을 파스칼케이스(대문자)로 작성
// 원래 리액트 컴포넌트는 class/function 2가지 형태였고,
// 기본이 class 형식이었음.
// 원래 자바스크립트에서 생성자 삼수 new Person()는 원래 파스칼 케이스
// function Person() {name; age; function printInfo() {}} <<private 개념이 없어서 지금은 js에서 안 씀.

//리액트는 컴포넌트는 함수
// JSX Element를 반환하는 함수

//사진 파일 삽입(파일을 참조하는 모듈명은 스네이크케이스로 적는게 충돌이 덜 남)
import react_icon from "./assets/react-icon.png"; //types index.ts 에 확장자명을 추가해줘야 오류가 안남.
import intro from "./assets/intro.mp4";
import WelcomeMessage from "./components/WelcomeMessage";
import Button from "./components/Button";

const App = () => {
  const handlerClickPrimaryButton = () => {
    alert("Click me!");
  };
  const handlerClickSecondaryButton = () => {
    alert("Cancel");
  };
  // React.createElement(component, props, ...children)
  // React.createElement("div", null, "Hello, React!!")
  // <img src={react_icon} /> //이미지 모듈을 넣는 방법
  return (
    <div>
      <img src={react_icon} alt="react icon" height={16} />
      <span>Hello, React!!</span>
      <div>
        <video width={480} height={270} controls loop autoPlay muted>
          <source src={intro} type="video/mp4" />
        </video>
      </div>
      {/* React Props에 값을 대입 */}
      <WelcomeMessage name={"React Typescript"} />

      {/* props-down, event-up */}
      {/* 부모-자식 컴포넌트간 데이터 교환방법 */}
      <Button
        label="Click me!"
        color="primary"
        onClick={handlerClickPrimaryButton}
      />
      <Button
        label="Cancel"
        color="secondary"
        onClick={handlerClickSecondaryButton}
      />
    </div>
  ); //이렇게 jsx 문법을 쓰려면 앞 쪽에 import react를 해줘야 한다.
  //<WelcomeMessage name={"React Typescript"} />
  //<WelcomeMessage /> 디폴트값 출력
};

export default App;
