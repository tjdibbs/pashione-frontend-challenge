import React from "react";
import { Icon } from "@iconify/react";
import { Button, Dropdown } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useAppDispatch, useAppSelector } from "@lib/redux/store";
import { Mode } from "@lib/redux/context/sessionContext";
import { nanoid } from "@reduxjs/toolkit";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "node_modules/@types/js-cookie";

const Icons: { [x in App.ThemeMode]: string } = {
  default: "mdi:theme-light-dark",
  dark: "ic:baseline-dark-mode",
  light: "material-symbols:light-mode",
};

function ThemeControl() {
  const [open, setOpen] = React.useState(false);
  const mode = useAppSelector((state) => state.session.mode!);
  const dispatch = useAppDispatch();

  function handleTheme(this: App.ThemeMode) {
    setOpen(false);
    setTimeout(() => {
      dispatch(Mode(this));
    }, 300);
  }

  //  const setThemeCookie = (theme: string) =>
  //    Cookies.set("theme", theme, { expires: 365 });

  // const activateTheme = (mode: App.ThemeMode) => {
  //   const darkModePreference = window.matchMedia(
  //     "(prefers-color-scheme: dark)"
  //   );

  //   switch (mode) {
  //     case "default":
  //       setThemeCookie("default");
  //       break;
  //     case "light":
  //       setThemeCookie("light");
  //       break;
  //     case "dark":
  //       setThemeCookie("dark");
  //       break;
  //     default:
  //       break;
  //   }
  // };

  React.useLayoutEffect(() => {
    const darkModePreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const dark =
      mode == "default"
        ? darkModePreference.matches
          ? true
          : false
        : mode == "dark";
    document?.querySelector("html")!.classList[dark ? "add" : "remove"]("dark");
  }, [mode]);

  return (
    <div className="theme-controller absolute bottom-5 left-5">
      <AnimatePresence mode="wait">
        <Dropdown
          // open={open}
          onOpenChange={() => setOpen(!open)}
          placement="topRight"
          overlayClassName="z-[9999]"
          className="z-[99999]"
          trigger={["click"]}
          menu={{
            items: Items(handleTheme, mode!),
          }}
        >
          <motion.div
            key={mode}
            initial={{ scale: 0 }}
            exit={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <Button
              size="large"
              shape="circle"
              // onClick={() => setOpen(true)}
              icon={<Icon color="white" icon={Icons[mode!]} height={35} />}
              className="h-12 w-12 grid bg-transparent place-items-center  shadow-xl shadow-secondary/30"
            />
          </motion.div>
        </Dropdown>
      </AnimatePresence>
    </div>
  );
}

const Items: (
  handleTheme: (item: ItemType) => void,
  mode: App.ThemeMode
) => ItemType[] = (handleTheme, mode) => [
  {
    label: "System Default",
    key: nanoid(),
    onClick: handleTheme.bind("default"),
    icon: <Icon icon="mdi:theme-light-dark" height={24} />,
    className: mode === "default" ? "bg-secondary/30" : "",
  },
  {
    label: "Light Mode",
    key: nanoid(),
    onClick: handleTheme.bind("light"),
    className: mode === "light" ? "bg-secondary/30" : "",
    icon: <Icon icon="material-symbols:light-mode" height={24} />,
  },
  {
    label: "Dark Mode",
    key: nanoid(),
    onClick: handleTheme.bind("dark"),
    className: mode === "dark" ? "bg-secondary/30" : "",
    icon: <Icon icon="ic:baseline-dark-mode" height={24} />,
  },
];

export default ThemeControl;
