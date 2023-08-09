import React from "react";
import { type StoryObj, type Meta } from "@storybook/react";
import Template from "./Template";

export default {
  title: "Components/Template",
  component: Template,
  parameters: {
    design: {
      type: "figma",
      url: "UPDATE_FIGMA_LINK_HERE",
    },
  },
  argTypes: {
    // argTypes here (can delete if none)
  },
  tags: ["autodocs"],
} as Meta<typeof Template>;

export const Default: StoryObj<typeof Template> = {
  args: {},
  render: ({ ...args }) => <Template {...args} />,
};
