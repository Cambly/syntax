import React, { ReactElement, ReactNode, useId } from "react";
import styles from "./SelectList.module.css";
import classNames from "classnames";
import Typography from "../Typography/Typography";

const iconSize = {
  sm: 20,
  md: 24,
  lg: 24,
} as const;

const SelectList = ({
  children,
  disabled = false,
  error = false,
  helperText,
  label,
  onChange,
  placeholderText,
  selectedValue = "",
  size = "md",
}: {
  /**
   * One or more SelectList.Option components.
   */
  children: ReactNode;
  /**
   * true if the select dropdown is disabled
   */
  disabled?: boolean;
  /**
   * true if there is an error with the selection
   */
  error?: boolean;
  /**
   * Text shown below select box
   */
  helperText?: string;
  /**
   * Text shown above select box
   */
  label?: string;
  /**
   * The callback to be called when an option is selected
   */
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  /**
   * Text showing in select box if no option has been chosen
   *
   */
  placeholderText: string;
  /**
   * Value of the currently selected option
   */
  selectedValue: string;
  /**
   * Size of the select box
   * * `sm`: 32px
   * * `md`: 40px
   * * `lg`: 48px
   *
   * @defaultValue "md"
   */
  size?: "sm" | "md" | "lg";
}): ReactElement => {
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
          className={classNames(styles.selectBox, styles[size], {
            [styles.gray700Font]: !selectedValue,
            [styles.selectError]: error,
          })}
          onChange={onChange}
        >
          {selectedValue === "" && (
            <option disabled aria-selected value="" selected>
              <Typography>{placeholderText}</Typography>
            </option>
          )}
          {children}
        </select>
        <div className={styles.arrowIcon}>
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
