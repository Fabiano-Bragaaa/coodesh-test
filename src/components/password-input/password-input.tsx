import { useState } from "react";

import { useTranslate } from "@translate";

import { Button } from "../button/button";
import { Icon } from "../icon/icon";
import { TextInput, type TextInputProps } from "../text-input/text-input";

export type PasswordInputProps = Omit<TextInputProps, "rightComponent" | "secureTextEntry">;

export function PasswordInput(props: PasswordInputProps) {
  const { t } = useTranslate();
  const [isHidden, setIsHidden] = useState(true);

  function toggleVisibility() {
    setIsHidden((hidden) => !hidden);
  }

  return (
    <TextInput
      {...props}
      secureTextEntry={isHidden}
      rightComponent={
        <Button
          title={t(isHidden ? "form.showPassword" : "form.hidePassword")}
          variant="ghost"
          size="icon"
          leftComponent={<Icon name={isHidden ? "Eye" : "EyeOff"} size={20} color="textMuted" />}
          onPress={toggleVisibility}
        />
      }
    />
  );
}
