import { type StoryObj, type Meta } from "@storybook/react";
import Badge from "./Badge";
import RepeatIcon from "@mui/icons-material/Repeat";

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
        // Classic
        "gray200",
        "gray900",
        "destructive700",
        "orange700",
        "yellow700",
        "success700",
        "primary700",
        "purple700",
        // Cambio
        "sky",
        "success300",
        "destructive300",
        "orange",
        "tan",
        "gray370",
        "gray870",
        "lilac",
        "thistle",
        "pink",
      ],
      control: { type: "radio" },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Badge>;

export const Default: StoryObj<typeof Badge> = {
  args: { text: "Call to action" },
};

export const WithIcon: StoryObj<typeof Badge> = {
  args: {
    color: "gray200",
    icon: RepeatIcon,
    text: "Every Wednesday",
  },
};
