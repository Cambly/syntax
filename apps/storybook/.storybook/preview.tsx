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
};

export default preview;

export const decorators = [(Story) => <Story />];
