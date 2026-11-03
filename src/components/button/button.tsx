import { type ReactNode } from "react";
import { ActivityIndicator, Pressable, type PressableProps, View } from "react-native";

import { Text } from "../text/text";
import { buttonStyle, type ButtonSize, type ButtonVariant } from "./button-preset";

export type ButtonProps = Omit<PressableProps, "children" | "style"> & {
  title: string;
  leftComponent?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  containerClassName?: string;
  isLoading?: boolean;
};

export function Button({
  title,
  leftComponent,
  variant,
  size,
  disabled,
  containerClassName,
  isLoading = false,
  ...props
}: ButtonProps) {
  const iconOnly = size === "icon";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={iconOnly ? title : undefined}
      disabled={disabled || isLoading}
      accessibilityState={{ busy: isLoading }}
      className={containerClassName}
      {...props}>
      {({ pressed }) => {
        const style = buttonStyle({ variant, size, pressed, inactive: Boolean(disabled) });

        if (isLoading) {
          return (
            <View className={style.container()}>
              <ActivityIndicator colorClassName={style.spinner()} />
            </View>
          );
        }

        return (
          <View className={style.container()}>
            {leftComponent}
            {iconOnly ? null : <Text className={style.label()}>{title}</Text>}
          </View>
        );
      }}
    </Pressable>
  );
}
