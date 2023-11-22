import { Avatar, Dropdown, MenuProps } from "antd";
import NotificationsDropDown from "./NotificationsDropDown";
import { useAppSelector } from "@lib/redux/store";
import moment from "moment";
import { Link } from "react-router-dom";
import Timi from "@assets/images/timijames.jpg";

function Header() {
  const user = useAppSelector((state) => state.session.user!);
  return (
    <header className="app-header-container sticky z-20 top-0 py-4 bg-white dark:bg-gray-800 dark:text-white transition-all shadow-xl shadow-primary/5 mb-6 px-2 xs:p-3 xs:px-4 sm:rounded-xl sm:mx-4 sm:mt-4 ">
      <div className="flex justify-end xs:justify-between flex-wrap  items-center">
        <div className="greetings flex-grow">
          <div className="flex flex-col w-full gap-y-1 items-start">
            <div className="flex items-center">
              <div className="text-base xs:text-xl font-semibold mb:text-lg capitalize">
                Hello {user?.name}
              </div>
              <div className="text-2xl mb:text-xl animate-bounce">👋</div>
            </div>
            <div className="text-xs xs:text-sm text-[#707070]">
              Let’s check your stats today!
            </div>
          </div>
        </div>
        <div className="flex gap-x-4 items-center px-3">
          <div className="todays-date text-gray-600 dark:text-gray-400 font-semibold sm:block hidden">
            {moment(Date.now()).format("ddd, D MMMM yyyy")}
          </div>
          <NotificationsDropDown />
          <Dropdown
            menu={{
              items: menuItems(user! ?? {}),

              className:
                "shadow-2xl rounded-xl overflow-hidden px-2 pb-6 border border-solid border-gray-300",
            }}
            trigger={["click"]}
            arrow
            rootClassName="[&_.ant-dropdown-arrow]:after:border [&_.ant-dropdown-arrow]:after:border-solid [&_.ant-dropdown-arrow]:after:content-['']"
          >
            <img
              src={Timi}
              className="h-12 w-12 rounded-full cursor-pointer shadow-xl border border-solid border-gray-300"
            />
          </Dropdown>
        </div>
      </div>
    </header>
  );
}

const menuItems = (user: App.User): MenuProps["items"] => [
  {
    label: (
      <div className="profile-wrapper">
        <div className="wrap flex items-start gap-x-2 pt-3">
          <Avatar src={Timi} size={"large"} className=" shadow-lg" />.
          <div className="detail">
            <div className="full-name capitalize font-semibold text-gray-700">
              {user.name}
            </div>
            <p className="email text-sm">{user.email}</p>
          </div>
        </div>

        <div className="joined flex items-center gap-x-2 text-sm font-semibold text-gray-800 mt-4 bg-primary/10 p-2 rounded-lg">
          <div className="bg-green-600 w-3 h-3 rounded-full" />
          Joined {moment().format("MMMM dd,  yyyy")}
        </div>
      </div>
    ),
    type: "group",
    key: "profile-wrap",
    className: "mb-4",
  },
  {
    label: "Profile",
    key: "profile",
    className: "mb-1.5",
  },
  {
    label: <Link to={"/login"}>Logout</Link>,
    key: "login",
  },
];

export default Header;
