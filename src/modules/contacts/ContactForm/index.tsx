import { MutableRefObject, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useContactsData } from "../data";

const ContactForm = () => {
  //programatic방식으로 라우팅 처리
  const navigate = useNavigate(); //클로저 기법으로 가져오는 것.
  //함수로 함수를 리턴하는 것. useNavigate(); 함수, navigate("/contacts"); 이것도 함수
  const nameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const phoneRef = useRef() as MutableRefObject<HTMLInputElement>;

  const { contactsData, createContactData } = useContactsData(0);

  const handleSave = () => {
    // 검증처리
    // 서버연동
    //상태값(데이터)변경
    createContactData({
      id: contactsData.length + 1,
      name: nameRef.current.value,
      phone: phoneRef.current.value,
    });
    //완료가 되면 목록 화면으로 이동
    navigate("/contacts");
  };

  return (
    <div>
      <h3>Contact Form</h3>
      <input ref={nameRef} />
      <input ref={phoneRef} />
      <button onClick={handleSave}>save</button>
    </div>
  );
};

export default ContactForm;
