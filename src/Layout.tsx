import { Suspense } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ProfileData, useProfileData } from "./modules/profile/data";

function Layout() {
  //바로 아래의 방식은 오류가 생김.
  // const { nickname, email } : ProfileData = {
  //   nickname: "Alice",
  //   email: "alice@gmail.com",
  //   username: "alice",
  // };

  //객체 선언 후 타입 선언 가능 대신, username 접근이 안됨.
  // const { nickname, email } = {
  //   nickname: "Alice",
  //   email: "alice@gmail.com",
  //   username: "alice",
  // } as ProfileData;

  // swr 데이터 -> 상태값
  // 데이터가 변경되면 컴포넌트가 다시 렌더링 된다.
  // 필요한 것만 데려오는 것도 가능함.
  const { profileData } = useProfileData();
  const { nickname } = profileData;
  // console.log(profileData);

  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  return (
    <div>
      <header>
        <em style={{ cursor: "pointer" }} onClick={handleEditProfile}>
          {profileData.nickname}
        </em>
      </header>
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
