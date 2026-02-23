import { type StoryObj, type Meta } from "@storybook/react";
import Divider from "./Divider";

export default {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    design: {
      name: "Figma",
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/Cambly-Design-System?node-id=1007%3A4101",
    },
  },
  args: {
    color: "gray370",
  },
  argTypes: {
    color: {
      options: [
        "white40",
        "white70",
        "gray270",
        "gray370",
        "gray870",
        "cream",
        "lilac",
        "navy",
        "orange",
        "pink",
        "purple",
        "red",
        "sky",
        "slate",
        "tan",
        "teal",
        "thistle",
      ],
      control: { type: "radio" },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Divider>;

export const Default: StoryObj<typeof Divider> = { args: {} };
