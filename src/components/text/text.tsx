import { type ComponentProps, type ReactNode } from "react";
import { Text as RNText } from "react-native";

import { twMerge } from "@utils";

import { textStyle, type TextAlign, type TextVariant } from "./text-preset";

export type TextProps = Omit<ComponentProps<typeof RNText>, "children"> & {
  children?: ReactNode;
  variant?: TextVariant;
  align?: TextAlign;
  className?: string;
};

export function Text({ children, variant, align, className, ...props }: TextProps) {
  return (
    <RNText className={twMerge(textStyle({ variant, align }), className)} {...props}>
      {children}
    </RNText>
  );
}
