import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Divider } from "./src/Divider";

export default {
  title: "Divider",
  component: Divider,
  parameters: {
    design: {
      name: "Figma",
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/Cambly-Design-System?node-id=1007%3A4101",
    },
    previewTabs: {
      "storybook/docs/panel": {
        hidden: true,
      },
    },
  },
} as ComponentMeta<typeof Divider>;

export const Default: ComponentStory<typeof Divider> = (args) => (
  <Divider {...args} />
);
