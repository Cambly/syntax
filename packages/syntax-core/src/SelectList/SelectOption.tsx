import React, { ReactElement } from "react";

const SelectOption = ({
  value,
  label,
  disabled = false,
}: {
  value: string;
  label: string;
  disabled?: boolean;
}): ReactElement => (
  <option
    data-testid={`select-option-${value}`}
    value={value}
    disabled={disabled}
  >
    {label}
  </option>
);

export default SelectOption;
