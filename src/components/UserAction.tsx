import useFetch from "@hooks/useFetch";
import useFormControl from "@hooks/useFormControl";
import { config } from "@lib/constants";
import { Divider, Modal, message as Alert } from "antd";
import { CloseCircle } from "iconsax-react";
import { omit, pick } from "lodash";
import React from "react";

export type UserActionRefObject = {
  open: (payload: UserActionPayload) => void;
};

type FormDataType = App.User &
  App.User["address"] &
  App.User["address"]["geo"] &
  App.User["company"] & {
    companyName: string;
  };

type UserActionPayload = {
  action: "add" | "edit";
  user?: App.User;
};

// This functions extract all subfields to object root level,
const extractAllFields = (user: App.User) => ({
  ...omit(user, ["address", "company"]),
  ...omit(user.company, "name"),
  ...omit(user.address, "geo"),
  ...user.address.geo,
  companyName: user.company.name,
});

const UserAction = React.forwardRef<
  UserActionRefObject,
  { length: number; setUsers: React.Dispatch<React.SetStateAction<App.User[]>> }
>(function AddUser(props, ref) {
  const [payload, setPayload] = React.useState<UserActionPayload>({
    action: "add",
  });
  const [open, setOpen] = React.useState<boolean>(false);
  const { FormControl, handleSubmit, reset } = useFormControl<FormDataType>({});
  const { fetcher, fetching } = useFetch();

  const submit = async (fields: FormDataType) => {
    const user_id = payload.action == "add" ? undefined : payload.user!.id!;

    // extract exact user object from formFields
    // @ts-ignore
    const newUser: App.User = {
      ...pick(fields, ["name", "phone", "email", "username", "website"]),
      address: {
        ...pick(fields, ["city", "street", "suite", "zipcode"]),
        geo: pick(fields, ["lat", "lng"]),
      },
      company: {
        ...pick(fields, ["bs", "catchPhrase"]),
        name: fields.companyName,
      },
    };

    const res = await fetcher<App.User>({
      url: config.urls.users + "/" + (payload.action == "edit" ? user_id : ""),
      method: payload.action == "add" ? "post" : "put",
      data: payload.action == "add" ? newUser : undefined,
    });

    // if payload action is add
    if (payload.action == "add") {
      props.setUsers((users) => [res, ...users]);
    }

    // if payload action is edit
    else {
      props.setUsers((users) => {
        const updatedUsers = users.map((user) => {
          if (user.id === payload.user?.id) {
            return { ...user, ...newUser };
          }

          return user;
        });

        return updatedUsers;
      });
    }

    // alert success after action is complete
    Alert.success(
      `User ${payload.action == "add" ? "Added" : "Updated"} Successfully`,
      3
    );
    setOpen(false);
    resetFields();
  };

  const resetFields = () => {
    reset({
      name: "",
      lat: "",
      lng: "",
      bs: "",
      companyName: "",
      phone: "",
      email: "",
      street: "",
      city: "",
      suite: "",
      website: "",
      zipcode: "",
      username: "",
      catchPhrase: "",
    });
  };

  // Expose component function to parent elements
  React.useImperativeHandle(
    ref,
    () => ({
      open: (payload) => {
        // Check if payload has a user field when payload.action == "edit"
        if (payload.user) {
          // user fields and subfields are extracted to plain object to fill it input box
          reset(extractAllFields(payload.user));
        }
        setPayload(payload);
        setOpen(true);
      },
    }),
    [reset]
  );

  return (
    <Modal
      title={
        <p className="font-bold text-xl dark:text-white">
          {payload.action == "add" ? "Add User" : "Edit User"}
        </p>
      }
      open={open}
      maskClosable={false}
      closeIcon={<CloseCircle className="dark:text-white" />}
      onCancel={() => {
        resetFields();
        setOpen(false);
      }}
      classNames={{
        content: "px-6 shadow-xl dark:bg-gray-800 dark:text-white",
        header: "dark:bg-gray-800 dark:text-white",
      }}
      centered
      confirmLoading={fetching}
      onOk={handleSubmit(submit)}
      okText={payload.action == "add" ? "Add User" : "Update User"}
      className="w-[600px] "
      rootClassName=""
    >
      <div className="group mt-4">
        <Divider className="dark:border-white" orientation="left">
          <div className="group-title font-bold dark:text-white">
            User Details
          </div>
        </Divider>
        <div className="flex flex-wrap gap-3">
          {primaryDetails.map((detail) => {
            return FormControl({ name: detail });
          })}
        </div>
      </div>
      <div className="group mt-4">
        <Divider className="dark:border-white" orientation="left">
          <div className="group-title font-bold dark:text-white">Address</div>
        </Divider>
        <div className="flex flex-wrap gap-3">
          {addressDetails.map((detail) => {
            return FormControl({ name: detail });
          })}
        </div>
      </div>
      <div className="group mt-4">
        <Divider className="dark:border-white" orientation="left">
          <div className="group-title font-bold dark:text-white">Company</div>
        </Divider>
        <div className="flex flex-wrap gap-3">
          {companyDetails.map((detail) => {
            return FormControl({ name: detail });
          })}
        </div>
      </div>
    </Modal>
  );
});

const primaryDetails: (keyof App.User)[] = [
  "name",
  "username",
  "email",
  "phone",
  "website",
];

const addressDetails: (keyof (App.User["address"] &
  App.User["address"]["geo"]))[] = [
  "street",
  "suite",
  "city",
  "zipcode",
  "lat",
  "lng",
];

const companyDetails: (keyof App.User["company"])[] = [
  // @ts-ignore
  "companyName",
  "catchPhrase",
  "bs",
];

export default UserAction;
