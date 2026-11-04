import * as Speech from "expo-speech";
import { useEffect, useRef, useState } from "react";

const SPEECH_LANGUAGE = "en-US";
const SPEECH_BASE_MS = 400;
const SPEECH_MS_PER_CHARACTER = 90;
const PROGRESS_TICK_MS = 100;
const ALMOST_DONE = 0.95;

export function useSpeech(text: string) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [progress, setProgress] = useState(0);
  const startedAt = useRef(0);

  useEffect(() => {
    setProgress(0);

    return () => {
      Speech.stop();
    };
  }, [text]);

  useEffect(() => {
    if (!isSpeaking) {
      return;
    }

    const estimatedMs = SPEECH_BASE_MS + text.length * SPEECH_MS_PER_CHARACTER;
    const timer = setInterval(() => {
      setProgress(Math.min((Date.now() - startedAt.current) / estimatedMs, ALMOST_DONE));
    }, PROGRESS_TICK_MS);

    return () => clearInterval(timer);
  }, [isSpeaking, text]);

  function finish() {
    setIsSpeaking(false);
    setProgress(1);
  }

  function interrupt() {
    setIsSpeaking(false);
    setProgress(0);
  }

  function speak() {
    startedAt.current = Date.now();
    setProgress(0);
    setIsSpeaking(true);
    Speech.speak(text, { language: SPEECH_LANGUAGE, onDone: finish, onStopped: interrupt, onError: interrupt });
  }

  function stop() {
    Speech.stop();
  }

  return { isSpeaking, progress, speak, stop };
}
