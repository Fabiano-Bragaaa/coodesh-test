import { type ReactNode } from "react";
import { X } from "lucide-react-native";
import { ScrollView, View } from "react-native";

import { useAppSafeArea } from "@hooks";
import { colors } from "@theme";
import { useTranslate } from "@translate";
import { twMerge } from "@utils";

import { Button } from "../button/button";
import { Text } from "../text/text";

type PageProps = {
  children: ReactNode;
  title?: string;
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
            leftComponent={<X color={colors.text} size={24} />}
            onPress={onClose}
          />
        </View>
      ) : null}
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
