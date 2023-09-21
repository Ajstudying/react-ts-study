import { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";

const PostSidebar = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <>
        <aside style={{ width: "200px" }}>
          <h2>Posts</h2>
          <ul>
            <li>
              <Link to="/posts/form">PostForm</Link>
            </li>
            <li>
              <Link to="/posts">PostList</Link>
            </li>
          </ul>
        </aside>
        <section>
          <Suspense fallback={<div>loading...</div>}>
            <Outlet />
          </Suspense>
        </section>
      </>
    </div>
  );
};

export default PostSidebar;
