import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { FloatButton } from "antd";
import ThemeControl from "./ThemeControl";

function Layout(props: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="app-contents flex-1 h-full overflow-auto relative">
          <Header />
          <main>{props.children}</main>
        </div>

        <div className="floating-actions">
          <FloatButton.Group className="w-auto bottom-5">
            <div className="wrap relative z-40 rounded-full bg-primary/50">
              <ThemeControl />
            </div>
          </FloatButton.Group>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Layout;
