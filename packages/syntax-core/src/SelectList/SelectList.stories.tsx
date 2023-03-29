import { StoryObj, Meta } from "@storybook/react";
import SelectList from "./SelectList";
import React, { useState, ReactElement } from "react";

export default {
  title: "SelectList",
  component: SelectList,
  parameters: {
    design: {
      name: "Figma",
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1007-4102&t=7xGt6S9b6zUUiflR-0",
    },
  },
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
    disabled: {
      control: "boolean",
    },
    error: {
      control: "boolean",
    },
    onChange: { action: "clicked" },
  },
  tags: ["autodocs"],
} as Meta<typeof SelectList>;

const options = [
  { label: "option 1", value: "opt1" },
  { label: "option 2", value: "opt2" },
  { label: "option 3", value: "opt3" },
];

export const Default: StoryObj<typeof SelectList> = {
  args: {
    options,
    placeholderText: "Placeholder",
    helperText: "Helper text",
    label: "Label",
  },
};

const SelectListInteractive = (): ReactElement => {
  const [selection, setSelection] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelection(e.target.value);
  };
  return (
    <SelectList
      label="Label"
      helperText="Helper text"
      selectedValue={selection}
      placeholderText="Placeholder"
      onChange={onChange}
      options={options}
    />
  );
};

export const Interactive: StoryObj<typeof SelectList> = {
  render: () => <SelectListInteractive />,
};
