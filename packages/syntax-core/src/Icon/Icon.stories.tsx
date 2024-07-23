import { type StoryObj, type Meta } from "@storybook/react";
import Icon from "./Icon";
import allColors from "../colors/allColors";

export default {
  title: "Components/Icon",
  component: Icon,
  args: {
    size: 200,
  },
  argTypes: {
    size: {
      options: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900],
      control: { type: "radio" },
    },
    color: {
      control: { type: "select" },
      options: allColors,
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Icon>;

export const Default: StoryObj<typeof Icon> = {
  args: {
    size: 200,
    path: "m22 11-.5-3.5h-6l-2-5.5h-3l-2 5.5h-6L2 11l4.5 3L4 20.5 7 22l5-4 5 4 3-1.5-2.5-6.5z",
  },
};
