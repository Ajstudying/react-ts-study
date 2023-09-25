import http from "@/utils/http";
import { useEffect } from "react";
import { PostData } from "../data";

const PostList = () => {
  useEffect(() => {
    (async () => {
      const response = await http.get("/posts"); //any 타입 js처럼 사용 가능
      // const response = await http.get<PostData>("/posts");// 타입선언도 가능.
      // const response = await http.get("/post");
      console.log(response);
    })();
  }, []);

  return <div>Post List</div>;
};

export default PostList;
