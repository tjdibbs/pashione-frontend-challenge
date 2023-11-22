import ThemeControl from "./ThemeControl";
import PashioneLogo from "@assets/images/logo-white.png";
import { Affix } from "antd";

function Sidebar() {
  return (
    <Affix offsetTop={0}>
      <div className="app-sidebar hidden md:block dark:bg-slate-800 w-72 bg-primary text-white h-screen">
        <div className="logo p-4">
          <img src={PashioneLogo} className="w-32 mx-auto" />
        </div>
        <ThemeControl />
      </div>
    </Affix>
  );
}

export default Sidebar;
