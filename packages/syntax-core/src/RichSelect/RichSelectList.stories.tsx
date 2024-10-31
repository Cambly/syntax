import { type StoryObj, type Meta } from "@storybook/react";
import RichSelectList, { type RichSelectListProps } from "./RichSelectList";
import React, { useState, type ReactElement } from "react";
import Box from "../Box/Box.js";
import Typography from "../Typography/Typography";
import { type Key } from "react-aria";

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
    disabled: {
      control: "boolean",
    },
    onChange: { action: "clicked" },
    color: {
      control: {
        type: "select",
        options: ["white", "clear"],
      },
    },
    zIndex: {
      control: "number",
    },
  },
  tags: ["autodocs"],
} as Meta<typeof RichSelectList>;

const options = [
  { label: "Option 1", value: "opt1", name: "name1" },
  { label: "Option 2", value: "opt2", name: "name2" },
  { label: "Option 3", value: "opt3", name: "name3" },
];

const renderOptions = () =>
  options.map(({ label, name, value }) => (
    <RichSelectList.Chip key={value} value={value} label={label} name={name} />
  ));

export const WhatIfItLookedLikeThis = (): ReactElement => {
  const [value, setValue] = useState<string[] | Set<string> | "all">();
  return (
    <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
      <RichSelectList
        label="Label"
        accessibilityLabel="Label"
        helperText="Helper text"
        multiple
        placeholderText="Placeholder"
        onChange={setValue}
        primaryButtonText="Save"
        primaryButtonAccessibilityLabel="Save"
        secondaryButtonText="Clear"
        secondaryButtonAccessibilityLabel="Clear"
      >
        <RichSelectList.Section label="People">
          <RichSelectList.Chip label="John" value="john" disabled />
          <RichSelectList.Chip label="Jane" value="jane" />
          <RichSelectList.Chip label="Joe" value="joe" disabled />
        </RichSelectList.Section>
        <RichSelectList.Section label="Places">
          <RichSelectList.Chip label="San Francisco" value="sf" />
          <RichSelectList.Chip label="New York" value="ny" disabled />
          <RichSelectList.Chip label="Tulsa" value="tulsa" />
        </RichSelectList.Section>
        <RichSelectList.Section label="Times">
          <RichSelectList.Chip label="Morning" value="morning" />
          <RichSelectList.Chip label="Afternoon" value="afternoon" />
          <RichSelectList.Chip label="Evening" value="evening" disabled />
        </RichSelectList.Section>
        <RichSelectList.Section label="Colors">
          <RichSelectList.Chip label="Red" value="red" />
          <RichSelectList.Chip label="Green" value="green" />
          <RichSelectList.Chip label="Blue" value="blue" />
          <RichSelectList.Chip label="Yellow" value="yellow" />
          <RichSelectList.Chip label="Purple" value="purple" />
          <RichSelectList.Chip label="Orange" value="orange" />
          <RichSelectList.Chip label="Black" value="black" />
          <RichSelectList.Chip label="White" value="white" />
          <RichSelectList.Chip label="Pink" value="pink" />
        </RichSelectList.Section>
        <RichSelectList.Section label="Planets">
          <RichSelectList.Chip label="Mercury" value="mercury" />
          <RichSelectList.Chip label="Venus" value="venus" />
          <RichSelectList.Chip label="Earth" value="earth" />
          <RichSelectList.Chip label="Mars" value="mars" />
          <RichSelectList.Chip label="Jupiter" value="jupiter" />
          <RichSelectList.Chip label="Saturn" value="saturn" />
          <RichSelectList.Chip label="Uranus" value="uranus" />
          <RichSelectList.Chip label="Neptune" value="neptune" />
        </RichSelectList.Section>
        <RichSelectList.Section label="Stars">
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
        </RichSelectList.Section>
      </RichSelectList>
      {!value && <Typography>{`Selected: Nothing selected yet.`}</Typography>}
      {value && <Typography>{`Selected: ${JSON.stringify(value)}`}</Typography>}
    </Box>
  );
};

export const VeryLongContent = (): ReactElement => {
  return (
    <Box
      display="block"
      maxWidth="50%"
      gap={2}
      alignItems="center"
      flexWrap="wrap"
    >
      <RichSelectList
        label="Label"
        accessibilityLabel="Label"
        helperText="Helper text"
        placeholderText="Placeholder"
        onChange={() => undefined}
        primaryButtonText="Save"
        primaryButtonAccessibilityLabel="Save"
        secondaryButtonText="Clear"
        secondaryButtonAccessibilityLabel="Clear"
      >
        <RichSelectList.Chip label="John" value="john" disabled />
        <RichSelectList.Chip label="Jane" value="jane" />
        <RichSelectList.Chip label="Joe" value="joe" />
        <RichSelectList.Chip label="San Francisco" value="sf" />
        <RichSelectList.Chip label="New York" value="ny" disabled />
        <RichSelectList.Chip label="Tulsa" value="tulsa" />
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
    children: renderOptions(),
    helperText: "Helper text",
    placeholderText: "Placeholder",
    selectedValues: ["opt1"],
  },
};

export const Error: StoryObj<typeof RichSelectList> = {
  args: {
    children: renderOptions(),
    errorText: "Select dropdown error message",
    helperText: "Helper text",
    label: "Label",
    placeholderText: "Placeholder",
  },
};

const RichSelectListInteractive = ({
  color = "white",
}: {
  color?: React.ComponentProps<typeof RichSelectList>["color"];
}): ReactElement => {
  const [selectionValue, setSelectionValue] = useState<string[] | "all">();
  return (
    <RichSelectList
      label="Label"
      accessibilityLabel="Label"
      helperText="Helper text"
      multiple
      selectedValues={selectionValue}
      placeholderText="Placeholder"
      onChange={setSelectionValue}
      primaryButtonText="Save"
      primaryButtonAccessibilityLabel="Save"
      secondaryButtonText="Clear"
      secondaryButtonAccessibilityLabel="Clear"
      color={color}
    >
      <RichSelectList.Section label="People">
        <RichSelectList.Chip label="New York" value="ny" disabled />
        <RichSelectList.Chip label="Los Angeles" value="la" disabled />
        <RichSelectList.Chip label="Morning" value="morning" />
        <RichSelectList.Chip label="Afternoon" value="afternoon" />
      </RichSelectList.Section>
    </RichSelectList>
  );
};

export const Interactive: StoryObj<typeof RichSelectList> = {
  render: () => <RichSelectListInteractive />,
};

export const InteractiveDark: StoryObj<typeof RichSelectList> = {
  render: () => (
    <Box backgroundColor="black" padding={4}>
      <RichSelectListInteractive color="clear" />
    </Box>
  ),
};

export const RadioButtons: StoryObj<typeof RichSelectList> = {
  render: () => (
    <RichSelectList
      multiple={false}
      label="Label"
      accessibilityLabel="Label"
      selectedValues={["opt1"]}
      placeholderText="Placeholder"
      onChange={() => undefined}
      helperText="When radio buttons are used, `multiple` prop should be false"
      primaryButtonText="Save"
      primaryButtonAccessibilityLabel="Save"
      secondaryButtonText="Clear"
      secondaryButtonAccessibilityLabel="Clear"
    >
      <RichSelectList.RadioButton name="name1" label="Option 1" value="opt1" />
      <RichSelectList.RadioButton name="name1" label="Option 2" value="opt2" />
      <RichSelectList.RadioButton name="name1" label="Option 3" value="opt3" />
    </RichSelectList>
  ),
};

export const NoAutosaveControlled: StoryObj<typeof RichSelectList> = {
  render: () => {
    return (
      <RichSelectList
        multiple
        label="Label"
        accessibilityLabel="Label"
        selectedValues={["sf"]}
        placeholderText="Placeholder"
        helperText="When `autosave` is false, the user must click the button to save their changes"
        autosave={false}
        onChange={() => undefined}
        primaryButtonText="Save"
        primaryButtonAccessibilityLabel="Save"
        secondaryButtonText="Clear"
        secondaryButtonAccessibilityLabel="Clear"
      >
        <RichSelectList.Section label="People">
          <RichSelectList.Chip label="San Francisco" value="sf" />
          <RichSelectList.Chip label="New York" value="ny" disabled />
          <RichSelectList.Chip label="Tulsa" value="tulsa" />
        </RichSelectList.Section>
      </RichSelectList>
    );
  },
};

const ControlledRichSelectList = ({
  selectedValues = [],
  ...props
}: Omit<
  RichSelectListProps,
  | "onChange"
  | "primaryButtonText"
  | "primaryButtonAccessibilityLabel"
  | "secondaryButtonText"
  | "secondaryButtonAccessibilityLabel"
>) => {
  const [value, setValue] = useState<Set<Key> | string[] | "all" | undefined>(
    selectedValues,
  );
  return (
    <Box display="flex" direction="column" gap={2}>
      <RichSelectList
        {...props}
        selectedValues={value}
        onChange={(v) => setValue(v)}
        primaryButtonText="Save"
        primaryButtonAccessibilityLabel="Save"
        secondaryButtonText="Clear"
        secondaryButtonAccessibilityLabel="Clear"
      />
      {!value && <Typography>{`Selected: Nothing selected yet.`}</Typography>}
      {value && <Typography>{`Selected: ${JSON.stringify(value)}`}</Typography>}
    </Box>
  );
};

export const NoAutosaveControlledMultipleSelect: StoryObj<
  typeof RichSelectList
> = {
  render: () => {
    return (
      <Box display="flex" direction="column" gap={2}>
        <ControlledRichSelectList
          multiple
          label="Multiple select"
          accessibilityLabel="Label"
          helperText="When `autosave` is false, the user must click the button to save their changes"
          autosave={false}
        >
          <RichSelectList.Section label="Cities">
            <RichSelectList.Chip label="San Francisco" value="sf" />
            <RichSelectList.Chip label="New York" value="ny" disabled />
            <RichSelectList.Chip label="Tulsa" value="tulsa" />
          </RichSelectList.Section>
        </ControlledRichSelectList>

        <ControlledRichSelectList
          accessibilityLabel="Label"
          multiple={false}
          label="Single select"
          helperText="When `autosave` is false, the user must click the button to save their changes"
          autosave={false}
        >
          <RichSelectList.Section label="Cities">
            <RichSelectList.Chip label="San Francisco" value="sf" />
            <RichSelectList.Chip label="New York" value="ny" disabled />
            <RichSelectList.Chip label="Tulsa" value="tulsa" />
          </RichSelectList.Section>
        </ControlledRichSelectList>
      </Box>
    );
  },
};

export const Autosave: StoryObj<typeof RichSelectList> = {
  render: () => (
    <RichSelectList
      label="Label"
      accessibilityLabel="Label"
      helperText="When `autosave` is true, the user's changes are automatically saveted"
      autosave
      onChange={() => undefined}
      primaryButtonText="Save"
      primaryButtonAccessibilityLabel="Save"
      secondaryButtonText="Clear"
      secondaryButtonAccessibilityLabel="Clear"
    >
      <RichSelectList.Section label="Cities">
        <RichSelectList.Chip label="San Francisco" value="sf" />
        <RichSelectList.Chip label="New York" value="ny" disabled />
        <RichSelectList.Chip label="Tulsa" value="tulsa" />
      </RichSelectList.Section>
    </RichSelectList>
  ),
};

export const ItemAttributeComposition: StoryObj<typeof RichSelectList> = {
  render: () => (
    <RichSelectList
      label="Label"
      accessibilityLabel="Label"
      multiple
      autosave
      onChange={() => undefined}
      primaryButtonText="Save"
      primaryButtonAccessibilityLabel="Save"
      secondaryButtonText="Clear"
      secondaryButtonAccessibilityLabel="Clear"
    >
      <RichSelectList.Section label="Cities">
        <RichSelectList.Chip label="San Francisco" value="sf" />
        <RichSelectList.Chip label="New York" value="ny" disabled />
        <RichSelectList.Chip label="Tulsa" value="tulsa" disabled />
        <RichSelectList.Chip label="Chicago" value="chicago" />
      </RichSelectList.Section>
    </RichSelectList>
  ),
};
