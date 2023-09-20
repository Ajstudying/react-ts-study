import styled from "@emotion/styled";

/*
div (
  input - button
  ul
    - li
      button - span
) 
*/
export const TodoConatainer = styled.div`
  // 여기에는 클래스 선택자를 안 쓰는게 낫다.
  // 다른 곳에서 클래스 이름이 중복될 수 있기 때문
  // #theme.light(라이트 테마)
  label: todo-conatainer;
  header {
    input {
      border: 1px solid green;
    }
    /* > 자식 선택자만 선택하는 방법 */
    /* 자식선택자만 이용 */
    > button {
      border: 2px solid green;
      background: white;
    }
  }

  ul {
    margin-top: 20px;

    li {
      padding: 7px;
      border: 2px solid green;
      margin-bottom: 3px;
      width: fit-content;

      button {
        border: 2px solid green;
        background: olive;
        color: white;
        margin-right: 3px;
      }
    }
  }
  footer {
    color: green;
    data {
      font-weight: bold;
    }
  }

  //id선택을 먼저 한 것
  // #app-theme.light
  // app-theme id가 있는 요소의 클래스가 light인 요소 선택
  // #app-theme.light 요소 자손인 현재클래스를 선택 -> &
  //#app-theme.light css-fjslf header input {...} << 실제 스타일 적용
  #app-theme.light & {
    header {
      input {
        background-color: white;
        color: black;
      }
    }
  }

  #app-theme.dark & {
    header {
      input {
        background-color: black;
        color: white;
      }
    }
  }
`;
