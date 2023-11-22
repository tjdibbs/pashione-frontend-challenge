import TextFormGroupElement from "@comp/TextFormGroupElement";
import { Controller, RegisterOptions, useForm } from "react-hook-form";
import React from "react";

type F = App.User;

export type FormControlProps<T> = App.FormGroupProps<T> & {
  type?: "input" | "select" | "date" | "textarea";
  required?: boolean;
  rules?: RegisterOptions;
};

type Props<T> = {
  autoComplete?: boolean;
  setRegions?: React.Dispatch<React.SetStateAction<string[]>>;
  defaultValues?: T;
};

export default function useFormControl<T>(props: Props<T>) {
  const actions = useForm<T extends object ? T : F>({
    // @ts-ignore
    defaultValues: props.defaultValues,
  });
  const { clearErrors, control } = actions;
  const { autoComplete } = props;

  const FormControl = React.useCallback(
    (props: FormControlProps<T extends object ? keyof T : keyof F>) => {
      const { type = "input", required = true } = props;
      return (
        <Controller
          // @ts-ignore
          name={props.name}
          control={control}
          rules={{
            required: { message: props.name as string, value: required },
            // ...(props.name == "email"
            //   ? {
            //       pattern: {
            //         value: /[A-Za-z0-9._+\-']+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/,
            //         message: props.name,
            //       },
            //     }
            //   : {}),
            ...props.rules,
          }}
          render={({
            field: { onChange, onBlur, value, ref },
            formState: { errors },
          }) => {
            const _errors = errors as {
              [x in (typeof props)["name"]]: object | undefined;
            };
            const error = Boolean(_errors[props.name]);

            switch (type) {
              case "input":
                return (
                  // @ts-ignore
                  <TextFormGroupElement
                    // @ts-ignore
                    onChange={(e) => {
                      onChange(e);
                      // @ts-ignore
                      clearErrors(props.name);
                    }}
                    onBlur={onBlur}
                    htmlRef={ref}
                    autoComplete={autoComplete}
                    value={value as string}
                    {...{ ...props, required, error }}
                  />
                );

              default:
                return <></>;
            }
          }}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { FormControl, ...actions };
}
