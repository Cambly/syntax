import { type StoryObj, type Meta } from "@storybook/react";
import Checkbox from "./Checkbox";
import React, { useState } from "react";
import Box from "../Box/Box";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1007-4098&t=XrEtordHSWZfgIGE-0",
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
  },
  tags: ["autodocs"],
} as Meta<typeof Checkbox>;

export const Default: StoryObj<typeof Checkbox> = {
  args: { label: "checkbox label" },
};

const CheckboxInteractive = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <Checkbox
      checked={isChecked}
      onChange={handleChange}
      label="checkbox label"
    />
  );
};

export const Interactive: StoryObj<typeof Checkbox> = {
  render: () => <CheckboxInteractive />,
};

export const FixDoesNotBlowoutHeight: StoryObj<typeof Checkbox> = {
  render: () => (
    <Box height="100px" overflowY="auto" padding={3}>
      <CheckboxInteractive />
      <CheckboxInteractive />
      <CheckboxInteractive />
      <CheckboxInteractive />
      <CheckboxInteractive />
      <CheckboxInteractive />
      <CheckboxInteractive />
      <CheckboxInteractive />
      <CheckboxInteractive />
      <CheckboxInteractive />
      <CheckboxInteractive />
      <CheckboxInteractive />
      <CheckboxInteractive />
      <CheckboxInteractive />
      <CheckboxInteractive />
      <CheckboxInteractive />
      <CheckboxInteractive />
      <CheckboxInteractive />
      <CheckboxInteractive />
      <CheckboxInteractive />
      <CheckboxInteractive />
    </Box>
  ),
};
