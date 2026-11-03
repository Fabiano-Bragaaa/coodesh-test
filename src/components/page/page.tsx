import { type ReactNode } from "react";
import { ScrollView, View } from "react-native";

import { useAppSafeArea } from "@hooks";
import { useTranslate } from "@translate";
import { twMerge } from "@utils";

import { Button } from "../button/button";
import { Icon } from "../icon/icon";
import { Text } from "../text/text";

type PageProps = {
  children: ReactNode;
  title?: string;
  rightComponent?: ReactNode;
  scroll?: boolean;
  hidePadding?: boolean;
  safeTop?: boolean;
  className?: string;
  onClose?: () => void;
};

const contentContainerStyle = { flexGrow: 1 };

export function Page({
  children,
  title,
  rightComponent,
  scroll = false,
  hidePadding = false,
  safeTop = true,
  className,
  onClose,
}: PageProps) {
  const { t } = useTranslate();
  const { top, bottom } = useAppSafeArea();
  const bodyClass = twMerge("flex-1", !hidePadding && "px-4", className);
  const bodyStyle = { paddingTop: safeTop ? top : 0, paddingBottom: bottom };

  const body = (
    <View className={bodyClass} style={bodyStyle}>
      {onClose ? (
        <View className="-ml-2 flex-row py-1">
          <Button
            title={t("common.close")}
            variant="ghost"
            size="icon"
            leftComponent={<Icon name="X" />}
            onPress={onClose}
          />
        </View>
      ) : null}
      {title !== undefined ? (
        <View className="flex-row items-center justify-between gap-3 py-3">
          <Text variant="title-md" className="flex-1">
            {title}
          </Text>
          {rightComponent ? <View className="-my-3 -mr-2">{rightComponent}</View> : null}
        </View>
      ) : null}
      {children}
    </View>
  );

  return (
    <View className="flex-1 bg-background">
      {scroll ? (
        <ScrollView
          contentContainerStyle={contentContainerStyle}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets>
          {body}
        </ScrollView>
      ) : (
        body
      )}
    </View>
  );
}
