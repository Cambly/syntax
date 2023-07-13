import React, { type ReactElement } from "react";
import Checkbox from "../Checkbox/Checkbox";
import Box from "../Box/Box";

type OptionProps = {
  value: string;
  label: string;
};

export type checkedOptionProps = Record<string, boolean>;

/**
 * [CheckboxGroup](https://cambly-syntax.vercel.app/?path=/docs/components-typography--docs) is a component that renders a list of checkboxes.
 */
const CheckboxGroup = ({
  options,
  onFormChange,
  selections,
  size = "md",
}: {
  /**
   * The list of labels and values for each checkbox
   */
  options: OptionProps[];
  /**
   * The callback to be called when a checkbox value changes
   */
  onFormChange: (optionIds: checkedOptionProps) => void;
  /**
   * The list of values that are selected
   */
  selections: Record<string, boolean>;
  /**
   * The size of the checkboxes and icons
   *
   * * `sm`: 16px
   * * `md`: 24px
   *
   * @defaultValue "md"
   */
  size?: "sm" | "md";
}): ReactElement => {
  const onChange = (
    { target: { checked } }: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const updatedSelections = { ...selections, [id]: checked };
    onFormChange(updatedSelections);
  };

  return (
    <Box display="flex" direction="column" gap={3}>
      {options.map(({ value, label: optionLabel }) => (
        <Checkbox
          key={value}
          onChange={(e) => onChange(e, value)}
          checked={!!selections[value]}
          label={optionLabel}
          size={size}
        />
      ))}
    </Box>
  );
};

export default CheckboxGroup;
