import { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";

// /contacts -> Layout -> ContactSidebar
// /contacts/form -> Layout -> contactSidebar - ContactForm(Outlet) 차례로 추가적으로 로딩
const ContactSidebar = () => {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <>
        <aside style={{ width: "200px" }}>
          <h2>Contacts</h2>
          <ul>
            <li>
              <Link to="/contacts/form">Form</Link>
            </li>
            <li>
              <Link to="/contacts">List</Link>
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

export default ContactSidebar;
