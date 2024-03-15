import { type StoryObj, type Meta } from "@storybook/react";
import TextField from "./TextField";
import React, { useState } from "react";

export default {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1007%3A4103",
    },
  },
  argTypes: {
    autoComplete: {
      options: ["current-password", "new-password", "off", "on", "email"],
      control: { type: "select" },
    },
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
    type: {
      options: [
        "button",
        "checkbox",
        "color",
        "date",
        "datetime-local",
        "email",
        "file",
        "hidden",
        "image",
        "month",
        "number",
        "password",
        "radio",
        "range",
        "reset",
        "search",
        "submit",
        "tel",
        "text",
        "time",
        "url",
        "week",
      ],
      control: { type: "select" },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof TextField>;

function TextFieldDefault({
  label = "Label",
  placeholder = "Placeholder",
  value: initialValue = "",
  ...rest
}) {
  const [value, setValue] = useState("");
  return (
    <TextField
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

export const Default: StoryObj<typeof TextField> = {
  render: (args) => <TextFieldDefault {...args} />,
};

export const SizeSmClassicOnly: StoryObj<typeof TextField> = {
  render: (args) => <TextFieldDefault size="sm" {...args} />,
};

export const SizeMd: StoryObj<typeof TextField> = {
  render: (args) => <TextFieldDefault size="md" {...args} />,
};

export const SizeLgClassicOnly: StoryObj<typeof TextField> = {
  render: (args) => <TextFieldDefault size="lg" {...args} />,
};

export const helperText: StoryObj<typeof TextField> = {
  render: (args) => <TextFieldDefault helperText="Helper text" {...args} />,
};

export const ErrorText: StoryObj<typeof TextField> = {
  render: (args) => <TextFieldDefault errorText="This is an error" {...args} />,
};

export const TypeNumber: StoryObj<typeof TextField> = {
  render: (args) => <TextFieldDefault type="number" {...args} />,
};
