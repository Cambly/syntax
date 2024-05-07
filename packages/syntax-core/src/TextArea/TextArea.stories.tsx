import { type StoryObj, type Meta } from "@storybook/react";
import TextArea from "./TextArea";
import React, { useState } from "react";

export default {
  title: "Components/TextArea",
  component: TextArea,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1007%3A4103",
    },
  },
  args: {
    disabled: false,
    label: "Label",
    placeholder: "Placeholder",
    errorText: "",
    helperText: "",
    maxLength: 1024,
    rows: 3,
    value: "",
    "data-testid": "",
    id: "",
    resize: true,
  },
  argTypes: {
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
  tags: ["autodocs"],
} as Meta<typeof TextArea>;

function TextAreaDefault({
  label = "Label",
  placeholder = "Placeholder",
  value: initialValue = "",
  ...args
}) {
  const [value, setValue] = useState("");
  return (
    <TextArea
      label={label}
      placeholder={placeholder}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      value={initialValue || value}
      {...args}
    />
  );
}

export const Default: StoryObj<typeof TextArea> = {
  render: (args) => <TextAreaDefault {...args} />,
};

export const helperText: StoryObj<typeof TextArea> = {
  render: (args) => <TextAreaDefault helperText="Helper text" {...args} />,
};

export const ErrorText: StoryObj<typeof TextArea> = {
  render: (args) => <TextAreaDefault errorText="This is an error" {...args} />,
};
