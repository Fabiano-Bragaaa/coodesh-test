import { tv } from "@utils";

export const segmentStyle = tv({
  slots: {
    container: "flex-1 items-center justify-center py-2.5",
    label: "text-body-md font-medium",
  },
  variants: {
    active: {
      true: {
        container: "bg-primary",
        label: "text-primary-on",
      },
      false: {
        container: "bg-surface",
        label: "text-text-muted",
      },
    },
    divided: {
      true: { container: "border-l border-border" },
    },
  },
});
