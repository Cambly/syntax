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
  label = "TextField label",
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
