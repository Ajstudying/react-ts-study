interface LayoutProps {
  title: string;
  children: React.ReactNode;
  //React.ReactNode; 리액트 컴포넌트라고 생각하면 됨
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <div>
      <header>
        <h1>{title}</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>My Company</p>
      </footer>
    </div>
  );
};

export default Layout;
