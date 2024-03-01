import React from "react";
import { Preview } from "@storybook/react";
import ThemeProvider from "../../../packages/syntax-core/src/ThemeProvider/ThemeProvider";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "classic",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["classic", "cambio"],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;
      return (
        <ThemeProvider themeName={theme}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;

export const decorators = [(Story) => <Story />];
