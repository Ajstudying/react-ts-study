import { createRoot } from "react-dom/client";
//최상위 컴포넌트
import App from "./App";

//React DOM 엘리먼트 리액트 컴포넌트를 삽입하는 코드가 한 번은 존재
//React 컴포넌트를 삽입할 위치를 지정
const root = createRoot(document.getElementById("root"));
root.render(<App />); //아이디가 root인 애에다가 App을 랜더링 한다.
