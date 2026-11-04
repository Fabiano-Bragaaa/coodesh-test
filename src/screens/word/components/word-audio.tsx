import { View } from "react-native";

import { Button, Icon, ProgressBar, Text } from "@components";
import { useTranslate } from "@translate";

type WordAudioProps = {
  visible: boolean;
  hasRecording: boolean;
  isPlaying: boolean;
  progress: number;
  onToggle: () => void;
};

export function WordAudio({ visible, hasRecording, isPlaying, progress, onToggle }: WordAudioProps) {
  const { t } = useTranslate();

  if (!visible) {
    return null;
  }

  return (
    <View className="flex-row items-center gap-3">
      <Button
        title={t(isPlaying ? "word.pause" : "word.play")}
        variant="outline"
        size="icon"
        leftComponent={<Icon name={isPlaying ? "Pause" : "Play"} size={18} color="primary" fill="primary" />}
        onPress={onToggle}
      />
      {hasRecording ? (
        <ProgressBar progress={progress} label={t("word.audioProgress")} />
      ) : (
        <Text variant="body-md" className="flex-1 text-text-muted">
          {t("word.synthesizedVoice")}
        </Text>
      )}
    </View>
  );
}
