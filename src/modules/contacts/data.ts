import axios from "axios";
import useSWR from "swr";

const contactsApi = axios.create({
  // baseURL: "http://localhost:9090/contacts",
  baseURL: "http://localhost:9090",
});

interface ContactData {
  // ?:옵셔널, "a"|"b" 유니온
  id?: number; //id값은 나중에 생성
  name: string;
  phone: string;
}

//아래처럼 페이징을 관리하는 경우도 있음.
//페이징 정보를 글로벌 상태로 관리하게 된다면,
// interface ContactPagingData {
//   page?: number;
//   size?: number;
//   last?: boolean;
//   contents: ContactData[];
// }

//undefined를 해결하기 위한 초기데이터
const INIT_DATA: ContactData[] = [];

const CONTACTS_DATA_KEY = "/contacts";
// const CONTACTS_DATA_KEY = "@data/contacts";
//데이터를 가져오는 함수(서버, 로컬스토리지, 캐시, webSQL)
//아래 쪽에 `${CONTACTS_DATA_KEY}/${page}` 이렇게 받으면
// const contactFetcher = (key: string) => {
//   console.log(key);
//   const page = +key.split("/")[2];
//   console.log(page);
const contactFetcher = async ([key, page]: string | number[]) => {
  console.log("---call fetcher--");

  try {
    const response = await contactsApi.get<ContactData[]>(
      `${key}?_sort=id&_order=desc`
    );
    return response.data;
  } catch (e: any) {
    return INIT_DATA;
  }

  //fetch /contacts/paging?page={page}&size=20

  // const jsonStr = localStorage.getItem(CONTACTS_DATA_KEY);
  //로컬스토리지에 있으면 읽은 값을 객체 변환해서 반환
  // if (jsonStr) {
  // return JSON.parse(jsonStr) as ContactData[];
  //JSON.parse(jsonStr) 이건 Any 타입도 반환이 가능한데, as로 좀더 명확히 타입을 해주는게 나음.
  // }

  //로컬스토리지에 없으면 초기값 반환
  // return INIT_DATA;
};

export const useContactsData = (page: number) => {
  const {
    data: contactsData,
    mutate,
    isValidating: isContactDataValidating,
  } = useSWR<ContactData[]>(
    //데이터 키
    [CONTACTS_DATA_KEY, page], //`${CONTACTS_DATA_KEY}/${page}` 이런 식으로도 가능
    contactFetcher,
    //캐시/또는 데이터 가져오기 이후에 데이터가 없을 때 반환하는 데이터
    {
      fallbackData: INIT_DATA,
      //포커스될때 fetcher로 가져오기 해제
      //revalidate: 캐시와 fetcher로 가져온 데이터를 비교 후 반환
      revalidateOnFocus: false,
      //특정 주기 별로 데이터 가져오기
      // refreshInterval: 5000,
    }
  );

  function createContactData(contact: ContactData) {
    //배열데이터 변경(mutation)
    // 기존 배열에 매개변수로 받은 객체를 추가하고 새로운 배열 반환

    //mutate(변경할데이터) -> 데이터를 변경
    // mutate 함수
    // 데이터를 변경하고 변경된 데이터를 반환
    //mutate((이전데이터)=>{... retrun 변경된 데이터})

    //데이터 가져오기 이전이고, 최초의 상태변경이면 undefined로 되어있음
    //그래서 init_data로 초기화 적용 해주기
    mutate(async (prevData: ContactData[] = [...INIT_DATA]) => {
      console.log("--contacts-prev-data--");

      console.log(prevData);

      // //변경된 데이터
      // let nextData: ContactData[];

      // if (!prevData) {
      //   //캐시에 데이터가 없는 경우(초기값이 없는 경우) 초기 데이터로
      //   nextData = [...INIT_DATA]; //참조가 물리면 안되기 때문에 이렇게 따로 복사한 것을 참조해준다.
      // } else {
      //   //캐시에 데이터가 있는 경우 이전 데이터로 생성
      //   nextData = [...prevData]; //절대 preData를 넣으면 안됨 같은 참조X
      // }

      //기존 데이터로 신규 배열 생성
      let nextData = [...prevData];
      try {
        //ex)서버연동 fetch post contact -> id
        const response = await contactsApi.post(CONTACTS_DATA_KEY, contact);
        if (response.status === 201) {
          //배열 앞 쪽에 추가
          // nextData.unshift({ id: nextData.length + 1, ...contact });
          nextData.unshift({ ...response.data });
        }
      } catch (e: any) {
        console.log(e);
      }

      // // 로컬스토리지에 저장
      // localStorage.setItem(
      //   CONTACTS_DATA_KEY,
      //   JSON.stringify(nextData) //배열을 저장
      // );

      //변경된 데이터를 반환(무조건 새로운 참조로..!!)
      return nextData;
    }, false);
    // });
    //mutate(처리함수, false);
    //mutate 이후에 캐시만 업데이트하고, fetcher를 처리하지 않음.
    //불필요한 패치를 막기 위해 위같이 처리하기도 함.
  }
  return { contactsData, createContactData, isContactDataValidating };
};
