import { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div id="layout">
      {/* 링크들이 들어가는 곳 */}
      <nav>
        <ul style={{ display: "flex", gap: "40px" }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {/* a태그를 안 쓰는 이유는 처음부터 다시 다 받아오기 때문 */}
            {/* 아래의 Link 컴포넌트도 웹화면에서는 a태그로 나오지만 */}
            {/* 화면 이동은 프리벤트 하고 맞는 컴포넌트만 로딩한다. */}
            {/* url에 맞는 컴포넌트만 이동 */}
            <Link to="/todo">Todo</Link>
          </li>
          <li>
            <Link to="/contacts">Contacts</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </nav>
      {/* 세부화면들이 나오는 곳 */}
      <main>
        {/* 세부경로의 컴포넌트들이 로딩위치 */}
        {/* suspense 태그는 컴포넌트를 동적으로 로딩할 때 */}
        {/* 지연시간동안 보여주는 요소 */}
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default Layout;
