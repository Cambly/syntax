import { type StoryObj, type Meta } from "@storybook/react";
import Box from "../Box/Box";
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
    on: "lightBackground",
    resize: "none",
    rows: 3,
    value: "",
    "data-testid": "",
    id: "",
  },
  argTypes: {
    disabled: {
      control: "boolean",
    },
    on: {
      options: ["lightBackground", "darkBackground"],
      control: { type: "radio" },
    },
    placeholder: {
      control: "text",
    },
    resize: {
      options: ["none", "horizontal", "vertical", "both"],
      control: { type: "radio" },
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
    <Box
      padding={2}
      dangerouslySetInlineStyle={{
        __style: {
          backgroundImage:
            args.on === "darkBackground"
              ? "linear-gradient(0deg, #000, #555 )"
              : null,
        },
      }}
    >
      <TextArea
        label={label}
        placeholder={placeholder}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        value={initialValue || value}
        {...args}
      />
    </Box>
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
