import React from "react";
import { Icon } from "@iconify/react";
import stringToColor from "@lib/stringToColor";
import { Avatar, Button, Popconfirm, Tag } from "antd";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { UserActionRefObject } from "./UserAction";

type Props = {
  user: App.User;
  userActionRef: React.RefObject<UserActionRefObject>;
  handleDelete: (user_id: number) => () => void;
};

const User = React.memo(function User(props: Props) {
  const { user, userActionRef, handleDelete } = props;
  return (
    <motion.div className="user p-4 rounded-xl border border-solid border-primary/30 shadow-xl shadow-primary/10">
      <div className="flex justify-between">
        <div className="wrap">
          <div className="flex flex-1 items-start gap-3">
            <Avatar
              style={{ backgroundColor: stringToColor(user.name) }}
              size={50}
              className="font-bold text-lg"
            >
              {user.name.at(0)}
            </Avatar>
            <div className="wrap">
              <div className="name font-semibold text-lg">{user.name}</div>
              <Tag className="username text-primary rounded-full">
                @{user.username}
              </Tag>
            </div>
          </div>
          <div className="flex items-center flex-wrap gap-2 mt-6">
            <Tag rootClassName="email flex py-1 px-4 bg-primary/5 rounded-full text-sm items-center gap-2">
              <Icon icon={"line-md:email"} fontSize={24} />
              <span>{user.email}</span>
            </Tag>
            <Tag rootClassName="email flex py-1 px-2 bg-primary/5 rounded-full text-sm items-center gap-2">
              <Icon icon={"fluent:call-32-filled"} fontSize={24} />
              <span>{user.phone}</span>
            </Tag>
            <a href={user.website} className="website">
              <Tag rootClassName="email flex py-1 px-2 bg-primary/5 rounded-full text-sm items-center gap-2">
                <Icon icon={"mdi:web"} fontSize={24} />
                <span>{user.website}</span>
              </Tag>
            </a>
          </div>
        </div>
        <div className="actions flex items-center gap-3">
          <NavLink to={String(user.id)}>
            <Button type="primary" className="rounded-full font-semibold">
              View User
            </Button>
          </NavLink>
          <Button
            onClick={() =>
              userActionRef.current?.open({ action: "edit", user })
            }
            className="rounded-full font-semibold"
          >
            Edit
          </Button>
          <Popconfirm
            onConfirm={handleDelete(user.id)}
            placement="left"
            okText={"Delete"}
            cancelText={"Don't Delete"}
            title={
              <p className="max-w-[200px] mb-3">
                Are you sure you want to delete this user ?
              </p>
            }
          >
            <Button
              shape="circle"
              type="text"
              size="large"
              icon={<Icon icon={"fluent:delete-32-regular"} fontSize={24} />}
            />
          </Popconfirm>
        </div>
      </div>
    </motion.div>
  );
});

User.displayName = "User";

export default User;
