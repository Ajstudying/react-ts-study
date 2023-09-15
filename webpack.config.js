// commonjs 방식의 모듈 import
const HtmlWebpackPlugin = require("html-webpack-plugin");

//commonjs 방식의 모듈선언 및 내보내기
// ↓ 자바스크립트로 타입을 쓰는 방법
/** @type {import('webpack').Configuration} */
module.exports = {
  // 시작지점의 코드(여기서부터 번들링이 시작)
  entry: "./src/index.ts",
  //entry부터 시작해서 확장자가 ts/js 인 파일들을 번들링 하겠다.
  resolve: {
    extensions: [".ts", ".js"],
  },
  //모듈 해석기
  module: {
    rules: [
      {
        test: /\.ts$/, //ts 파일에 대해서
        use: "ts-loader", // ts-loader를 이용하여 해석하겠다.
        exclude: /node_modules/, //예외 디렉터리 얘는 이미 컴파일 된 애들.
      },
    ],
  },
  // 번들링이 완료된 결과물에 대한 설정
  output: {
    //bundle.js -> js/[name]-[chunkhash].js << 번들 파일에 해시추가(chunkhash)
    filename: "js/[name]-[chunkhash].js",
    //결과물들의 위치
    path: __dirname + "/dist", //__dirname 현재 디렉토리
    clean: true, //수정했을 경우 js파일이 추가로 생성되기 때문에 이 문구를 추가해줘야 함.
    //기존 빌드 결과물 삭제
  },
  plugins: [
    //번들된 파일을 삽입할 HTML(HBS)/마크업 파일을 설정
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      // inject: "body", //이렇게 하면 template 관련 script가 head가 아니고 body에 생성됨.
      //<script defer="defer" src="bundle.js"></script>
      //defer가 해당 body의 로딩이 다 끝난 다음에 스크립트가 실행됨.
      //외부에 있는 걸 삽입할 때는(외부에 있는 파일이 언제 로딩이 다 될지 모르기 때문에) defer와 async를 써서 따로 처리 되게 하는게 좋다.
    }),
  ],
  //웹팩 개발서버에 대한 설정을 넣는 곳
  //node.js express 프래임 워크를 이용하여 웹서버를 띄움
  // ./dist 경로에 띄움
  // 웹팩 개발 서버는 기본적으로 번들결과를 메모리에만 저장을 함
  // 램(ram)에 파일 디렉터리 형태로 구조를 만들어서 저장
  // 램디스크처럼 ./dist/index.html, ./dist/bundle.js
  devServer: {
    static: "./dist", //이걸 안 쓰면 실행하는 현재 위치에서 뜸.
    //디폴트가 현재 경로로 돌아가기 때문.
    // 그렇게 되면 node moudules 등을 다 읽어버리기 때문에(로딩속도가 미친듯이 떨어짐.)
  },
};
