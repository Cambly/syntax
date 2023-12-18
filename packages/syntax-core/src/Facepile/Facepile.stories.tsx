import { type StoryObj, type Meta } from "@storybook/react";
import Facepile from "./Facepile";
import image from "../../../../apps/storybook/assets/images/jane.webp";

export default {
  title: "Components/Facepile",
  component: Facepile,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?type=design&node-id=8051-10795&mode=design&t=3nfRP12usxROfc12-0",
    },
  },
  argTypes: {
    size: {
      options: ["sm", "md", "lg", "xl"],
      control: { type: "radio" },
    },
    reverseOrientation: {
      options: [true, false],
      control: { type: "radio" },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Facepile>;

export const Default: StoryObj<typeof Facepile> = {
  args: {
    avatarPropsList: [{ key: image, accessibilityLabel: "Jane", src: image }],
    defaultAccessibilityLabel: "defaultLabel",
    limit: 3,
  },
};
