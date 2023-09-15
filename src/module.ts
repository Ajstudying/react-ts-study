//js: es-module 방법에서 모듈을 내보내는 방법
//내보내고 싶은 모듈 앞에 export를 쓰면 됨
// 모듈: 코드 집합 - 변수, 함수, 객체, 클래스, 인터페이스....

// export(수출): 내보내기
// export function greet(name: string, age? : number) { //age? 필수값이 아님.
// console.log(age); //값이 없으면 undefinded로 뜸

//매개변수? : 타입 - 옵셔널
// 매개변수 : 타입 = default 값
// 매개변수 : 값1 | 값2 | 값3 - 유니온(union)타입 합집합
export function greet(
  name: string,
  gender? : "unspecified" | "female" | "male", //유니온타입
  age? : number, 
  nation : string = "korea") { 
  console.log(nation); //매개변수로 대입을 안하면
  return `Hello, ${name}!`;
}

export const appName = "Myapp";

//인터페이스: 객체 구조를 선언
interface Person {
  name : string;
  age? : number;
  //유니온 타입도 추가 가능, 인터페이스는 디폴트 속성 추가 안됨.
  gender? : "unspecified" | "female" | "male",
}

interface User extends Person {
  nickname?: string;
  printInfo? : () => void //함수
}

export const user : User = {
  //Person 인터페이스 속성(property)
  name: "Alice",
  age: 30,
  //인터페이스에 선언된 애들까지만 쓸 수 있음.
  gender : "female",
  //User 인터페이스 속성(property)
  nickname: "Ali",
  printInfo: () => {
    console.log(user.nickname)
  }
}

//타입스크립트는 user의 타입이 확정되게 됨.
// export const user = {
//   name: "Alice",
//   age: 30,
// };

//속성(필드) 추가가 안됨
// user.country = "korea";

//제네릭 - 제너릭(generic) : 타입을 매개변수로 사용
function identity<T>(arg: T): T {
  return arg;
}
const result = identity<string>(user.name); 
const result2 = identity(user.age); //타입 추론으로 인해 여기는 제네릭을 삭제해도 가능.
const result3 = identity(user); //타입 레퍼런싱
// const result3 = identity<User>(user.name); //오류 생김

//기본 모듈 내보내기
export default {
  version: "1.0",
  creator: "Aejin Kang",
};

// module.export = {
//   greet,
//   appName,
// };
