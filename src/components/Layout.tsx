import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout(props: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="app-contents flex-1 h-full overflow-auto relative">
          <Header />
          <main>{props.children}</main>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Layout;
