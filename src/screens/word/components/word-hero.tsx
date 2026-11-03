import { View } from "react-native";

import { Text } from "@components";

type WordHeroProps = {
  word: string;
  phonetic: string | null;
};

export function WordHero({ word, phonetic }: WordHeroProps) {
  return (
    <View className="h-48 items-center justify-center gap-2 rounded-lg bg-primary-soft px-4">
      <Text variant="title-xl" align="center">
        {word}
      </Text>
      {phonetic ? (
        <Text variant="body-lg" align="center" className="text-text-muted">
          {phonetic}
        </Text>
      ) : null}
    </View>
  );
}
