import { type StoryObj, type Meta } from "@storybook/react";
import RichSelectBox, { type RichSelectBoxProps } from "./RichSelectBox";
import React, { useState, type ReactElement } from "react";
import Box from "../Box/Box.js";
import Typography from "../Typography/Typography";
import Heading from "../Heading/Heading";

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
  const [selectedValues, setSelectedValues] = useState<string[] | "all">();
  return (
    <Box display="flex" direction="column" gap={2}>
      <RichSelectBox
        label="Label"
        helperText="Helper text"
        // selectedValues={selectionValue}
        multiple
        onChange={setSelectedValues}
      >
        <RichSelectBox.Section label="People">
          <RichSelectBox.Chip label="John" value="john" disabled />
          <RichSelectBox.Chip label="Jane" value="jane" />
          <RichSelectBox.Chip label="Joe" value="joe" selected disabled />
        </RichSelectBox.Section>
        <RichSelectBox.Section label="Places">
          <RichSelectBox.Chip label="San Francisco" value="sf" />
          <RichSelectBox.Chip label="New York" value="ny" disabled />
          <RichSelectBox.Chip label="Tulsa" value="tulsa" />
        </RichSelectBox.Section>
        <RichSelectBox.Section label="Times">
          <RichSelectBox.Chip label="Morning" value="morning" />
          <RichSelectBox.Chip label="Afternoon" value="afternoon" />
          <RichSelectBox.Chip label="Evening" value="evening" disabled />
        </RichSelectBox.Section>
        <RichSelectBox.Section label="Colors">
          <RichSelectBox.Chip label="Red" value="red" />
          <RichSelectBox.Chip label="Green" value="green" />
          <RichSelectBox.Chip label="Blue" value="blue" />
          <RichSelectBox.Chip label="Yellow" value="yellow" />
          <RichSelectBox.Chip label="Purple" value="purple" />
          <RichSelectBox.Chip label="Orange" value="orange" />
          <RichSelectBox.Chip label="Black" value="black" />
          <RichSelectBox.Chip label="White" value="white" />
          <RichSelectBox.Chip label="Pink" value="pink" />
        </RichSelectBox.Section>
        <RichSelectBox.Section label="Planets">
          <RichSelectBox.Chip label="Mercury" value="mercury" />
          <RichSelectBox.Chip label="Venus" value="venus" />
          <RichSelectBox.Chip label="Earth" value="earth" />
          <RichSelectBox.Chip label="Mars" value="mars" />
          <RichSelectBox.Chip label="Jupiter" value="jupiter" />
          <RichSelectBox.Chip label="Saturn" value="saturn" />
          <RichSelectBox.Chip label="Uranus" value="uranus" />
          <RichSelectBox.Chip label="Neptune" value="neptune" />
        </RichSelectBox.Section>
        <RichSelectBox.Section label="Stars">
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
        </RichSelectBox.Section>
      </RichSelectBox>
      {!selectedValues && (
        <Typography>{`Selected: Nothing selected yet.`}</Typography>
      )}
      {selectedValues && (
        <Typography>{`Selected: ${JSON.stringify(selectedValues)}`}</Typography>
      )}
    </Box>
  );
};

export const VeryLongContent = (): ReactElement => {
  const [selectedValues, setSelectedValues] = useState<string[] | "all">();
  return (
    <Box display="flex" direction="column" maxWidth="50%" gap={2}>
      <RichSelectBox
        label="Label"
        helperText="Helper text"
        // selectedValue={selectionValue}
        onChange={setSelectedValues}
      >
        <RichSelectBox.Chip label="John" value="john" disabled />
        <RichSelectBox.Chip label="Jane" value="jane" />
        <RichSelectBox.Chip selected label="Joe" value="joe" />
        <RichSelectBox.Chip label="San Francisco" value="sf" />
        <RichSelectBox.Chip label="New York" value="ny" disabled />
        <RichSelectBox.Chip label="Tulsa" value="tulsa" />
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
      {!selectedValues && (
        <Typography>{`Selected: Nothing selected yet.`}</Typography>
      )}
      {selectedValues && (
        <Typography>{`Selected: ${JSON.stringify(selectedValues)}`}</Typography>
      )}
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
  const [selectedValues, setSelectedValues] = useState<string[] | "all">();
  return (
    <Box display="flex" direction="column" gap={2}>
      <RichSelectBox
        label="Label"
        helperText="Helper text"
        multiple
        selectedValues={selectedValues}
        onChange={setSelectedValues}
      >
        <RichSelectBox.Section label="People">
          <RichSelectBox.Chip label="New York" value="ny" disabled />
          <RichSelectBox.Chip label="Tulsa" value="tulsa" selected disabled />
          <RichSelectBox.Chip label="Morning" value="morning" />
          <RichSelectBox.Chip label="Afternoon" value="afternoon" selected />
        </RichSelectBox.Section>
        {/* {options.map(({ label, name, value, disabled, selected, checked }) => (
        <RichSelectBox.Chip
          key={value}
          value={value}
          label={label}
          name={name}
          selected={selected}
          disabled={disabled}
          checked={checked}
        />
      ))} */}
      </RichSelectBox>
      {!selectedValues && (
        <Typography>{`Selected: Nothing selected yet.`}</Typography>
      )}
      {selectedValues && (
        <Typography>{`Selected: ${JSON.stringify(selectedValues)}`}</Typography>
      )}
    </Box>
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

const ControlledRichSelectBox = ({
  selectedValues = [],
  ...props
}: Omit<RichSelectBoxProps, "onChange">) => {
  const [value, setValue] = useState<string[] | "all" | undefined>(
    selectedValues,
  );
  return (
    <Box display="flex" direction="column" gap={2}>
      <RichSelectBox
        {...props}
        data-testid="box"
        selectedValues={value}
        onChange={(v) => setValue(v)}
      />
      {!value && <Typography>{`Selected: Nothing selected yet.`}</Typography>}
      {value && <Typography>{`Selected: ${JSON.stringify(value)}`}</Typography>}
    </Box>
  );
};

export const Controlled: StoryObj<typeof RichSelectBox> = {
  render: () => {
    return (
      <Box display="flex" direction="column" gap={4}>
        <ControlledRichSelectBox
          multiple
          label="Multiple select"
          helperText="When `autoCommit` is false, the user must click the button to commit their changes"
          autoCommit={false}
          selectedValues={["sf"]}
        >
          <RichSelectBox.Section label="People">
            <RichSelectBox.Chip label="San Francisco" value="sf" />
            <RichSelectBox.Chip label="New York" value="ny" disabled />
            <RichSelectBox.Chip label="Tulsa" value="tulsa" />
          </RichSelectBox.Section>
        </ControlledRichSelectBox>

        <ControlledRichSelectBox
          multiple={false}
          label="Single select"
          helperText="When `autoCommit` is false, the user must click the button to commit their changes"
          autoCommit={false}
          selectedValues={["sf"]}
        >
          <RichSelectBox.Section label="People">
            <RichSelectBox.Chip label="San Francisco" value="sf" />
            <RichSelectBox.Chip label="New York" value="ny" disabled />
            <RichSelectBox.Chip label="Tulsa" value="tulsa" />
          </RichSelectBox.Section>
        </ControlledRichSelectBox>

        <ControlledRichSelectBox
          multiple
          label="Multiple select, autoCommit"
          helperText="When `autoCommit` is true, the user's changes are automatically committed"
          autoCommit
          selectedValues={["tulsa"]}
        >
          <RichSelectBox.Section label="People">
            <RichSelectBox.Chip label="San Francisco" value="sf" />
            <RichSelectBox.Chip label="New York" value="ny" disabled />
            <RichSelectBox.Chip label="Tulsa" value="tulsa" />
          </RichSelectBox.Section>
        </ControlledRichSelectBox>

        <ControlledRichSelectBox
          multiple={false}
          label="Single select, autoCommit"
          helperText="When `autoCommit` is true, the user's changes are automatically committed"
          autoCommit
          selectedValues={["tulsa"]}
        >
          <RichSelectBox.Section label="People">
            <RichSelectBox.Chip label="San Francisco" value="sf" />
            <RichSelectBox.Chip label="New York" value="ny" disabled />
            <RichSelectBox.Chip label="Tulsa" value="tulsa" />
          </RichSelectBox.Section>
        </ControlledRichSelectBox>
      </Box>
    );
  },
};

export const ItemAttributeComposition: StoryObj<typeof RichSelectBox> = {
  render: () => (
    <Box display="flex" direction="column" gap={4}>
      <Heading>Multiple</Heading>
      <ControlledRichSelectBox
        label="Label"
        multiple
        autoCommit
        defaultSelectedValues={["memphis"]}
      >
        <RichSelectBox.Section label="Cities">
          <RichSelectBox.Chip label="Memphis" value="memphis" disabled />
          <RichSelectBox.Chip label="San Francisco" value="sf" />
          <RichSelectBox.Chip label="New York" value="ny" disabled />
          <RichSelectBox.Chip label="Tulsa" value="tulsa" />
          <RichSelectBox.Chip label="Chicago" value="chicago" />
        </RichSelectBox.Section>
      </ControlledRichSelectBox>

      <Heading>Single</Heading>
      <ControlledRichSelectBox
        label="Label"
        autoCommit
        defaultSelectedValues={["memphis"]}
      >
        <RichSelectBox.Section label="Cities">
          <RichSelectBox.Chip label="Memphis" value="memphis" disabled />
          <RichSelectBox.Chip label="San Francisco" value="sf" />
          <RichSelectBox.Chip label="New York" value="ny" disabled />
          <RichSelectBox.Chip label="Tulsa" value="tulsa" />
          <RichSelectBox.Chip label="Chicago" value="chicago" />
        </RichSelectBox.Section>
      </ControlledRichSelectBox>
    </Box>
  ),
};
