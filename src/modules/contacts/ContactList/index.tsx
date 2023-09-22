import { useNavigate } from "react-router-dom";
import { useContactsData } from "../data";
import { useState } from "react";

const ContactList = () => {
  const [page, setPage] = useState(0);
  //페이지 로그 두번 찍힘.
  //컴포넌트가 마운팅 될 때 1번 찍히고
  //contactData를 fetcher로 가져온 다음에 상태가 업데이트 된 다음 1번 더 찍힘.
  // console.log(page);
  const { contactsData: contacts } = useContactsData(page);

  const navigate = useNavigate();

  const handleClickItem = (id: number) => {
    navigate(`/contacts/detail/${id}`);
  };

  return (
    <div>
      <h3>Contact List</h3>
      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next
      </button>
      <ul>
        {contacts.map((c) => (
          <li
            style={{ cursor: "pointer" }}
            key={`item-${c.id}`}
            onClick={() => {
              handleClickItem(c.id);
            }}
          >
            <span>
              {c.name} - {c.phone}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
