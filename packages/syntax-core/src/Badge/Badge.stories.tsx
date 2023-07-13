import { type StoryObj, type Meta } from "@storybook/react";
import Badge from "./Badge";

export default {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?type=design&node-id=3953-11313&t=zb8FOHg4yiwNkZZS-0",
    },
  },
  argTypes: {
    color: {
      options: [
        "gray200",
        "gray900",
        "destructive700",
        "orange700",
        "yellow700",
        "success700",
        "primary700",
        "purple700",
      ],
      control: { type: "radio" },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Badge>;

export const Default: StoryObj<typeof Badge> = {
  args: { text: "Call to action" },
};
