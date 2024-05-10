import React, { type ReactElement } from "react";

const SelectOption = ({
  "data-testid": dataTestId,
  value,
  label,
  disabled = false,
  accessibilityLabel,
}: {
  accessibilityLabel?: string;
  "data-testid"?: string;
  value: string;
  label: string;
  disabled?: boolean;
}): ReactElement => (
  <option
    aria-label={accessibilityLabel}
    data-testid={dataTestId}
    value={value}
    disabled={disabled}
  >
    {label}
  </option>
);

export default SelectOption;
