import { type StoryObj, type Meta } from "@storybook/react";
import RichSelectBox from "./RichSelectBox";
import React, { useState, type ReactElement } from "react";
import Box from "../Box/Box.js";
import { ListBox, ListBoxItem, ListBoxSection } from "./ListBox";
import Chip from "../Chip/Chip";

export default {
  title: "Components/RichSelectBox",
  component: RichSelectBox,
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
} as Meta<typeof RichSelectBox>;

const options = [
  { label: "Option 1", value: "opt1", name: "name1" },
  { label: "Option 2", value: "opt2", name: "name2" },
  { label: "Option 3", value: "opt3", name: "name3" },
];

const renderOptions = () =>
  options.map(({ label, name, value }) => (
    <RichSelectBox.Chip key={value} value={value} label={label} name={name} />
  ));

export const WhatIfItLookedLikeThis = (): ReactElement => {
  const [selectionValue, setSelectionValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectionValue(e.target.value);
  };
  return (
    <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
      <RichSelectBox
        label="Label"
        helperText="Helper text"
        // selectedValues={selectionValue}
        multiple
        // onChange={onChange}
        onChange={(vals) => {
          console.log("onChange", vals);
        }}
      >
        <RichSelectBox.OptGroup label="People">
          <RichSelectBox.Chip label="John" value="john" disabled />
          <RichSelectBox.Chip label="Jane" value="jane" />
          <RichSelectBox.Chip label="Joe" value="joe" selected disabled />
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
        <RichSelectBox.OptGroup label="Colors">
          <RichSelectBox.Chip label="Red" value="red" />
          <RichSelectBox.Chip label="Green" value="green" />
          <RichSelectBox.Chip label="Blue" value="blue" />
          <RichSelectBox.Chip label="Yellow" value="yellow" />
          <RichSelectBox.Chip label="Purple" value="purple" />
          <RichSelectBox.Chip label="Orange" value="orange" />
          <RichSelectBox.Chip label="Black" value="black" />
          <RichSelectBox.Chip label="White" value="white" />
          <RichSelectBox.Chip label="Pink" value="pink" />
        </RichSelectBox.OptGroup>
        <RichSelectBox.OptGroup label="Planets">
          <RichSelectBox.Chip label="Mercury" value="mercury" />
          <RichSelectBox.Chip label="Venus" value="venus" />
          <RichSelectBox.Chip label="Earth" value="earth" />
          <RichSelectBox.Chip label="Mars" value="mars" />
          <RichSelectBox.Chip label="Jupiter" value="jupiter" />
          <RichSelectBox.Chip label="Saturn" value="saturn" />
          <RichSelectBox.Chip label="Uranus" value="uranus" />
          <RichSelectBox.Chip label="Neptune" value="neptune" />
        </RichSelectBox.OptGroup>
        <RichSelectBox.OptGroup label="Stars">
          <RichSelectBox.Chip label="Sun" value="sun" />
          <RichSelectBox.Chip label="Sirius" value="sirius" />
          <RichSelectBox.Chip label="Canopus" value="canopus" />
          <RichSelectBox.Chip label="Alpha Centauri" value="alphaCentauri" />
          <RichSelectBox.Chip label="Arcturus" value="arcturus" />
          <RichSelectBox.Chip label="Vega" value="vega" />
          <RichSelectBox.Chip label="Capella" value="capella" />
          <RichSelectBox.Chip label="Rigel" value="rigel" />
          <RichSelectBox.Chip label="Procyon" value="procyon" />
          <RichSelectBox.Chip label="Achernar" value="achernar" />
          <RichSelectBox.Chip label="Betelgeuse" value="betelgeuse" />
          <RichSelectBox.Chip label="Hadar" value="hadar" />
          <RichSelectBox.Chip label="Altair" value="altair" />
          <RichSelectBox.Chip label="Acrux" value="acrux" />
          <RichSelectBox.Chip label="Aldebaran" value="aldebaran" />
          <RichSelectBox.Chip label="Antares" value="antares" />
          <RichSelectBox.Chip label="Spica" value="spica" />
          <RichSelectBox.Chip label="Pollux" value="pollux" />
          <RichSelectBox.Chip label="Fomalhaut" value="fomalhaut" />
          <RichSelectBox.Chip label="Deneb" value="deneb" />
          <RichSelectBox.Chip label="Mimosa" value="mimosa" />
          <RichSelectBox.Chip label="Regulus" value="regulus" />
          <RichSelectBox.Chip label="Adhara" value="adhara" />
          <RichSelectBox.Chip label="Shaula" value="shaula" />
          <RichSelectBox.Chip label="Castor" value="castor" />
          <RichSelectBox.Chip label="Gacrux" value="gacrux" />
        </RichSelectBox.OptGroup>
      </RichSelectBox>
    </Box>
  );
};

export const VeryLongContent = (): ReactElement => {
  const [selectionValue, setSelectionValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectionValue(ee);
  };
  return (
    <Box
      display="block"
      maxWidth="50%"
      gap={2}
      alignItems="center"
      flexWrap="wrap"
    >
      <RichSelectBox
        label="Label"
        helperText="Helper text"
        // selectedValue={selectionValue}
        onChange={(vals) => {
          console.log("onChange", vals);
        }}
        // onChange={onChange}
      >
        <RichSelectBox.Chip label="John" value="john" disabled />
        <RichSelectBox.Chip label="Jane" value="jane" />
        <RichSelectBox.Chip selected label="Joe" value="joe" />
        <RichSelectBox.Chip label="San Francisco" value="sf" />
        <RichSelectBox.Chip label="New York" value="ny" disabled />
        <RichSelectBox.Chip label="Los Angeles" value="la" />
        <RichSelectBox.Chip label="Morning" value="morning" />
        <RichSelectBox.Chip label="Afternoon" value="afternoon" />
        <RichSelectBox.Chip label="Evening" value="evening" disabled />
        <RichSelectBox.Chip label="Red" value="red" />
        <RichSelectBox.Chip label="Green" value="green" />
        <RichSelectBox.Chip label="Blue" value="blue" />
        <RichSelectBox.Chip label="Yellow" value="yellow" />
        <RichSelectBox.Chip label="Purple" value="purple" />
        <RichSelectBox.Chip label="Orange" value="orange" />
        <RichSelectBox.Chip label="Black" value="black" />
        <RichSelectBox.Chip label="White" value="white" />
        <RichSelectBox.Chip label="Pink" value="pink" />
        <RichSelectBox.Chip label="Mercury" value="mercury" />
        <RichSelectBox.Chip label="Venus" value="venus" />
        <RichSelectBox.Chip label="Earth" value="earth" />
        <RichSelectBox.Chip label="Mars" value="mars" />
        <RichSelectBox.Chip label="Jupiter" value="jupiter" />
        <RichSelectBox.Chip label="Saturn" value="saturn" />
        <RichSelectBox.Chip label="Uranus" value="uranus" />
        <RichSelectBox.Chip label="Neptune" value="neptune" />
        <RichSelectBox.Chip label="Sun" value="sun" />
        <RichSelectBox.Chip label="Sirius" value="sirius" />
        <RichSelectBox.Chip label="Canopus" value="canopus" />
        <RichSelectBox.Chip label="Alpha Centauri" value="alphaCentauri" />
        <RichSelectBox.Chip label="Arcturus" value="arcturus" />
        <RichSelectBox.Chip label="Vega" value="vega" />
        <RichSelectBox.Chip label="Capella" value="capella" />
        <RichSelectBox.Chip label="Rigel" value="rigel" />
        <RichSelectBox.Chip label="Procyon" value="procyon" />
        <RichSelectBox.Chip label="Achernar" value="achernar" />
        <RichSelectBox.Chip label="Betelgeuse" value="betelgeuse" />
        <RichSelectBox.Chip label="Hadar" value="hadar" />
        <RichSelectBox.Chip label="Altair" value="altair" />
        <RichSelectBox.Chip label="Acrux" value="acrux" />
        <RichSelectBox.Chip label="Aldebaran" value="aldebaran" />
        <RichSelectBox.Chip label="Antares" value="antares" />
        <RichSelectBox.Chip label="Spica" value="spica" />
        <RichSelectBox.Chip label="Pollux" value="pollux" />
        <RichSelectBox.Chip label="Fomalhaut" value="fomalhaut" />
        <RichSelectBox.Chip label="Deneb" value="deneb" />
        <RichSelectBox.Chip label="Mimosa" value="mimosa" />
        <RichSelectBox.Chip label="Regulus" value="regulus" />
        <RichSelectBox.Chip label="Adhara" value="adhara" />
        <RichSelectBox.Chip label="Shaula" value="shaula" />
        <RichSelectBox.Chip label="Castor" value="castor" />
        <RichSelectBox.Chip label="Gacrux" value="gacrux" />
      </RichSelectBox>
    </Box>
  );
};

export const Default: StoryObj<typeof RichSelectBox> = {
  args: {
    children: renderOptions(),
    helperText: "Helper text",
    label: "Label",
    defaultSelectedValues: ["opt1"],
  },
};

export const Error: StoryObj<typeof RichSelectBox> = {
  args: {
    children: renderOptions(),
    errorText: "Select dropdown error message",
    helperText: "Helper text",
    label: "Label",
  },
};

const RichSelectBoxInteractive = (): ReactElement => {
  const [selectionValue, setSelectionValue] = useState<string[] | "all">();
  return (
    <RichSelectBox
      label="Label"
      helperText="Helper text"
      multiple
      selectedValues={selectionValue}
      onChange={(vals) => {
        setSelectionValue(vals);
        console.log("onChange", vals);
      }}
    >
      <RichSelectBox.OptGroup label="People">
        <RichSelectBox.Chip label="New York" value="ny" disabled />
        <RichSelectBox.Chip label="Los Angeles" value="la" selected disabled />
        <RichSelectBox.Chip label="Morning" value="morning" />
        <RichSelectBox.Chip label="Afternoon" value="afternoon" selected />
      </RichSelectBox.OptGroup>
      {/* {options.map(({ label, name, value }) => (
        <RichSelectBox.Chip
          key={value}
          value={value}
          label={label}
          name={name}
        />
      ))} */}
    </RichSelectBox>
  );
};

export const Interactive: StoryObj<typeof RichSelectBox> = {
  render: () => <RichSelectBoxInteractive />,
};

export const RadioButtons: StoryObj<typeof RichSelectBox> = {
  render: () => (
    <RichSelectBox
      multiple={false}
      // multiple
      label="Label"
      defaultSelectedValues={["opt1"]}
      onChange={() => undefined}
      helperText="When radio buttons are used, `multiple` prop should be false"
    >
      <RichSelectBox.RadioButton name="name1" label="Option 1" value="opt1" />
      <RichSelectBox.RadioButton name="name1" label="Option 2" value="opt2" />
      <RichSelectBox.RadioButton name="name1" label="Option 3" value="opt3" />
    </RichSelectBox>
  ),
};

export const NoAutoCommitControlled: StoryObj<typeof RichSelectBox> = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState(["la"]);
    return (
      <RichSelectBox
        multiple
        label="Label"
        selectedValues={["opt1"]}
        helperText="When `autoCommit` is false, the user must click the button to commit their changes"
        autoCommit={false}
        onChange={(vals) => {
          console.log("onChange", vals);
        }}
        // defaultSelectedValues={["la", "ny"]}
      >
        <RichSelectBox.OptGroup label="People">
          <RichSelectBox.Chip label="San Francisco" value="sf" />
          <RichSelectBox.Chip label="New York" value="ny" disabled />
          <RichSelectBox.Chip label="Los Angeles" value="la" />
        </RichSelectBox.OptGroup>
      </RichSelectBox>
    );
  },
};
