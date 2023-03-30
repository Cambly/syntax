import { StoryObj, Meta } from "@storybook/react";
import SelectList from "./SelectList";
import React, { useState, ReactElement } from "react";
import SelectOption from "./SelectOption";

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

const Options = () => (
  <>
    {options.map((o) => (
      <SelectOption key={o.value} value={o.value} label={o.label} />
    ))}
  </>
);

export const Default: StoryObj<typeof SelectList> = {
  args: {
    placeholderText: "Placeholder",
    helperText: "Helper text",
    label: "Label",
    children: <Options />,
  },
};

const SelectListInteractive = (): ReactElement => {
  const [selectionValue, setSelectionValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectionValue(e.target.value);
  };
  return (
    <SelectList
      label="Label"
      helperText="Helper text"
      selectedValue={selectionValue}
      placeholderText="Placeholder"
      onChange={onChange}
    >
      <Options />
    </SelectList>
  );
};

export const Interactive: StoryObj<typeof SelectList> = {
  render: () => <SelectListInteractive />,
};
