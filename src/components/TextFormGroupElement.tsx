import React from "react";
import { Input } from "antd";

export const TextFormGroupElement = React.memo(
  (props: Partial<App.FormGroupProps>) => {
    const { required = true } = props;
    const Comp = props.inputType !== "password" ? Input : Input.Password;
    // @ts-ignore
    const label = (props.name ??= "").replace(/([a-z])([A-Z])/g, "$1 $2");
    return (
      <div className="form-group flex-grow" ref={props.htmlRef}>
        <label
          htmlFor="business-name"
          className="block mb-2 text-sm capitalize"
        >
          {props.label || label?.replaceAll(/[0-9]/g, "")}{" "}
          {required && <span className="text-red-600 font-bold">*</span>}
        </label>
        <Comp
          id={props.name}
          value={props.value}
          onBlur={props.onBlur}
          type={props.inputType}
          addonBefore={props.addonBefore}
          addonAfter={props.addonAfter}
          className="dark:bg-gray-900 dark:text-gray-300 dark:placeholder:text-gray-500"
          onChange={(e) => {
            if (props.onChange) props.onChange(e);
          }}
          // ref={props.ref}
          autoComplete={!props.autoComplete ? "new-password" : ""}
          maxLength={props.maxLength}
          status={props.error ? "error" : undefined}
          placeholder={
            props.placeholder ?? "Enter " + label?.replaceAll(/[0-9]/g, "")
          }
          size="large"
        />
      </div>
    );
  }
);

export default TextFormGroupElement;
