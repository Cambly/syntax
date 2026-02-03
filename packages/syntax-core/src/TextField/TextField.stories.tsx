import { type StoryObj, type Meta } from "@storybook/react";
import TextField, { type TextFieldProps } from "./TextField";
import React, { useState } from "react";
import Box from "../Box/Box";
import Typography from "../Typography/Typography";

export default {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1007%3A4103",
    },
  },
  args: {
    label: "Label",
    placeholder: "Placeholder",
    disabled: false,
    on: "lightBackground",
    endBadge: "",
    errorText: "",
    helperText: "",
    type: "text",
    "data-testid": "",
    id: "",
    value: "",
    step: 1,
  },
  argTypes: {
    autoComplete: {
      options: ["current-password", "new-password", "off", "on", "email"],
      control: { type: "select" },
    },
    disabled: {
      control: "boolean",
    },
    endBadge: { control: "text" },
    on: {
      options: ["lightBackground", "darkBackground"],
      control: { type: "radio" },
    },
    placeholder: {
      control: "text",
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
}: Omit<TextFieldProps, "onChange">) {
  const [value, setValue] = useState("");
  return (
    <Box
      padding={2}
      dangerouslySetInlineStyle={{
        __style: {
          backgroundImage:
            rest.on === "darkBackground"
              ? "linear-gradient(0deg, #000, #555 )"
              : null,
        },
      }}
    >
      <TextField
        label={label}
        placeholder={placeholder}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        value={initialValue || value}
        {...rest}
      />
    </Box>
  );
}

export const Default: StoryObj<typeof TextField> = {
  render: (args) => <TextFieldDefault {...args} />,
};

export const helperText: StoryObj<typeof TextField> = {
  args: { helperText: "Helper text" },
  render: (args) => <TextFieldDefault {...args} />,
};

export const EndBadge: StoryObj<typeof TextField> = {
  args: { endBadge: "Minutes" },
  render: (args) => <TextFieldDefault {...args} />,
};

export const ErrorText: StoryObj<typeof TextField> = {
  args: { errorText: "This is an error" },
  render: (args) => <TextFieldDefault {...args} />,
};

export const TypeNumber: StoryObj<typeof TextField> = {
  args: { type: "number" },
  render: (args) => <TextFieldDefault {...args} />,
};

export const TimeWithStep: StoryObj<typeof TextField> = {
  args: { step: 900, type: "time" },
  render: (args) => <TextFieldDefault {...args} />,
};

export const WithLabelAsReactElement: StoryObj<typeof TextField> = {
  render: (args) => (
    <TextFieldDefault
      {...args}
      label={
        <Box display="flex" gap={1} direction="column">
          <Typography weight="semiBold" size={200}>
            Label
          </Typography>
          <Typography size={100} color="gray700">
            Sublabel text
          </Typography>
        </Box>
      }
    />
  ),
};
