import Header from "@/components/Header";
import { PropsWithChildren } from "react";

const Layout = ({children}: PropsWithChildren) => {
  return (
      <main className="root-container">
          <div className="mx-auto max-w-7xl">
              <Header/>
              <div className="mt-20 pb-20">{ children}</div>
          </div>
    </main>
  );
};

export default Layout;