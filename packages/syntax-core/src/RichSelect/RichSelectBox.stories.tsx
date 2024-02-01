import React, { useState, type ReactElement } from "react";
import { type StoryObj, type Meta } from "@storybook/react";
import RichSelectBox from "./RichSelectBox";

export default {
  title: "Components/RichSelect/RichSelectBox",
  component: RichSelectBox,
  parameters: {
    design: {
      name: "Figma",
      type: "figma",
      url: "https://www.figma.com/file/e0BhCuouCduwIhnB3D7NQc/Shoppable-Group-Lessons?node-id=190%3A12719&mode=dev",
    },
  },
  // argTypes: {
  //   size: {
  //     options: ["sm", "md", "lg"],
  //     control: { type: "radio" },
  //   },
  //   disabled: {
  //     control: "boolean",
  //   },
  //   onChange: { action: "clicked" },
  // },
  tags: ["autodocs"],
} as Meta<typeof RichSelectBox>;

const options = [
  { label: "Option 1", value: "opt1", name: "name1" },
  { label: "Option 2", value: "opt2", name: "name2" },
  { label: "Option 3", value: "opt3", name: "name3" },
];

const Options = () => (
  <>
    {options.map(({ label, value }) => (
      <RichSelectBox.Chip label={label} value={value} key={value} />
    ))}
  </>
);

const SelectPeople = () => (
  <RichSelectBox.OptGroup label="People">
    <RichSelectBox.Chip label="John" value="john" />
    <RichSelectBox.Chip label="Jane" value="jane" />
    <RichSelectBox.Chip label="Joe" value="joe" />
  </RichSelectBox.OptGroup>
);
const SelectPlaces = () => (
  <RichSelectBox.OptGroup label="Places">
    <RichSelectBox.Chip label="San Francisco" value="sf" />
    <RichSelectBox.Chip label="New York" value="ny" />
    <RichSelectBox.Chip label="Los Angeles" value="la" />
  </RichSelectBox.OptGroup>
);
const SelectTimes = () => (
  <RichSelectBox.OptGroup label="Times">
    <RichSelectBox.Chip label="Morning" value="morning" />
    <RichSelectBox.Chip label="Afternoon" value="afternoon" />
    <RichSelectBox.Chip label="Evening" value="evening" />
  </RichSelectBox.OptGroup>
);

export const Default: StoryObj<typeof RichSelectBox> = {
  args: {
    children: <Options />,
    helperText: "Helper text",
    label: "Label",
    placeholderText: "Placeholder",
    selectedValue: "opt1",
  },
};

export const Error: StoryObj<typeof RichSelectBox> = {
  args: {
    children: <Options />,
    errorText: "Select dropdown error message",
    helperText: "Helper text",
    label: "Label",
    placeholderText: "Placeholder",
  },
};

const RichSelectBoxInteractive = (): ReactElement => {
  const [selectionValue, setSelectionValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectionValue(e.target.value);
  };
  return (
    <RichSelectBox
      label="Label"
      helperText="Helper text"
      selectedValue={selectionValue}
      placeholderText="Placeholder"
      onChange={onChange}
    >
      <Options />
    </RichSelectBox>
  );
};

export const Interactive: StoryObj<typeof RichSelectBox> = {
  render: () => <RichSelectBoxInteractive />,
};

export const DisabledItems: StoryObj<typeof RichSelectBox> = {
  render: () => (
    <RichSelectBox label="Label" helperText="Helper text" selectedValue="opt1">
      <RichSelectBox.Chip label="Option 1" value="opt1" />
      <RichSelectBox.Chip label="Option 2" value="opt2" disabled />
      <RichSelectBox.Chip label="Option 3" value="opt3" />
    </RichSelectBox>
  ),
};

export const WhatIfItLookedLikeThis = (): ReactElement => {
  const [selectionValue, setSelectionValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectionValue(e.target.value);
  };
  return (
    <RichSelectBox onChange={onChange}>
      <RichSelectBox.OptGroup label="People">
        <RichSelectBox.Chip label="John" value="john" disabled />
        <RichSelectBox.Chip label="Jane" value="jane" />
        <RichSelectBox.Chip label="Joe" value="joe" />
      </RichSelectBox.OptGroup>
      <RichSelectBox.OptGroup label="Places">
        <RichSelectBox.Chip label="San Francisco" value="sf" />
        <RichSelectBox.Chip label="New York" value="ny" disabled />
        <RichSelectBox.Chip label="Los Angeles" value="la" />
      </RichSelectBox.OptGroup>
      <RichSelectBox.OptGroup label="Times">
        <RichSelectBox.Chip label="Morning" value="morning" />
        <RichSelectBox.Chip label="Afternoon" value="afternoon" />
        <RichSelectBox.Chip label="Evening" value="evening" disabled />
      </RichSelectBox.OptGroup>
    </RichSelectBox>
  );
};
