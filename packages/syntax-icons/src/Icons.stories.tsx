import { type StoryObj, type Meta } from "@storybook/react";

export default {
  title: "Icons/Icons",
  // component: ,
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
} as Meta;

export const Default: StoryObj = {
  args: {},
  render: () => {
    return <div>text text</div>;
  },
};
