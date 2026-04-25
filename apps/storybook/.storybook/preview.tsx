import React from "react";
import { Preview } from "@storybook/react-vite";
import ThemeProvider from "../../../packages/syntax-core/src/ThemeProvider/ThemeProvider";

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      );
    },
  ],

  tags: ["autodocs"],

  parameters: {
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Introduction",
          "Foundations",
          "Layout",
          "Actions",
          [
            "Buttons",
            [
              "ButtonGroup",
              "Button",
              "IconButton",
              "LinkButton",
              "IconLinkButton",
            ],
          ],
          "Inputs",
          "Navigation",
          "Feedback",
          "Data Display",
        ],
      },
    },
  },
};

export default preview;

export const decorators = [(Story) => <Story />];
