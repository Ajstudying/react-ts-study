import { Key, MutableRefObject, useEffect, useRef, useState } from "react";
import TodoModifyModal from "./TodoModifyModal";
//use 라인 애들은 다 hook임.

//타입 생성도 가능
interface TodoItem {
  memo: string;
}

const Todo = () => {
  //useState<string[]>([]); 배열 생성할 경우 이렇게 타입을 꼭 명시 해줘야 함.
  //할일 목록 상태(string[])
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [modifyItem, setModifyItem] = useState({ index: 0, memo: "" });
  //배열 외에는 위처럼 기초값을 넣어주는게 나음.

  //입력박스 참조
  //useRef 참조변수 생성, 기본이 null
  //as MutableRefObject<참조할 변수의 타입>
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  //배열에 추가할 때는
  //새로운 배열 생성, 기존 배열 나열, 신규 요소 넣음
  const handleAdd = () => {
    //참조하는 객체의 현재 상태는 참조변수.current
    const input = inputRef.current;
    console.log(input);
    console.log(input.value);

    //pusht, unshift X
    // 리액트 state를 변경할 때는 다른 참조를 넣어야함.
    //객체/배열...

    //항상 상태변경은 상태변경 함수로만 처리해야함.
    //매개변수에는 기존 상태와 다른 참조를 매개변수로 넣어야 함.
    //새로운 객체를 생성해야 함.

    //[]: 배열생성
    //...arr: 배열 요소 나열
    //[...arr]: arr 배열 요소를 나열해서 새로운 배열 생성

    //filter, map, 이런 형태의 새로운 배열을 반환하는 함수
    // setTodoList([...todoList, input.value]);
    setTodoList([{ memo: input.value }, ...todoList]);
    //이렇게 순서는 상관없다.
    input.value = "";
  };

  //해당조건에 맞는 요소만 제외돈 배열을 만듦
  //filter를 친다.
  const handleRemove = (index: number) => {
    setTodoList(todoList.filter((_, idx) => idx !== index));
    // setTodoList(todoList.filter((item, idx) => item.id !== id));
  };

  //모달창을 열고 선택한 항목의 데이터를 모달로 넘겨주는 역할
  const handleOpenModifyModal = (index: number) => {
    //모달 열기
    setShowModifyModal(true);
    //선택한 데이터 넘겨주기
    setModifyItem({ index, memo: todoList[index].memo });
  };

  //수정 후 확인 버튼
  const handleModifyModalConfirm = ({
    index,
    memo,
  }: {
    index: number;
    memo: string;
  }) => {
    //특정 요소의 값만 변경된 배열을 생성하여 반환
    //add던, modify이던 새로운 배열을 만들어서 반환.
    //map
    setTodoList(
      todoList.map((item, idx) => {
        //수정 중인 요소와 같은 인덱스 이면
        if (index === idx) {
          //메모를 수정
          return { index, memo };
        }
        return item;
      })
    );
    setShowModifyModal(false);
  };

  //취소 버튼
  const handleModifyModalCancle = () => {
    setShowModifyModal(false);
  };

  useEffect(() => {
    console.log(todoList);
  }, [todoList]);

  return (
    <div>
      {/* ref 속성에 참조변수 넣기 */}
      <input placeholder="..할일" ref={inputRef}></input>
      <button onClick={handleAdd}>추가</button>
      {todoList.length === 0 && <p>할 일 목록이 없습니다.</p>}
      {todoList.length > 0 && (
        <ul>
          {/* li */}
          {/* li */}
          {/* li */}

          {/* string[] => <li>[] */}
          {/* 데이터 -> JSX.Element로 변경 */}
          {todoList.map((item, index) => (
            //key 속성은 엘레멘트 변동 여부를 추적할 때 사용하는 속성
            //key 가 변동되면, 엘리멘트를 다시 새로 만듦.
            //키값을 변동되는 인덱스보다, 유일한 id값을 쓰는게 좋다.
            <li
              key={index}
              onClick={() => {
                // handleRemove(index);
                //이렇게 쓰는 이유는 button처럼 e를 받거나 안 받거나 인건데
                //remove는 number를 넘겨줘야 하기 때문에 이렇게 수동으로
                handleOpenModifyModal(index);
              }}
            >
              {item.memo}
            </li>
          ))}
        </ul>
      )}
      {showModifyModal && (
        <TodoModifyModal
          // open={showModifyModal} //트랜지션 넣을 경우 이런 느낌으로..?
          //상태값을 자식의 속성으로 넘겨줘야 함.
          index={modifyItem.index}
          memo={modifyItem.memo}
          //자식의 이벤트를 처리하는 함수를 속성으로 넘겨줘야 함.
          onConfirm={handleModifyModalConfirm}
          onCancel={handleModifyModalCancle}
        />
      )}
    </div>
  );
};

export default Todo;
