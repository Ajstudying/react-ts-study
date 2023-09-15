//ecmascript(es, js)module

// const person = {username: "Alice", age: 30}
// person.username
// person.age
//구조분해할당
// const {username, age} = {username: "Alice", age: 30}

import { appName, greet, user } from "./module";
//디폴트 모듈 자동 완성으로 파일명하고 모듈명을 동일하게 해줌
//import module from "./module";
import metadata from "./module";

// const module = require("./module");
// module.appName;

//타입 추론
// let name = "Javascript!!";

//타입 선언
let name : String;
// name = 1;
name = "Javascript";

console.log(
  greet(`${name}-${appName}-
  ${metadata.version}-${metadata.creator}-
  ${user.name}-${user.age}`, "female") //"female" as string 하면 오류가 생김
  //"female" 이거 자체가 union의 세가지 타입 중 하나인 거임!
);

document.getElementById("root").innerHTML = greet(`${name}-${appName}-
${metadata.version}-${metadata.creator}-
${user.name}-${user.age}`);

//위와 같은 방식은 웹용이라 node.js로 실행 안됨
