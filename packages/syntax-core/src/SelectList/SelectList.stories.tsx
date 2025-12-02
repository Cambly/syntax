import { type StoryObj, type Meta } from "@storybook/react";
import SelectList from "./SelectList";
import React, { useState, type ReactElement } from "react";
import SelectOption from "./SelectOption";
import Box from "../Box/Box";
import Typography from "../Typography/Typography";

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

const SelectListWithLabelAsReactElement = (): ReactElement => {
  const [selectionValue, setSelectionValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectionValue(e.target.value);
  };
  return (
    <SelectList
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
      onChange={onChange}
      selectedValue={selectionValue}
      placeholderText="Placeholder"
    >
      <Options />
    </SelectList>
  );
};

const TwoSelectListsNextToEachOther = (): ReactElement => {
  const [selectionValue1, setSelectionValue1] = useState("");
  const [selectionValue2, setSelectionValue2] = useState("");
  const onChange1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectionValue1(e.target.value);
  };
  const onChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectionValue2(e.target.value);
  };
  return (
    <Box
      display="flex"
      gap={4}
      direction="row"
      justifyContent="between"
      alignItems="stretch"
    >
      <SelectList
        label="Label"
        placeholderText="Placeholder"
        onChange={onChange1}
        selectedValue={selectionValue1}
      >
        <Options />
      </SelectList>
      <SelectList
        label="Label"
        placeholderText="Placeholder"
        onChange={onChange2}
        selectedValue={selectionValue2}
      >
        <Options />
      </SelectList>
    </Box>
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

export const WithLabelAsReactElement: StoryObj<typeof SelectList> = {
  render: () => <SelectListWithLabelAsReactElement />,
};

export const WithTwoSelectListsNextToEachOther: StoryObj<typeof SelectList> = {
  render: () => <TwoSelectListsNextToEachOther />,
};
