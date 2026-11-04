import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useEffect, useState } from "react";

const STATUS_UPDATE_INTERVAL_MS = 100;

export function useSoundPlayer(url: string | null) {
  const player = useAudioPlayer(url, { updateInterval: STATUS_UPDATE_INTERVAL_MS });
  const status = useAudioPlayerStatus(player);
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const failed = url !== null && failedUrl === url;
  const hasDuration = status.duration > 0;
  const finished = status.didJustFinish || (hasDuration && status.currentTime >= status.duration);
  const progress = hasDuration ? Math.min(status.currentTime / status.duration, 1) : 0;

  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true });
  }, []);

  useEffect(() => {
    if (status.error) {
      setFailedUrl(url);
    }
  }, [status.error, url]);

  async function play() {
    if (finished) {
      await player.seekTo(0);
    }

    player.play();
  }

  function pause() {
    player.pause();
  }

  return { isPlaying: status.playing, isReady: status.isLoaded && !failed, progress, play, pause };
}
