import useSWR from "swr";

interface PostData {
  id: number;
  title: string;
  content: string;
  nickname: string;
  createTime: string;
  imgURL?: string;
}

export const usePostsData = () => {
  const { data: postsData, mutate: mutatePostsData } = useSWR<PostData[]>(
    "@data/posts",
    { fallbackData: [] }
  );

  return { postsData, mutatePostsData };
};
