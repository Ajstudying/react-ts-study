import { Link, Outlet } from "react-router-dom";

// /contacts -> Layout -> ContactSidebar
// /contacts/form -> Layout -> contactSidebar - ContactForm(Outlet) 차례로 추가적으로 로딩
const ContactSidebar = () => {
  return (
    <>
      <aside>
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
        <Outlet />
      </section>
    </>
  );
};

export default ContactSidebar;
