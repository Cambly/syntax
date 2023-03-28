import { StoryObj, Meta } from "@storybook/react";
import LabeledCheckbox from "./LabeledCheckbox";
import React, { useState } from "react";

export default {
  title: "LabeledCheckbox",
  component: LabeledCheckbox,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1349-3060&t=xav9res3baecfNQE-0",
    },
  },
  argTypes: {
    checked: {
      control: "boolean",
    },
    size: {
      options: ["sm", "md"],
      control: { type: "radio" },
    },
    disabled: {
      control: "boolean",
    },
    onClick: { action: "clicked" },
    onKeyDown: { action: "hit space" },
    error: { control: "boolean" },
  },
  tags: ["autodocs"],
} as Meta<typeof LabeledCheckbox>;

export const Default: StoryObj<typeof LabeledCheckbox> = {
  args: { label: "checkbox label" },
};

const CheckboxInteractive = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <LabeledCheckbox
      checked={isChecked}
      onChange={handleChange}
      label="checkbox label"
    />
  );
};

export const Interactive: StoryObj<typeof LabeledCheckbox> = {
  render: () => (
    <>
      <CheckboxInteractive />
    </>
  ),
};
