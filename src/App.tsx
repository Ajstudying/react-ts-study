import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Todo from "./modules/todo/Todo";

const App = () => {
  //라우팅 처리하는 곳의 가장 최상위에 BrowserRouter로 감싸줘야 함.
  return (
    <BrowserRouter>
      <Routes>
        {/* 컨텐츠 페이지 */}
        <Route path="/" element={<Home />} index />
        {/* 기능 모듈 */}
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
