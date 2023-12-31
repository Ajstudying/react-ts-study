import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
//정적 import 방식
// import Todo from "./modules/todo/Todo";
import Layout from "./Layout";
import { lazy } from "react";
import PostSidebar from "./modules/posts/PostSidebar";
import PostList from "./modules/posts/PostList";
import PostForm from "./modules/posts/PostForm";
import PostDetail from "./modules/posts/PostDetail";
import OrderNotification from "./modules/order/OrderNotification/OrderNotification";
// import ContactSidebar from "./modules/contacts/ContactSidebar";
// import ContactList from "./modules/contacts/ContactList";
// import ContactDetail from "./modules/contacts/ContactDetail";
// import ContactForm from "./modules/contacts/ContactForm";

const ContactSidebar = lazy(() => import("./modules/contacts/ContactSidebar"));
const ContactList = lazy(() => import("./modules/contacts/ContactList"));
const ContactDetail = lazy(() => import("./modules/contacts/ContactDetail"));
const ContactForm = lazy(() => import("./modules/contacts/ContactForm"));

//Lazy-loading 기법
//동적인 import 방식 + lazy
//컴포넌트 로딩 시점에 import를 함
// 웹팩으로 빌드하면 스크립트 파일이 나눠짐
// const Todo = lazy(() => import("@/modules/todo/Todo"));

const Todo = lazy(() => {
  // 0.5초의 지연을 시뮬레이션하기 위해
  return new Promise<{
    default: React.ComponentType;
  }>((resolve) =>
    setTimeout(() => {
      resolve(import("@/modules/todo/Todo"));
    }, 500)
  );
});

const ProfileEdit = lazy(() => import("@/modules/profile/ProfilesEdit"));

const App = () => {
  //라우팅 처리하는 곳의 가장 최상위에 BrowserRouter로 감싸줘야 함.
  return (
    //SPA(Single Page Application)
    // 페이지: index.html 1개
    // 경로에 맞는 컴포넌트를 스크립트로 로딩
    <BrowserRouter>
      {/* <OrderNotification /> */}
      {/* 서버에서 응답 대기 후 클라이언트에서 보내면 받는 구조인거임!! */}
      {/* 컴포넌트를 동적으로 로딩할 때 지연시간 동안 보여주는 요소 */}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 컨텐츠 페이지 */}
          {/* index: 해당경로의 기본 화면 */}
          <Route element={<Home />} index />
          {/* 기능 모듈 */}
          <Route path="/profile/edit" element={<ProfileEdit />} />

          <Route path="todo" element={<Todo />} />
          <Route path="contacts" element={<ContactSidebar />}>
            {/* contacts의 디폴트를 contactList로 하는 것↓ */}
            {/* /contacts */}
            <Route element={<ContactList />} index />
            {/* /contacts/form */}
            <Route path="form" element={<ContactForm />} index />
            {/* /conatacts/detail/:id */}
            <Route path="detail/:id" element={<ContactDetail />} />
          </Route>
          <Route path="posts" element={<PostSidebar />}>
            <Route element={<PostList />} index />
            <Route path="form" element={<PostForm />} index />
            <Route path="detail/:id" element={<PostDetail />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
