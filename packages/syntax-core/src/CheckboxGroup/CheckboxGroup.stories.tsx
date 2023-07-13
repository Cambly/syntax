import { type StoryObj, type Meta } from "@storybook/react";
import CheckboxGroup, { type checkedOptionProps } from "./CheckboxGroup";
import { useState, type ReactElement } from "react";

export default {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1197%3A6474&mode=dev",
    },
  },
  argTypes: {
    options: { control: { disable: true } },
    onFormChange: { control: { disable: true } },
    selections: { control: { disable: true } },
    size: {
      options: ["sm", "md"],
      control: { type: "radio" },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof CheckboxGroup>;

export const Default: StoryObj<typeof CheckboxGroup> = {
  args: {
    options: [
      { value: "value1", label: "Event 1" },
      { value: "value2", label: "Event 2" },
      { value: "value3", label: "Event 3" },
    ],
    selections: { value1: false, value2: false, value3: false },
    onFormChange: () => {
      /* empty */
    },
  },
};

const CheckboxGroupInteractive = (): ReactElement => {
  const options = [
    { value: "value1", label: "1989" },
    { value: "value2", label: "Reputation" },
    { value: "value3", label: "Speak Now" },
  ];
  const [selections, setSelections] = useState<checkedOptionProps>({
    value1: false,
    value2: false,
    value3: true,
  });
  const onFormChange = (newSelections: checkedOptionProps) =>
    setSelections(newSelections);

  return (
    <CheckboxGroup
      options={options}
      selections={selections}
      onFormChange={onFormChange}
    />
  );
};

export const Interactive: StoryObj<typeof CheckboxGroup> = {
  render: () => <CheckboxGroupInteractive />,
};
