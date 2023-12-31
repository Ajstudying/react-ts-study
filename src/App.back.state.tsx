import Counter from "./components/Counter";
import Layout from "./components/Layout";
import Post from "./modules/post/Post/Post";
import Todo from "@/modules/todo/Todo";
import WelcomeMessage from "./components/WelcomeMessage";

const App = () => {
  return (
    <>
      <Counter />
      <hr />
      <Todo />
      <hr />
      <Layout title="Home Page">
        {/* children 속성을 안 쪽태그에 */}
        <WelcomeMessage name="Alice" />
        <p>Welcom to our Website!</p>
      </Layout>
      <hr />
      <Post />
    </>
  );
};

export default App;
