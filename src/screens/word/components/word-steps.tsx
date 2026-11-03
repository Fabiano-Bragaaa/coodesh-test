import { View } from "react-native";

import { Button } from "@components";
import { useTranslate } from "@translate";

type WordStepsProps = {
  previous: string | null;
  next: string | null;
  onSelect: (word: string) => void;
};

export function WordSteps({ previous, next, onSelect }: WordStepsProps) {
  const { t } = useTranslate();

  return (
    <View className="flex-row gap-3 pt-3">
      <Button
        title={t("word.previous")}
        variant="outline"
        disabled={!previous}
        onPress={() => previous && onSelect(previous)}
        containerClassName="flex-1"
      />
      <Button
        title={t("word.next")}
        variant="outline"
        disabled={!next}
        onPress={() => next && onSelect(next)}
        containerClassName="flex-1"
      />
    </View>
  );
}
