import { type StoryObj, type Meta } from "@storybook/react";
import Avatar from "./Avatar";
import image from "../../../../apps/storybook/assets/images/jane.webp";

export default {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1206-4420&t=yFh7Ijhf6PU7Lin3-0",
    },
  },
  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg"],
      control: { type: "radio" },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Avatar>;

const DotIcon = () => (
  <div
    style={{
      height: "100%",
      width: "100%",
      backgroundColor: "green",
      borderRadius: "50%",
    }}
  />
);

export const Default: StoryObj<typeof Avatar> = {
  args: { accessibilityLabel: "Jane", src: image },
};
export const Small: StoryObj<typeof Avatar> = {
  args: { ...Default.args, size: "sm" },
};
export const Large: StoryObj<typeof Avatar> = {
  args: { ...Default.args, size: "lg" },
};

export const IconAvatar: StoryObj<typeof Avatar> = {
  args: { ...Default.args, icon: <DotIcon /> },
};
