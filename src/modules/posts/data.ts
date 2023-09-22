import useSWR from "swr";

export interface PostData {
  id?: number;
  title: string;
  content: string;
  nickname: string;
  createTime: string;
  imgURL?: string;
}

const INIT_DATA: PostData[] = [];

export const POSTS_DATA_KEY = "@data/posts";

const postFetcher = ([key, page]: string | number[]) => {
  const jsonStr = localStorage.getItem(POSTS_DATA_KEY);
  if (jsonStr) {
    return JSON.parse(jsonStr) as PostData[];
  }
  return INIT_DATA;
};

export const usePostsData = (page: number) => {
  const { data: postsData, mutate } = useSWR<PostData[]>(
    POSTS_DATA_KEY,
    postFetcher,
    { fallbackData: INIT_DATA, revalidateOnFocus: false }
  );

  function createPostData(post: PostData) {
    mutate((prevData: PostData[]) => {
      let nextData: PostData[];

      if (!prevData) {
        nextData = [...INIT_DATA];
      } else {
        nextData = [...prevData];
      }

      nextData.unshift({ id: nextData.length + 1, ...post });
      localStorage.setItem(POSTS_DATA_KEY, JSON.stringify(nextData));

      return nextData;
    }, false);
  }

  return { postsData, createPostData };
};
