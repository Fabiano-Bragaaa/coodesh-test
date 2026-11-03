import { tv } from "@utils";

export const textStyle = tv({
  base: "text-text",
  variants: {
    variant: {
      "title-xl": "text-title-xl font-bold",
      "title-lg": "text-title-lg font-bold",
      "title-md": "text-title-md font-semibold",
      "body-lg": "text-body-lg",
      "body-md": "text-body-md",
      "label-md": "text-label-md font-medium",
      "label-sm": "text-label-sm font-semibold uppercase tracking-wider",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "body-lg",
    align: "left",
  },
});

export type TextVariant = NonNullable<Parameters<typeof textStyle>[0]>["variant"];
export type TextAlign = NonNullable<Parameters<typeof textStyle>[0]>["align"];
