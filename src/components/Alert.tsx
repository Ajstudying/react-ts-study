interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert = ({ message, onClose }: AlertProps) => {
  //const Alert = ({message} : {message: string}) 이렇게 한줄로도 가능.
  const handleClickClose = () => {
    onClose();
  };
  return (
    <div>
      <p>{message}</p>
      <button onClick={handleClickClose}>닫기</button>
    </div>
  );
};

export default Alert;
