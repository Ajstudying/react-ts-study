import { memo, useEffect } from "react";

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

//memo(컴포넌트)
// 컴포넌트를 메모이제이션(memoization)
//컴포넌트의 속성값이 바뀌지 않으면, diff나 rendering을 수행하지 않겠다는 뜻.
//최적확를 위해서만 사용함. 그냥 사용하면 버그 생길 수 있음.
//메모이제이션을 해야 되는 조건을 별도로 줄 수 있음.

//memo(컴포넌트, 조건함수(boolean 반환)) 이 아래의 방법은 웬만하면 안 쓰는게 나음.
// export default memo(
//   Alert,
//   (prevProps, nextProps) => prevProps.message === nextProps.message
// );
// if (prevProps.message === nextProps.message) {
//   return true;
// } else {
//   return false;
// }
// });

// export default Alert;

export default memo(Alert);
