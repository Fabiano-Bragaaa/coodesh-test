import { fireEvent, render, screen } from "test-utils";

import { PasswordInput } from "../password-input";

function renderPasswordInput() {
  return render(<PasswordInput label="Senha" placeholder="Sua senha" value="123456" onChangeText={jest.fn()} />);
}

describe("<PasswordInput />", () => {
  it("starts with the password hidden", async () => {
    await renderPasswordInput();

    expect(screen.getByPlaceholderText("Sua senha")).toHaveProp("secureTextEntry", true);
    expect(screen.getByRole("button", { name: "Mostrar senha" })).toBeOnTheScreen();
  });

  it("shows the password when the eye is pressed and hides it again on the next press", async () => {
    await renderPasswordInput();

    await fireEvent.press(screen.getByRole("button", { name: "Mostrar senha" }));

    expect(screen.getByPlaceholderText("Sua senha")).toHaveProp("secureTextEntry", false);

    await fireEvent.press(screen.getByRole("button", { name: "Esconder senha" }));

    expect(screen.getByPlaceholderText("Sua senha")).toHaveProp("secureTextEntry", true);
  });
});
