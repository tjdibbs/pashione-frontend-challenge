import useFetch from "@hooks/useFetch";
import { config } from "@lib/constants";
import { Drawer, Avatar, Tag, Skeleton, Divider, Descriptions } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { Icon } from "@iconify/react";
import stringToColor from "@lib/stringToColor";
import { DescriptionsItemType } from "antd/es/descriptions";
import { omit, pick } from "lodash";
import { CloseCircle } from "iconsax-react";

export function getItems(
  details: Partial<
    App.User &
      App.User["address"] &
      App.User["company"] &
      App.User["address"]["geo"]
  >
) {
  return (Object.keys(details) as (keyof typeof details)[])
    .sort()
    .map<DescriptionsItemType>((key) => {
      const value = details[key];

      return {
        key,
        label: (
          <Tag
            color="blue"
            className="px-1 font-semibold rounded-lg capitalize text-gray-950"
            // className="capitalize text-sm"
          >
            {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
          </Tag>
        ),
        children: (
          // @ts-ignore
          <Tag
            className="max-w-[200px] overflow-hidden text-ellipsis"
            rootClassName="dark:text-gray-300  dark:bg-gray-900"
          >
            {String(value == null ? "--:--:--" : value)}
          </Tag>
        ),
      };
    });
}

function UserView() {
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<App.User>();

  const { fetcher, fetching, setFetching } = useFetch(!user);
  const navigate = useNavigate();
  const params = useParams<{ user_id: string }>();

  const getUser = React.useCallback(async () => {
    const user = await fetcher<App.User>({
      url: config.urls.users + "/" + params.user_id,
    });

    if (user) setUser(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const closeDrawer = React.useCallback(() => {
    setOpenDrawer(false);
    setTimeout(() => {
      navigate("/users");
    }, 200);
  }, [navigate]);

  React.useLayoutEffect(() => {
    getUser();
  }, []);

  console.log({ user });

  return (
    <Drawer
      width={500}
      closeIcon={<CloseCircle className="dark:text-white close-view" />}
      title={<p className="font-bold dark:text-gray-300">User Overview</p>}
      open={openDrawer}
      onClose={closeDrawer}
      classNames={{
        content: "dark:bg-gray-800 dark:text-white",
      }}
    >
      {fetching && <Skeleton />}
      {!fetching && user && (
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
            <Tag rootClassName="email dark:bg-gray-900 dark:text-gray-300 flex py-1 px-4 bg-primary/5 rounded-full text-sm items-center gap-2">
              <Icon icon={"line-md:email"} fontSize={24} />
              <span>{user.email}</span>
            </Tag>
            <Tag rootClassName="phone dark:bg-gray-900 dark:text-gray-300 flex py-1 px-4 bg-primary/5 rounded-full text-sm items-center gap-2">
              <Icon icon={"fluent:call-32-filled"} fontSize={24} />
              <span>{user.phone}</span>
            </Tag>
            <a href={user.website} className="website">
              <Tag rootClassName="website dark:bg-gray-900 dark:text-gray-300 flex py-1 px-2 bg-primary/5 rounded-full text-sm items-center gap-2">
                <Icon icon={"mdi:web"} fontSize={24} />
                <span>{user.website}</span>
              </Tag>
            </a>
          </div>
          <Divider />
          <section className="address my-4">
            <div className="section-title font-bold mb-3">Address</div>
            <div className="section-content">
              <Descriptions
                column={{ xs: 1, sm: 2 }}
                items={getItems(omit(user.address, "geo"))}
              />
              <Descriptions
                column={{ xs: 2 }}
                items={getItems(user.address.geo)}
              />
            </div>
          </section>
          <section className="company my-4">
            <div className="section-title font-bold mb-3">Company</div>
            <div className="section-content">
              <Descriptions column={1} items={getItems(user.company)} />
            </div>
          </section>
        </div>
      )}
    </Drawer>
  );
}

export default UserView;
