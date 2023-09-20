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
`;
