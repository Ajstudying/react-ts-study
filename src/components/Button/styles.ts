import styled from "@emotion/styled";

//styled-component
//실질적으로는 아래와 같은 클래스가 생성돼서 삽입됨.
//style 집합에 대한 class를 생성을 함
// <button class="css-239sadlkj">..
//label: 클래스명 케밥케이스
//-> 클래스명을 추가해주는 방법
//클래스명으로 컴포넌트 찾기가 쉽다.
export const PrimaryButton = styled.button`
  label: primary-btn; //css로는 안 만들어지고, 클래스에 이름을 넣을 때만 사용된다.
  background-color: #acafac;
  color: white;
`;

//ButtonProps는 HTMLButtonElement의 HTML 속성을 확장
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  // small? : boolean;
  // large? : boolean;
  // bold? : boolean;
  size?: "md" | "sm" | "lg";
}

const getHeight = ({ size }: ButtonProps) => {
  //...
  if (size === "sm") {
    return 25;
  } else if (size === "lg") {
    return 40;
  } else {
    return 30; //default medium
  }
  //.....
};

//style.엘레먼트명<속성타입>`스타일목록`
export const Button = styled.button<ButtonProps>`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  /* ${(속성) => "반환식"} 반환식은 문자열 말고 숫자도 가능 */
  background-color: ${({ primary }) => (primary ? "crimson" : "gray")};
  font-size: ${({ primary }) => (primary ? 16 : 13)}px;
  line-height: ${({ primary }) => (primary ? 16 : 13)}px;
  height: ${getHeight}px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  //.css-t8woi7:hover
  // &: 현재 스타일드 컴포넌트의 클래스명
  &:hover {
    background-color: ${({ primary }) => (primary ? "darkblue" : "darkgreen")};
  }
`;

//기존 스타일드 컴포넌트를 이용하여 다른 컴포넌트 생성
//기존 스타일 + 신규 스타일의 css 클래스가 생성됨.
export const OutlinedButton = styled(Button)`
  border: 2px solid ${({ primary }) => (primary ? "crimson" : "olive")};
  background-color: white;
  color: ${({ primary }) => (primary ? "darkgreen" : "crimson")};
`;
