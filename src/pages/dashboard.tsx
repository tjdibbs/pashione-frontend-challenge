import AddUser, { UserActionRefObject } from "@comp/UserAction";
import Layout from "@comp/Layout";
import UserView from "@comp/UserView";
import useFetch from "@hooks/useFetch";
import { config } from "@lib/constants";
import { Button, Tag, message as Alert, Empty, Skeleton } from "antd";
import React from "react";
import { Route, Routes } from "react-router";
import User from "@comp/User";
import { Refresh } from "iconsax-react";
import { AnimatePresence, motion } from "framer-motion";

function Dashboard() {
  const userActionRef = React.useRef<UserActionRefObject>(null);
  const [users, setUsers] = React.useState<App.User[]>([]);
  const [deleting, setDeleting] = React.useState<number>();
  const { fetcher, fetching } = useFetch(true);

  const getUsers = React.useCallback(async () => {
    const users = await fetcher<App.User[] | { error: string }>({
      url: config.urls.users,
    });

    // ensure response is an array and has some length
    if (users instanceof Array && users?.length) setUsers(users);
    else {
      Alert.error((users as { error: string }).error, 4);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = React.useCallback((user_id: number) => {
    return async () => {
      setDeleting(user_id);
      const res = await fetcher<any>({
        url: config.urls.users + "/" + user_id,
        method: "delete",
      });

      // alert error if there is res.error
      if (res.error) Alert.error(res.error);
      // Only update users if there is no error
      else setUsers((users) => users.filter((u) => u.id != user_id));

      setDeleting(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useLayoutEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Layout>
      <div className="p-3">
        <div className="control flex items-center justify-between mb-4 px-4">
          <div className="title font-bold text-xl">
            Users{" "}
            <Tag className="users-count font-bold text-xl rounded-full text-white bg-primary">
              {users?.length || 0}
            </Tag>
          </div>
          <div className="flex items-center gap-2">
            <Button
              shape="circle"
              size="large"
              type="text"
              className={"refresh-btn " + (fetching ? "animate-spin" : "")}
              onClickCapture={getUsers}
              icon={<Refresh className="dark:text-gray-300" />}
            />
            <Button
              onClick={() => userActionRef.current?.open({ action: "add" })}
              type="primary"
              size="large"
              className="shadow-lg rounded-3xl"
            >
              Add User
            </Button>
          </div>
        </div>
      </div>

      <div className="users-list flex flex-col gap-4 px-6 pb-20">
        <AnimatePresence mode="sync">
          {(!fetching || typeof deleting != "undefined") &&
            users.map((user) => {
              return (
                // this motion.div adds exit animation to user, when it is deleted
                <motion.div key={user.id} exit={{ opacity: 0 }}>
                  <User
                    user={user}
                    key={user.id}
                    userActionRef={userActionRef}
                    handleDelete={handleDelete}
                    deleting={deleting == user.id}
                  />
                </motion.div>
              );
            })}
        </AnimatePresence>

        {fetching &&
          deleting === undefined &&
          Array.from(new Array(5)).map((_, i) => {
            return <LoadingUser key={i} />;
          })}

        {!fetching && !users.length && (
          <Empty
            description={
              <p className="dark:text-white text-lg">Unable to fetch users</p>
            }
          />
        )}
      </div>

      <Routes>
        <Route path=":user_id" element={<UserView />} />
      </Routes>

      {/* ------------------ */}
      <AddUser length={users?.length} setUsers={setUsers} ref={userActionRef} />
    </Layout>
  );
}

const LoadingUser = () => (
  <div className="skeleton-wrap dark:bg-slate-700 transition-all bg-white p-4 rounded-xl shadow-xl shadow-primary/5 animate-pulse">
    <Skeleton
      avatar={{
        shape: "circle",
      }}
      round
      title
      paragraph={false}
    />
    <div className="flex gap-4 items-center flex-wrap mt-4">
      <Skeleton.Button />
      <Skeleton.Button />
      <Skeleton.Button />
    </div>
  </div>
);

export default Dashboard;
