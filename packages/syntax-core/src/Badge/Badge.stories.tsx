import { type StoryObj, type Meta } from "@storybook/react";
import Badge from "./Badge";
import RepeatIcon from "@mui/icons-material/Repeat";
import Refresh from "../../../syntax-icons/src/icons/Refresh";

export default {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?type=design&node-id=3953-11313&t=zb8FOHg4yiwNkZZS-0",
    },
  },
  args: {
    color: "sky",
  },
  argTypes: {
    color: {
      options: [
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

export const WithSyntaxIcon: StoryObj<typeof Badge> = {
  args: { icon: Refresh, text: "Refresh" },
};

export const WithIcon: StoryObj<typeof Badge> = {
  args: {
    color: "gray370",
    icon: RepeatIcon,
    text: "Every Wednesday",
  },
};
