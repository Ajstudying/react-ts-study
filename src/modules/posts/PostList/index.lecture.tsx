import http from "@/utils/http";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { PostData } from "../data";

interface PostItem {
  id: number;
  title: string;
  content: string;
  files: PostFile[];
}

interface PostFile {
  contentType: string;
  originalFileName: string;
  uuidFileName: string;
}

function MediaElement({
  contentType,
  uuidFileName,
}: {
  contentType: string;
  uuidFileName: string;
}) {
  if (contentType.includes("image")) {
    return (
      <img
        width={300}
        src={`http://localhost:8080/posts/files/${uuidFileName}`}
      />
    );
  } else {
    return (
      <video>
        <source
          src={`http://localhost:8080/posts/files/${uuidFileName}`}
          type={contentType}
        ></source>
      </video>
    );
  }
}

const PostList = () => {
  // const fileRef = useRef() as MutableRefObject<HTMLInputElement>;

  const [posts, setPosts] = useState<PostItem[]>([]);

  const fileRef = useRef<HTMLInputElement>();
  const titleRef = useRef<HTMLInputElement>();
  const contentRef = useRef<HTMLTextAreaElement>();
  const formRef = useRef<HTMLFormElement>();

  useEffect(() => {
    (async () => {
      const response = await http.get("/posts"); //any 타입 js처럼 사용 가능
      // const response = await http.get<PostData>("/posts");// 타입선언도 가능.
      // const response = await http.get("/post");
      console.log(response);
    })();
  }, []);

  const handlePost = (e: React.FormEvent) => {
    //이걸 안하면 현재 페이지에 폼데이터 전송을 함.
    e.preventDefault();
    //multipart/form-data 파일 업로드 하려면
    const formData = new FormData();

    //배열 객체로 변환
    Array.from(fileRef.current.files).forEach((file) => {
      formData.append("files", file);
    });

    formData.append("title", titleRef.current.value);
    formData.append("content", contentRef.current.value);

    (async () => {
      const response = await http.post<PostItem>("/posts/with-file", formData);
      console.log(response);
      if (response.status === 201) {
        formRef.current.reset();
        setPosts([{ ...response.data }, ...posts]);
      }
    })();
  };

  // function mediaElement(contentType: string, uuidFileName: string) {
  //   if (contentType.includes("image")) {
  //     return (
  //       <img
  //         width={300}
  //         src={`http://localhost:8080/posts/files/${uuidFileName}`}
  //       />
  //     );
  //   } else {
  //     return (
  //       <video>
  //         <source
  //           src={`http://localhost:8080/posts/files/${uuidFileName}`}
  //           type={contentType}
  //         ></source>
  //       </video>
  //     );
  //   }
  // }

  return (
    <div>
      <h2>Post List</h2>
      <form
        onSubmit={handlePost}
        ref={formRef}
        style={{ display: "flex", flexDirection: "column", width: "400px" }}
      >
        {/* accept=image/jpg, image/png 등으로 원래 세세하게 지정해주는게 좋음. */}
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          ref={fileRef}
        ></input>
        <input placeholder="제목.." ref={titleRef}></input>
        <textarea placeholder="내용.." ref={contentRef}></textarea>
        {/* button의 타입을 type="button"으로 하면 e.prevent 안해도 됨. */}
        <button>게시</button>
      </form>
      <div>
        <ul>
          {posts.map((post) => (
            <li key={`post-item-${post.id}`}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <div>
                {post.files.map((file) => (
                  <MediaElement
                    key={`media-element-${file.uuidFileName}`}
                    uuidFileName={file.uuidFileName}
                    contentType={file.contentType}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostList;
