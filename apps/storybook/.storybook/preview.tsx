import React from "react";
import { Preview } from "@storybook/react-vite";
import ThemeProvider from "../../../packages/syntax-core/src/ThemeProvider/ThemeProvider";
import { darkTheme, lightTheme } from "./syntaxTheme";

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

  parameters: {
    darkMode: {
      dark: darkTheme,
      light: lightTheme,
      // stylePreview omitted → only the Storybook UI chrome toggles,
      // the story canvas / components are left untouched.
    },
  },

  tags: ["autodocs"],
};

export default preview;

export const decorators = [(Story) => <Story />];
