import { extendTailwindMerge } from "tailwind-merge";

export const twMergeConfig = {
  extend: {
    classGroups: {
      "font-size": [
        {
          text: ["title-xl", "title-lg", "title-md", "body-lg", "body-md", "label-md", "label-sm"],
        },
      ],
      "text-color": [
        {
          text: ["text", "text-muted", "text-faint", "text-inverse", "primary", "primary-on", "danger"],
        },
      ],
    },
  },
};

export const twMerge = extendTailwindMerge(twMergeConfig);
