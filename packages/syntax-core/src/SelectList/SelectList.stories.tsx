import { StoryObj, Meta } from "@storybook/react";
import SelectList from "./SelectList";

export default {
  title: "SelectList",
  component: SelectList,
  parameters: {
    design: {
      name: "Figma",
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1007-4102&t=7xGt6S9b6zUUiflR-0",
    },
  },
  tags: ["autodocs"],
} as Meta<typeof SelectList>;

export const Default: StoryObj<typeof SelectList> = {
  args: {
    options: [
      { label: "option 1", value: "opt1" },
      { label: "option 2", value: "opt2" },
      { label: "option 3", value: "opt3" },
    ],
    placeholderText: "Choose one",
  },
};
