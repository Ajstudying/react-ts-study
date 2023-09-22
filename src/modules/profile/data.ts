import useSWR from "swr";

export interface ProfileData {
  nickname: string;
  email: string;
}

// 함수를 호출을 하면, 함수를 내보내는 함수이다.
// use....
//클로저를 생성
//npm install swr 이걸 선행해야 함
export function useProfileData() {
  //데이터를 키 문자열 기준으로 서로 공유가 됨
  //const{데이터, 데이터 변경 함수}
  // = useSWR<데이터형식>("데이터키"(필수), 데이터조회함수, 옵션);
  const { data: profileData, mutate: mutableProfileData } =
    //useSWR<ProfileData | {}> 초기값이 빈객체면 이렇게 해줘야 함.
    useSWR<ProfileData>("@data/profile", {
      //한번도 데이터를 받아온 적이 없다면 이걸로 리턴 치기 위한 값.
      //안 넣으면 undefined가 뜨면서 종료되버림.
      //초기값(데이터조회함수를 통해서 최초에 받아오기 전에 반환할 값)
      fallbackData: { nickname: "Alice", email: "alice@gmail.com" },
    });

  // function changeProfileData() {
  //   mutate((prev: ProfileData) => {
  //     //서버에 호출
  //     //변경된 데이터를 반환
  //     return { nickname: "Alice", email: "alice@gmail.com" };
  //   });
  // }

  return { profileData, mutableProfileData };
}
