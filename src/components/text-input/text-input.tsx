import { type ReactNode, useRef } from "react";
import { Pressable, TextInput as RNTextInput, type TextInputProps as RNTextInputProps, View } from "react-native";

import { twMerge } from "@utils";

import { Text } from "../text/text";

export type TextInputProps = Omit<RNTextInputProps, "style"> & {
  label: string;
  errorMessage?: string;
  rightComponent?: ReactNode;
  containerClassName?: string;
};

export function TextInput({ label, errorMessage, rightComponent, containerClassName, ...props }: TextInputProps) {
  const inputRef = useRef<RNTextInput>(null);

  function focusInput() {
    inputRef.current?.focus();
  }

  return (
    <Pressable accessible={false} onPress={focusInput} className={twMerge("gap-1.5", containerClassName)}>
      <Text variant="label-md">{label}</Text>
      <View
        className={twMerge(
          "h-12 flex-row items-center rounded-md border border-border bg-surface pl-4",
          rightComponent ? "pr-1" : "pr-4",
          errorMessage && "border-danger",
        )}>
        <RNTextInput
          ref={inputRef}
          accessibilityLabel={label}
          autoCapitalize="none"
          autoCorrect={false}
          className="h-full flex-1 text-body-lg text-text"
          placeholderTextColorClassName="accent-text-faint"
          selectionColorClassName="accent-primary"
          {...props}
        />
        {rightComponent}
      </View>
      {errorMessage ? (
        <Text variant="body-md" className="text-danger">
          {errorMessage}
        </Text>
      ) : null}
    </Pressable>
  );
}
