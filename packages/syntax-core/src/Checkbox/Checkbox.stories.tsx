import { type StoryObj, type Meta } from "@storybook/react";
import Checkbox from "./Checkbox";
import React, { useState } from "react";
import Box from "../Box/Box";
import Typography from "../Typography/Typography";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1007-4098&t=XrEtordHSWZfgIGE-0",
    },
  },
  args: {
    label: "checkbox label",
    disabled: false,
    checked: false,
    error: false,
    size: "md",
    "data-testid": "",
    "aria-describedby": "",
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
    onChange: { action: "changed" },
    error: { control: "boolean" },
  },
  tags: ["autodocs"],
} as Meta<typeof Checkbox>;

export const Default: StoryObj<typeof Checkbox> = {};

const CheckboxInteractive = ({
  label = "checkbox label",
  "aria-describedby": ariaDescribedby,
}: {
  label?: string;
  "aria-describedby"?: string;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <Checkbox
      aria-describedby={ariaDescribedby}
      checked={isChecked}
      onChange={handleChange}
      label={label}
    />
  );
};

export const Interactive: StoryObj<typeof Checkbox> = {
  render: () => <CheckboxInteractive />,
};

export const FixDoesNotBlowoutHeight: StoryObj<typeof Checkbox> = {
  render: () => (
    <Box
      display="flex"
      direction="column"
      height="100px"
      overflowY="auto"
      padding={3}
      gap={3}
    >
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
      <CheckboxInteractive label="Checkbox with a long label to test the responsive behavior of Checkbox" />
    </Box>
  ),
};

export const Accessibility: StoryObj<typeof Checkbox> = {
  render: () => (
    <Box
      display="flex"
      direction="column"
      height="100px"
      overflowY="auto"
      padding={3}
      gap={3}
    >
      <CheckboxInteractive aria-describedby="checkboxes" />
      <CheckboxInteractive aria-describedby="checkboxes" />
      <CheckboxInteractive aria-describedby="checkboxes" />
      <CheckboxInteractive aria-describedby="checkboxes" />
      <CheckboxInteractive aria-describedby="checkboxes" />

      <Box id="checkboxes">
        <Typography>This is text that describes the checkbox above!</Typography>
      </Box>
    </Box>
  ),
};
