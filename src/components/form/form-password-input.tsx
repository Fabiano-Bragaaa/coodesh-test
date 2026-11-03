import { Controller, type FieldValues, type UseControllerProps } from "react-hook-form";

import { PasswordInput, type PasswordInputProps } from "../password-input/password-input";

type FormPasswordInputProps<FormType extends FieldValues> = Omit<
  PasswordInputProps,
  "value" | "onChangeText" | "onBlur" | "errorMessage"
> &
  Pick<UseControllerProps<FormType>, "control" | "name">;

export function FormPasswordInput<FormType extends FieldValues>({
  control,
  name,
  ...passwordInputProps
}: FormPasswordInputProps<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <PasswordInput
          value={field.value}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          errorMessage={fieldState.error?.message}
          {...passwordInputProps}
        />
      )}
    />
  );
}
