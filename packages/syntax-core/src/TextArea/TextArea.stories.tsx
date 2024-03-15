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
  argTypes: {
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof TextArea>;

function TextAreaDefault({
  label = "Label",
  placeholder = "Placeholder",
  value: initialValue = "",
  ...rest
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
      {...rest}
    />
  );
}

export const Default: StoryObj<typeof TextArea> = {
  render: (args) => <TextAreaDefault {...args} />,
};

export const SizeSmClassicOnly: StoryObj<typeof TextArea> = {
  render: (args) => <TextAreaDefault size="sm" {...args} />,
};

export const SizeMd: StoryObj<typeof TextArea> = {
  render: (args) => <TextAreaDefault size="md" {...args} />,
};

export const SizeLgClassicOnly: StoryObj<typeof TextArea> = {
  render: (args) => <TextAreaDefault size="lg" {...args} />,
};

export const helperText: StoryObj<typeof TextArea> = {
  render: (args) => <TextAreaDefault helperText="Helper text" {...args} />,
};

export const ErrorText: StoryObj<typeof TextArea> = {
  render: (args) => <TextAreaDefault errorText="This is an error" {...args} />,
};
