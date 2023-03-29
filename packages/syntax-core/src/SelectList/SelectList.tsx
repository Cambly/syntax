import React, { ReactElement, useId, useState } from "react";
import styles from "./SelectList.module.css";
import classNames from "classnames";
import Typography from "../Typography/Typography";

export interface OptionData {
  label: string;
  value: string;
}

const selectBoxSize = {
  sm: styles.smBox,
  md: styles.mdBox,
  lg: styles.lgBox,
} as const;

const fontSize = {
  sm: 100,
  md: 200,
  lg: 300,
} as const;

const iconSize = {
  sm: 20,
  md: 24,
  lg: 24,
} as const;

const fontColor = (error: boolean, selected: string) => {
  if (error) {
    return "destructive-primary";
  } else if (selected) {
    return "gray800";
  }
  return "gray700";
};

const SelectList = ({
  placeholderText,
  options,
  size = "md",
  label,
  helperText,
  selectedValue = "",
  onChange,
  error = false,
  disabled = false,
}: {
  /**
   * Text showing in select box if no option has been chosen
   *
   */
  placeholderText: string;
  /**
   * Array of objects {label: string, value: string}
   *
   */
  options: OptionData[];
  /**
   * Size of the select box
   * * `sm`: 32px
   * * `md`: 40px
   * * `lg`: 48px
   *
   * @defaultValue "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Text shown above select box
   */
  label?: string;
  /**
   * Text shown below select box
   */
  helperText?: string;
  /**
   * Value of the currently selected option
   */
  selectedValue: string;
  /**
   * The callback to be called when an option is selected
   */
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  /**
   * true if there is an error with the selection
   */
  error?: boolean;
  /**
   * true if the select dropdown is disabled
   */
  disabled?: boolean;
}): ReactElement => {
  const [isFocused, setIsFocused] = useState(false);
  const divSelectBox = classNames(styles.divSelect, selectBoxSize[size], {
    [styles.selectError]: error,
    [styles.focusedDivSelect]: isFocused,
  });
  const valueToLabel: Record<string, string> = options.reduce(
    (result, curr) => ({ ...result, [curr.value]: curr.label }),
    {},
  );
  const id = useId();
  return (
    <div
      className={classNames(styles.selectContainer, {
        [styles.opacityOverlay]: disabled,
      })}
    >
      <label htmlFor={id} className={styles.outerTextContainer}>
        <Typography
          size={100}
          color={error ? "destructive-primary" : "gray700"}
        >
          {label}
        </Typography>
      </label>
      <div className={styles.selectWrapper}>
        <select
          id={id}
          disabled={disabled}
          required
          className={classNames(styles.selectBox, selectBoxSize[size])}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          <option disabled aria-selected={selectedValue === ""} value="">
            {placeholderText}
          </option>
          {options.map((o) => (
            <option
              key={o.value}
              value={o.value}
              aria-selected={selectedValue === o.value}
            >
              {o.label}
            </option>
          ))}
        </select>
        <div className={divSelectBox}>
          <Typography
            size={fontSize[size]}
            color={fontColor(error, selectedValue)}
          >
            {valueToLabel[selectedValue] || placeholderText}
          </Typography>
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            width={iconSize[size]}
          >
            <path
              fill={error ? "#d32a4b" : "#353535"}
              d="M15.88 9.29 12 13.17 8.12 9.29a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"
            ></path>
          </svg>
        </div>
      </div>
      <div className={styles.outerTextContainer}>
        <Typography
          size={100}
          color={error ? "destructive-primary" : "gray700"}
        >
          {helperText}
        </Typography>
      </div>
    </div>
  );
};

export default SelectList;
