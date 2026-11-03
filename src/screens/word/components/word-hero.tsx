import { View } from "react-native";

import { Button, Icon, Text } from "@components";
import { useTranslate } from "@translate";

type WordHeroProps = {
  word: string;
  phonetic: string | null;
  favorite: boolean;
  onToggleFavorite: () => void;
};

export function WordHero({ word, phonetic, favorite, onToggleFavorite }: WordHeroProps) {
  const { t } = useTranslate();

  return (
    <View className="h-48 items-center justify-center gap-2 rounded-lg bg-primary-soft px-12">
      <Text variant="title-xl" align="center">
        {word}
      </Text>
      {phonetic ? (
        <Text variant="body-lg" align="center" className="text-text-muted">
          {phonetic}
        </Text>
      ) : null}
      <View className="absolute top-2 right-2">
        <Button
          title={t(favorite ? "word.unfavorite" : "word.favorite")}
          variant="ghost"
          size="icon"
          accessibilityState={{ selected: favorite }}
          leftComponent={<Icon name="Heart" color="primary" fill={favorite ? "primary" : undefined} />}
          onPress={onToggleFavorite}
        />
      </View>
    </View>
  );
}
