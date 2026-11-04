import { fireEvent, render, screen } from "test-utils";

import { WordAudio } from "../word-audio";

type WordAudioState = {
  visible?: boolean;
  hasRecording?: boolean;
  isPlaying?: boolean;
  progress?: number;
  onToggle?: () => void;
};

function renderWordAudio({
  visible = true,
  hasRecording = true,
  isPlaying = false,
  progress = 0,
  onToggle = jest.fn(),
}: WordAudioState) {
  return render(
    <WordAudio
      visible={visible}
      hasRecording={hasRecording}
      isPlaying={isPlaying}
      progress={progress}
      onToggle={onToggle}
    />,
  );
}

describe("<WordAudio />", () => {
  it("renders nothing while there is no word to play", async () => {
    await renderWordAudio({ visible: false });

    expect(screen.queryByRole("button")).not.toBeOnTheScreen();
  });

  it("plays from the button and shows how far the recording went", async () => {
    const onToggle = jest.fn();

    await renderWordAudio({ progress: 0.25, onToggle });
    await fireEvent.press(screen.getByRole("button", { name: "Ouvir a pronúncia" }));

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("progressbar")).toHaveAccessibilityValue({ now: 25 });
  });

  it("offers to pause while playing", async () => {
    await renderWordAudio({ isPlaying: true });

    expect(screen.getByRole("button", { name: "Pausar a pronúncia" })).toBeOnTheScreen();
  });

  it("explains the synthesized voice instead of the bar when there is no recording", async () => {
    await renderWordAudio({ hasRecording: false });

    expect(screen.getByText("Sem gravação disponível. A pronúncia sai na voz do aparelho.")).toBeOnTheScreen();
    expect(screen.queryByRole("progressbar")).not.toBeOnTheScreen();
  });
});
