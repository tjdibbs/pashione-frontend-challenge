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

function Dashboard() {
  const userActionRef = React.useRef<UserActionRefObject>(null);
  const [users, setUsers] = React.useState<App.User[]>([]);
  const { fetcher, fetching } = useFetch(true);

  const getUsers = React.useCallback(async () => {
    const users = await fetcher<App.User[] | { error: string }>({
      url: config.urls.users,
    });

    console.log({ users });
    if (users instanceof Array && users?.length) setUsers(users);
    else {
      Alert.error((users as { error: string }).error, 4);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = React.useCallback((user_id: number) => {
    return async () => {
      const res = await fetcher({
        url: config.urls.users + "/" + user_id,
        method: "delete",
      });

      console.log({ res });
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
            <Tag className="font-bold text-xl rounded-full text-white bg-primary">
              {users?.length || 0}
            </Tag>
          </div>
          <div className="flex items-center gap-2">
            <Button
              shape="circle"
              size="large"
              type="text"
              className={fetching ? "animate-spin" : ""}
              onClickCapture={getUsers}
              icon={<Refresh />}
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
        {users.map((user) => {
          return (
            <User
              user={user}
              userActionRef={userActionRef}
              handleDelete={handleDelete}
            />
          );
        })}

        {fetching &&
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
