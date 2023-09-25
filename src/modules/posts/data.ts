import axios from "axios";
import useSWR from "swr";

const postApi = axios.create({
  baseURL: "http://localhost:8080",
});
export interface PostData {
  id?: number;
  title: string;
  content: string;
  // nickname: string;
  createTime: string;
  imgURL?: string;
}

const INIT_DATA: PostData[] = [];

export const POSTS_DATA_KEY = "/posts";

const postFetcher = async ([key, page]: string | number[]) => {
  try {
    const response = await postApi.get<PostData[]>(
      `${key}?_sort=id&_order=desc`
    );
    return response.data;
  } catch (e: any) {
    return INIT_DATA;
  }
  // const jsonStr = localStorage.getItem(POSTS_DATA_KEY);
  // if (jsonStr) {
  //   return JSON.parse(jsonStr) as PostData[];
  // }
  // return INIT_DATA;
};

export const usePostsData = (page: number) => {
  const {
    data: postsData,
    mutate,
    isValidating: isPostDataValidating,
  } = useSWR<PostData[]>([POSTS_DATA_KEY, page], postFetcher, {
    fallbackData: INIT_DATA,
    revalidateOnFocus: false,
  });

  function createPostData(post: PostData) {
    mutate(async (prevData: PostData[] = [...INIT_DATA]) => {
      let nextData = [...prevData];

      try {
        const response = await postApi.post(POSTS_DATA_KEY, post);
        if (response.status === 201) {
          nextData.unshift({ ...response.data });
        }
      } catch (e: any) {
        console.log(e);
      }

      // if (!prevData) {
      //   nextData = [...INIT_DATA];
      // } else {
      //   nextData = [...prevData];
      // }

      // nextData.unshift({ id: nextData.length + 1, ...post });
      // localStorage.setItem(POSTS_DATA_KEY, JSON.stringify(nextData));

      return nextData;
    }, false);
  }

  return { postsData, createPostData, isPostDataValidating };
};
