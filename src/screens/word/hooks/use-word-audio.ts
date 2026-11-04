import { useSoundPlayer, useSpeech } from "@infra";

export function useWordAudio(word: string, audioUrl: string | null) {
  const sound = useSoundPlayer(audioUrl);
  const speech = useSpeech(word);
  const hasRecording = audioUrl !== null && sound.isReady;
  const isPlaying = hasRecording ? sound.isPlaying : speech.isSpeaking;

  function toggleRecording() {
    if (sound.isPlaying) {
      sound.pause();
      return;
    }

    sound.play();
  }

  function toggleSpeech() {
    if (speech.isSpeaking) {
      speech.stop();
      return;
    }

    speech.speak();
  }

  function toggle() {
    if (hasRecording) {
      toggleRecording();
      return;
    }

    toggleSpeech();
  }

  return { isPlaying, progress: hasRecording ? sound.progress : speech.progress, toggle };
}
