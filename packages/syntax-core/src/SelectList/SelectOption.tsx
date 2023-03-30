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
  <option value={value} disabled={disabled}>
    {label}
  </option>
);

export default SelectOption;
