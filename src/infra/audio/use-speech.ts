import * as Speech from "expo-speech";
import { useEffect, useState } from "react";

const SPEECH_LANGUAGE = "en-US";

export function useSpeech(text: string) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, [text]);

  function finish() {
    setIsSpeaking(false);
  }

  function speak() {
    setIsSpeaking(true);
    Speech.speak(text, { language: SPEECH_LANGUAGE, onDone: finish, onStopped: finish, onError: finish });
  }

  function stop() {
    Speech.stop();
  }

  return { isSpeaking, speak, stop };
}
