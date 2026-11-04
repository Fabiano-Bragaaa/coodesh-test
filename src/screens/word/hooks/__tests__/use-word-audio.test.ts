import * as Speech from "expo-speech";
import { act, renderHook } from "test-utils";

import { useWordAudio } from "../use-word-audio";

const HELLO_AUDIO = "https://api.dictionaryapi.dev/media/pronunciations/en/hello-uk.mp3";

const mockPlayer = {
  play: jest.fn(),
  pause: jest.fn(),
  seekTo: jest.fn(() => Promise.resolve()),
};

const mockStatus = {
  playing: false,
  currentTime: 0,
  duration: 0,
  didJustFinish: false,
};

jest.mock("expo-audio", () => ({
  setAudioModeAsync: jest.fn(),
  useAudioPlayer: jest.fn(() => mockPlayer),
  useAudioPlayerStatus: jest.fn(() => mockStatus),
}));

type WordAudioProps = {
  word: string;
  audioUrl: string | null;
};

function renderWordAudio(initialProps: WordAudioProps) {
  return renderHook(({ word, audioUrl }: WordAudioProps) => useWordAudio(word, audioUrl), { initialProps });
}

function finishSpeech() {
  const options = jest.mocked(Speech.speak).mock.calls[0]?.[1];

  options?.onDone?.();
}

describe("useWordAudio", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.assign(mockStatus, { playing: false, currentTime: 0, duration: 0, didJustFinish: false });
  });

  describe("when the word has a recording", () => {
    it("plays the recording", async () => {
      const { result } = await renderWordAudio({ word: "hello", audioUrl: HELLO_AUDIO });

      await act(() => result.current.toggle());

      expect(result.current.hasRecording).toBe(true);
      expect(mockPlayer.play).toHaveBeenCalledTimes(1);
      expect(Speech.speak).not.toHaveBeenCalled();
    });

    it("pauses the recording while it plays and reports the progress", async () => {
      Object.assign(mockStatus, { playing: true, currentTime: 0.5, duration: 2 });

      const { result } = await renderWordAudio({ word: "hello", audioUrl: HELLO_AUDIO });

      expect(result.current.isPlaying).toBe(true);
      expect(result.current.progress).toBe(0.25);

      await act(() => result.current.toggle());

      expect(mockPlayer.pause).toHaveBeenCalledTimes(1);
      expect(mockPlayer.play).not.toHaveBeenCalled();
    });

    it("starts over when the recording already finished", async () => {
      Object.assign(mockStatus, { currentTime: 2, duration: 2, didJustFinish: true });

      const { result } = await renderWordAudio({ word: "hello", audioUrl: HELLO_AUDIO });

      expect(result.current.progress).toBe(1);

      await act(() => result.current.toggle());

      expect(mockPlayer.seekTo).toHaveBeenCalledWith(0);
      expect(mockPlayer.play).toHaveBeenCalledTimes(1);
    });
  });

  describe("when the word has no recording", () => {
    it("speaks the word in English until the speech is done", async () => {
      const { result } = await renderWordAudio({ word: "aardwolves", audioUrl: null });

      await act(() => result.current.toggle());

      expect(result.current.hasRecording).toBe(false);
      expect(result.current.isPlaying).toBe(true);
      expect(Speech.speak).toHaveBeenCalledWith("aardwolves", expect.objectContaining({ language: "en-US" }));
      expect(mockPlayer.play).not.toHaveBeenCalled();

      await act(() => finishSpeech());

      expect(result.current.isPlaying).toBe(false);
    });

    it("stops speaking when toggled again", async () => {
      const { result } = await renderWordAudio({ word: "aardwolves", audioUrl: null });

      await act(() => result.current.toggle());
      await act(() => result.current.toggle());

      expect(Speech.stop).toHaveBeenCalledTimes(1);
    });

    it("stops speaking when the word changes", async () => {
      const { result, rerender } = await renderWordAudio({ word: "aardwolves", audioUrl: null });

      await act(() => result.current.toggle());
      await rerender({ word: "aardvark", audioUrl: null });

      expect(Speech.stop).toHaveBeenCalledTimes(1);
    });
  });
});
