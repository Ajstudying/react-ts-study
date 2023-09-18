import { useEffect } from "react";

interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert = ({ message, onClose }: AlertProps) => {
  //const Alert = ({message} : {message: string}) 이렇게 한줄로도 가능.
  const handleClickClose = () => {
    onClose();
  };

  useEffect(
    function () {
      console.log("메시지가 초기화 되거나 변경되었습니다.");
      console.log(message);
    },
    [message]
  );

  return (
    <div>
      <p>{message}</p>
      <button onClick={handleClickClose}>닫기</button>
    </div>
  );
};

export default Alert;
