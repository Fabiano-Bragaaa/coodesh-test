import { fireEvent, render, screen } from "test-utils";

import { Button } from "../button";

function findSpinners() {
  return screen.container.queryAll((element) => element.type === "ActivityIndicator");
}

describe("<Button />", () => {
  it("renders the title", async () => {
    await render(<Button title="Entrar" />);

    expect(screen.getByRole("button", { name: "Entrar" })).toBeOnTheScreen();
    expect(findSpinners()).toHaveLength(0);
  });

  it("calls onPress when pressed", async () => {
    const onPress = jest.fn();

    await render(<Button title="Entrar" onPress={onPress} />);
    await fireEvent.press(screen.getByRole("button", { name: "Entrar" }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", async () => {
    const onPress = jest.fn();

    await render(<Button title="Entrar" disabled onPress={onPress} />);
    await fireEvent.press(screen.getByRole("button", { name: "Entrar" }));

    expect(screen.getByRole("button")).toBeDisabled();
    expect(onPress).not.toHaveBeenCalled();
  });

  it("shows a spinner instead of the title and blocks the press while loading", async () => {
    const onPress = jest.fn();

    await render(<Button title="Entrar" isLoading onPress={onPress} />);
    await fireEvent.press(screen.getByRole("button"));

    expect(screen.getByRole("button")).toBeBusy();
    expect(findSpinners()).toHaveLength(1);
    expect(screen.queryByText("Entrar")).not.toBeOnTheScreen();
    expect(onPress).not.toHaveBeenCalled();
  });
});
