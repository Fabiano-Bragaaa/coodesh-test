import { tv } from "@utils";

export const buttonStyle = tv({
  slots: {
    container: "flex-row items-center justify-center gap-2",
    label: "text-body-lg font-semibold",
  },
  variants: {
    variant: {
      primary: {
        container: "bg-primary",
        label: "text-primary-on",
      },
      outline: {
        container: "border border-border-strong bg-surface",
        label: "text-text",
      },
      ghost: {
        container: "bg-transparent",
        label: "text-text",
      },
    },
    size: {
      md: { container: "h-12 w-full rounded-md px-5" },
      icon: { container: "size-10 rounded-full" },
    },
    pressed: {
      true: { container: "opacity-70" },
    },
    inactive: {
      true: { container: "opacity-40" },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type ButtonVariant = NonNullable<Parameters<typeof buttonStyle>[0]>["variant"];
export type ButtonSize = NonNullable<Parameters<typeof buttonStyle>[0]>["size"];
