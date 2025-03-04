import { type StoryObj, type Meta } from "@storybook/react";
import Badge from "./Badge";
import Shuffle from "../../../syntax-icons/src/icons/Shuffle";
import Refresh from "../../../syntax-icons/src/icons/Refresh";
import Stars from "../../../syntax-icons/src/icons/Stars";
import Box from "../Box/Box";

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
        "cream",
        "yellow700",
        "silver",
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
    icon: Shuffle,
    text: "Every Wednesday",
  },
};

export const Multiple: StoryObj<typeof Box> = {
  render: () => (
    <Box display="flex" gap={1} direction="row">
      <Box width="fit-content" position="relative">
        <Badge color="yellow700" text="Every Wednesday" />
      </Box>
      <Box width="fit-content" position="relative">
        <Badge color="silver" icon={Stars} text="Premium" />
      </Box>
    </Box>
  ),
};
