import * as LucideIcons from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";

import { colors } from "@theme";

export type IconName = {
  [K in keyof typeof LucideIcons]: (typeof LucideIcons)[K] extends LucideIcon ? K : never;
}[keyof typeof LucideIcons];

export type IconColor = keyof typeof colors;

export type IconProps = {
  name: IconName;
  size?: number;
  color?: IconColor;
  fill?: IconColor;
  strokeWidth?: number;
};

export function Icon({ name, size = 24, color = "text", fill, strokeWidth = 2 }: IconProps) {
  const IconComponent = LucideIcons[name];

  return (
    <IconComponent
      size={size}
      color={colors[color]}
      fill={fill ? colors[fill] : "none"}
      strokeWidth={strokeWidth}
    />
  );
}
