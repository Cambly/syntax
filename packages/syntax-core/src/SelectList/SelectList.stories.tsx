import { type StoryObj, type Meta } from "@storybook/react";
import SelectList from "./SelectList";
import React, { useState, type ReactElement } from "react";
import SelectOption from "./SelectOption";
import Box from "../Box/Box";

export default {
  title: "Components/SelectList",
  component: SelectList,
  parameters: {
    design: {
      name: "Figma",
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1007-4102&t=7xGt6S9b6zUUiflR-0",
    },
  },
  args: {
    "data-testid": "",
    label: "Label",
    on: "lightBackground",
    placeholderText: "Placeholder",
    errorText: "",
    helperText: "Helper text",
    disabled: false,
    id: "",
    selectedValue: "",
    color: "white",
  },
  argTypes: {
    disabled: {
      control: "boolean",
    },
    on: {
      options: ["lightBackground", "darkBackground"],
      control: { type: "radio" },
    },
    onChange: { action: "clicked" },
    color: {
      control: {
        type: "select",
        options: ["white", "clear"],
      },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof SelectList>;

const options = [
  { label: "Option 1", value: "opt1" },
  { label: "Option 2", value: "opt2" },
  { label: "Option 3", value: "opt3" },
];

const Options = () => (
  <>
    {options.map(({ label, value }) => (
      <SelectOption key={value} value={value} label={label} />
    ))}
  </>
);

function SelectListDefault({
  label = "Label",
  placeholderText = "Placeholder",
  selectedValue: initialValue = "",
  ...rest
}) {
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
      <SelectList
        label={label}
        placeholderText={placeholderText}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        selectedValue={initialValue || value}
        {...rest}
      >
        <Options />
      </SelectList>
    </Box>
  );
}

export const Default: StoryObj<typeof SelectList> = {
  render: (args) => <SelectListDefault {...args} />,
};

export const Error: StoryObj<typeof SelectList> = {
  args: {
    children: <Options />,
    errorText: "Select dropdown error message",
    helperText: "Helper text",
    label: "Label",
    placeholderText: "Placeholder",
  },
  render: (args) => <SelectListDefault {...args} />,
};

const SelectListInteractive = ({
  placeholderText = "",
}: {
  placeholderText?: string;
}): ReactElement => {
  const [selectionValue, setSelectionValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectionValue(e.target.value);
  };
  return (
    <SelectList
      label="Label"
      helperText="Helper text"
      selectedValue={selectionValue}
      placeholderText={placeholderText}
      onChange={onChange}
    >
      <Options />
    </SelectList>
  );
};

const SelectListInteractiveDark = ({
  placeholderText = "",
}: {
  placeholderText?: string;
}): ReactElement => {
  const [selectionValue, setSelectionValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectionValue(e.target.value);
  };
  return (
    <Box backgroundColor="black" padding={4}>
      <SelectList
        label="Label"
        helperText="Helper text"
        selectedValue={selectionValue}
        placeholderText={placeholderText}
        onChange={onChange}
        on="darkBackground"
      >
        <Options />
      </SelectList>
    </Box>
  );
};

const SelectListWithRtlDirection = (): ReactElement => {
  const [selectionValue, setSelectionValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectionValue(e.target.value);
  };
  return (
    <div dir="rtl" style={{ padding: 4 }}>
      <SelectList
        label="Label"
        helperText="Helper text"
        selectedValue={selectionValue}
        placeholderText="Placeholder"
        onChange={onChange}
      >
        <Options />
      </SelectList>
    </div>
  );
};

export const Interactive: StoryObj<typeof SelectList> = {
  render: () => <SelectListInteractive />,
};

export const InteractiveDark: StoryObj<typeof SelectList> = {
  render: () => <SelectListInteractiveDark />,
};

export const InteractiveWithPlaceholder: StoryObj<typeof SelectList> = {
  render: () => <SelectListInteractive placeholderText="Placeholder" />,
};

export const WithRtlDirection: StoryObj<typeof SelectList> = {
  render: () => <SelectListWithRtlDirection />,
};
