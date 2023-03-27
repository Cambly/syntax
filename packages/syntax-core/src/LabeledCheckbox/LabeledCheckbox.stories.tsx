import { StoryObj, Meta } from "@storybook/react";
import LabledCheckbox from "./LabeledCheckbox";

export default {
  title: "LabledCheckbox",
  component: LabledCheckbox,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1206-4420&t=yFh7Ijhf6PU7Lin3-0",
    },
  },
  argTypes: {
    checked: {
      control: "boolean",
    },
    size: {
      options: ["sm", "md"],
      control: { type: "radio" },
    },
    disabled: {
      control: "boolean",
    },
    onClick: { action: "clicked" },
    onKeyDown: { action: "hit space" },
    error: { control: "boolean" },
  },
  tags: ["autodocs"],
} as Meta<typeof LabledCheckbox>;

export const Default: StoryObj<typeof LabledCheckbox> = {
  args: { label: "checkbox label" },
};
