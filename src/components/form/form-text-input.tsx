import { Controller, type FieldValues, type UseControllerProps } from "react-hook-form";

import { TextInput, type TextInputProps } from "../text-input/text-input";

type FormTextInputProps<FormType extends FieldValues> = Omit<
  TextInputProps,
  "value" | "onChangeText" | "onBlur" | "errorMessage"
> &
  Pick<UseControllerProps<FormType>, "control" | "name">;

export function FormTextInput<FormType extends FieldValues>({
  control,
  name,
  ...textInputProps
}: FormTextInputProps<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextInput
          value={field.value}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          errorMessage={fieldState.error?.message}
          {...textInputProps}
        />
      )}
    />
  );
}
