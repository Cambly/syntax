import { StoryObj, Meta } from "@storybook/react";
import RadioButton from "./RadioButton";
import React, { useState } from "react";

export default {
  title: "RadioButton",
  component: RadioButton,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1007-4104&t=Vt5ql6LLs6d29szu-0",
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
    error: { control: "boolean" },
    label: { control: "string" },
  },
  tags: ["autodocs"],
} as Meta<typeof RadioButton>;

export const Default: StoryObj<typeof RadioButton> = {
  args: { label: "radioButton label" },
};

const RadioButtonInteractive = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <RadioButton
      checked={isChecked}
      onChange={handleChange}
      label="radiobutton label"
    />
  );
};

export const Interactive: StoryObj<typeof RadioButton> = {
  render: () => <RadioButtonInteractive />,
};
