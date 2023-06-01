import React, { type ReactElement } from "react";

const SelectOption = ({
  "data-testid": dataTestId,
  value,
  label,
  disabled = false,
}: {
  "data-testid"?: string;
  value: string;
  label: string;
  disabled?: boolean;
}): ReactElement => (
  <option data-testid={dataTestId} value={value} disabled={disabled}>
    {label}
  </option>
);

export default SelectOption;
