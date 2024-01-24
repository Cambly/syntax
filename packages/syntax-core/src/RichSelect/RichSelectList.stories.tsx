import { type StoryObj, type Meta } from "@storybook/react";
import RichSelectList from "./RichSelectList";
import React, { useState, type ReactElement } from "react";
import Box from "../Box/Box.js";

export default {
  title: "Components/RichSelectList",
  component: RichSelectList,
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
    onChange: { action: "clicked" },
  },
  tags: ["autodocs"],
} as Meta<typeof RichSelectList>;

const options = [
  { label: "Option 1", value: "opt1", name: "name1" },
  { label: "Option 2", value: "opt2", name: "name2" },
  { label: "Option 3", value: "opt3", name: "name3" },
];

const Options = () => (
  <>
    {options.map(({ label, name, value }) => (
      <RichSelectList.Chip
        key={value}
        value={value}
        label={label}
        name={name}
      />
    ))}
  </>
);

export const WhatIfItLookedLikeThis = (): ReactElement => {
  const [selectionValue, setSelectionValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectionValue(e.target.value);
  };
  return (
    <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
      <RichSelectList
        label="Label"
        helperText="Helper text"
        selectedValue={selectionValue}
        placeholderText="Placeholder"
        onChange={onChange}
      >
        <RichSelectList.OptGroup label="People">
          <RichSelectList.Chip label="John" value="john" disabled />
          <RichSelectList.Chip label="Jane" value="jane" />
          <RichSelectList.Chip selected label="Joe" value="joe" />
        </RichSelectList.OptGroup>
        <RichSelectList.OptGroup label="Places">
          <RichSelectList.Chip label="San Francisco" value="sf" />
          <RichSelectList.Chip label="New York" value="ny" disabled />
          <RichSelectList.Chip label="Los Angeles" value="la" />
        </RichSelectList.OptGroup>
        <RichSelectList.OptGroup label="Times">
          <RichSelectList.Chip label="Morning" value="morning" />
          <RichSelectList.Chip label="Afternoon" value="afternoon" />
          <RichSelectList.Chip label="Evening" value="evening" disabled />
        </RichSelectList.OptGroup>
        <RichSelectList.OptGroup label="Colors">
          <RichSelectList.Chip label="Red" value="red" />
          <RichSelectList.Chip label="Green" value="green" />
          <RichSelectList.Chip label="Blue" value="blue" />
          <RichSelectList.Chip label="Yellow" value="yellow" />
          <RichSelectList.Chip label="Purple" value="purple" />
          <RichSelectList.Chip label="Orange" value="orange" />
          <RichSelectList.Chip label="Black" value="black" />
          <RichSelectList.Chip label="White" value="white" />
          <RichSelectList.Chip label="Pink" value="pink" />
        </RichSelectList.OptGroup>
        <RichSelectList.OptGroup label="Planets">
          <RichSelectList.Chip label="Mercury" value="mercury" />
          <RichSelectList.Chip label="Venus" value="venus" />
          <RichSelectList.Chip label="Earth" value="earth" />
          <RichSelectList.Chip label="Mars" value="mars" />
          <RichSelectList.Chip label="Jupiter" value="jupiter" />
          <RichSelectList.Chip label="Saturn" value="saturn" />
          <RichSelectList.Chip label="Uranus" value="uranus" />
          <RichSelectList.Chip label="Neptune" value="neptune" />
        </RichSelectList.OptGroup>
        <RichSelectList.OptGroup label="Stars">
          <RichSelectList.Chip label="Sun" value="sun" />
          <RichSelectList.Chip label="Sirius" value="sirius" />
          <RichSelectList.Chip label="Canopus" value="canopus" />
          <RichSelectList.Chip label="Alpha Centauri" value="alphaCentauri" />
          <RichSelectList.Chip label="Arcturus" value="arcturus" />
          <RichSelectList.Chip label="Vega" value="vega" />
          <RichSelectList.Chip label="Capella" value="capella" />
          <RichSelectList.Chip label="Rigel" value="rigel" />
          <RichSelectList.Chip label="Procyon" value="procyon" />
          <RichSelectList.Chip label="Achernar" value="achernar" />
          <RichSelectList.Chip label="Betelgeuse" value="betelgeuse" />
          <RichSelectList.Chip label="Hadar" value="hadar" />
          <RichSelectList.Chip label="Altair" value="altair" />
          <RichSelectList.Chip label="Acrux" value="acrux" />
          <RichSelectList.Chip label="Aldebaran" value="aldebaran" />
          <RichSelectList.Chip label="Antares" value="antares" />
          <RichSelectList.Chip label="Spica" value="spica" />
          <RichSelectList.Chip label="Pollux" value="pollux" />
          <RichSelectList.Chip label="Fomalhaut" value="fomalhaut" />
          <RichSelectList.Chip label="Deneb" value="deneb" />
          <RichSelectList.Chip label="Mimosa" value="mimosa" />
          <RichSelectList.Chip label="Regulus" value="regulus" />
          <RichSelectList.Chip label="Adhara" value="adhara" />
          <RichSelectList.Chip label="Shaula" value="shaula" />
          <RichSelectList.Chip label="Castor" value="castor" />
          <RichSelectList.Chip label="Gacrux" value="gacrux" />
        </RichSelectList.OptGroup>
      </RichSelectList>
    </Box>
  );
};

export const VeryLongContent = (): ReactElement => {
  const [selectionValue, setSelectionValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectionValue(e.target.value);
  };
  return (
    <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
      <RichSelectList
        label="Label"
        helperText="Helper text"
        selectedValue={selectionValue}
        placeholderText="Placeholder"
        onChange={onChange}
      >
        <RichSelectList.Chip label="John" value="john" disabled />
        <RichSelectList.Chip label="Jane" value="jane" />
        <RichSelectList.Chip selected label="Joe" value="joe" />
        <RichSelectList.Chip label="San Francisco" value="sf" />
        <RichSelectList.Chip label="New York" value="ny" disabled />
        <RichSelectList.Chip label="Los Angeles" value="la" />
        <RichSelectList.Chip label="Morning" value="morning" />
        <RichSelectList.Chip label="Afternoon" value="afternoon" />
        <RichSelectList.Chip label="Evening" value="evening" disabled />
        <RichSelectList.Chip label="Red" value="red" />
        <RichSelectList.Chip label="Green" value="green" />
        <RichSelectList.Chip label="Blue" value="blue" />
        <RichSelectList.Chip label="Yellow" value="yellow" />
        <RichSelectList.Chip label="Purple" value="purple" />
        <RichSelectList.Chip label="Orange" value="orange" />
        <RichSelectList.Chip label="Black" value="black" />
        <RichSelectList.Chip label="White" value="white" />
        <RichSelectList.Chip label="Pink" value="pink" />
        <RichSelectList.Chip label="Mercury" value="mercury" />
        <RichSelectList.Chip label="Venus" value="venus" />
        <RichSelectList.Chip label="Earth" value="earth" />
        <RichSelectList.Chip label="Mars" value="mars" />
        <RichSelectList.Chip label="Jupiter" value="jupiter" />
        <RichSelectList.Chip label="Saturn" value="saturn" />
        <RichSelectList.Chip label="Uranus" value="uranus" />
        <RichSelectList.Chip label="Neptune" value="neptune" />
        <RichSelectList.Chip label="Sun" value="sun" />
        <RichSelectList.Chip label="Sirius" value="sirius" />
        <RichSelectList.Chip label="Canopus" value="canopus" />
        <RichSelectList.Chip label="Alpha Centauri" value="alphaCentauri" />
        <RichSelectList.Chip label="Arcturus" value="arcturus" />
        <RichSelectList.Chip label="Vega" value="vega" />
        <RichSelectList.Chip label="Capella" value="capella" />
        <RichSelectList.Chip label="Rigel" value="rigel" />
        <RichSelectList.Chip label="Procyon" value="procyon" />
        <RichSelectList.Chip label="Achernar" value="achernar" />
        <RichSelectList.Chip label="Betelgeuse" value="betelgeuse" />
        <RichSelectList.Chip label="Hadar" value="hadar" />
        <RichSelectList.Chip label="Altair" value="altair" />
        <RichSelectList.Chip label="Acrux" value="acrux" />
        <RichSelectList.Chip label="Aldebaran" value="aldebaran" />
        <RichSelectList.Chip label="Antares" value="antares" />
        <RichSelectList.Chip label="Spica" value="spica" />
        <RichSelectList.Chip label="Pollux" value="pollux" />
        <RichSelectList.Chip label="Fomalhaut" value="fomalhaut" />
        <RichSelectList.Chip label="Deneb" value="deneb" />
        <RichSelectList.Chip label="Mimosa" value="mimosa" />
        <RichSelectList.Chip label="Regulus" value="regulus" />
        <RichSelectList.Chip label="Adhara" value="adhara" />
        <RichSelectList.Chip label="Shaula" value="shaula" />
        <RichSelectList.Chip label="Castor" value="castor" />
        <RichSelectList.Chip label="Gacrux" value="gacrux" />
      </RichSelectList>
    </Box>
  );
};

export const Default: StoryObj<typeof RichSelectList> = {
  args: {
    children: <Options />,
    helperText: "Helper text",
    label: "Label",
    placeholderText: "Placeholder",
    selectedValue: "opt1",
  },
};

export const Error: StoryObj<typeof RichSelectList> = {
  args: {
    children: <Options />,
    errorText: "Select dropdown error message",
    helperText: "Helper text",
    label: "Label",
    placeholderText: "Placeholder",
  },
};

const RichSelectListInteractive = (): ReactElement => {
  const [selectionValue, setSelectionValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectionValue(e.target.value);
  };
  return (
    <RichSelectList
      label="Label"
      helperText="Helper text"
      selectedValue={selectionValue}
      placeholderText="Placeholder"
      onChange={onChange}
    >
      <Options />
    </RichSelectList>
  );
};

export const Interactive: StoryObj<typeof RichSelectList> = {
  render: () => <RichSelectListInteractive />,
};

export const RadioButtons: StoryObj<typeof RichSelectList> = {
  render: () => (
    <RichSelectList
      multiple={false}
      label="Label"
      selectedValue="opt1"
      placeholderText="Placeholder"
      onChange={() => undefined}
      helperText="When radio buttons are used, `multiple` prop should be false"
    >
      <RichSelectList.RadioButton name="name1" label="Option 1" value="opt1" />
      <RichSelectList.RadioButton name="name1" label="Option 2" value="opt2" />
      <RichSelectList.RadioButton name="name1" label="Option 3" value="opt3" />
    </RichSelectList>
  ),
};
