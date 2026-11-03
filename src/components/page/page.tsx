import { type ReactNode } from "react";
import { ScrollView, View } from "react-native";

import { useAppSafeArea } from "@hooks";
import { twMerge } from "@utils";

import { Text } from "../text/text";

type PageProps = {
  children: ReactNode;
  title?: string;
  scroll?: boolean;
  hidePadding?: boolean;
  safeTop?: boolean;
  className?: string;
};

const contentContainerStyle = { flexGrow: 1 };

export function Page({
  children,
  title,
  scroll = false,
  hidePadding = false,
  safeTop = true,
  className,
}: PageProps) {
  const { top, bottom } = useAppSafeArea();
  const bodyClass = twMerge("flex-1", !hidePadding && "px-4", className);
  const bodyStyle = { paddingTop: safeTop ? top : 0, paddingBottom: bottom };

  const body = (
    <View className={bodyClass} style={bodyStyle}>
      {title !== undefined ? (
        <Text variant="title-md" className="py-3">
          {title}
        </Text>
      ) : null}
      {children}
    </View>
  );

  return (
    <View className="flex-1 bg-background">
      {scroll ? (
        <ScrollView contentContainerStyle={contentContainerStyle} showsVerticalScrollIndicator={false}>
          {body}
        </ScrollView>
      ) : (
        body
      )}
    </View>
  );
}
