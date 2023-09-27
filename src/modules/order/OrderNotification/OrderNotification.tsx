import { useEffect, useState } from "react";
import { Container, ItemContainer, Wrapper } from "./styles";

const OrderNotification = () => {
  const [messages, setMessages] = useState<string[]>([]);
  useEffect(() => {
    //컴포넌트가 처음 로딩될 때 응답 대기
    const eventSource = new EventSource(
      "http://localhost:8082/orders/notifications"
    );

    //content-type: text/event-stream
    //메세지가 오면 실행
    eventSource.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    //컴포넌트에서 컴포넌트로 이동하면 삭제 되는 게 아니고 메모리게 그대로 남아있음
    //그래서 ui 이동하기 전에 클린업 작업을 해줘야 함.
    //useEffect 훅에서 함수를 return 하면
    // 컴포넌트가 없어질 때(unmount) 반환 함수가 실행됨
    // 리액트 클린업 펑션 쳐보면 관련 내용이 나옴.
    // 클린업
    //clearTimeout, clearInterval(id)
    //서버에서 응답대기: close().. 처리를 해줘야 함 -> 안하면 메모리에 남아서 메모리 낭비
    return () => {
      eventSource.close();
    };
  }, []);
  return (
    <Wrapper>
      <Container>
        {messages.map((message, index) => (
          <ItemContainer key={index}>{message}</ItemContainer>
        ))}
      </Container>
    </Wrapper>
  );
};
export default OrderNotification;
