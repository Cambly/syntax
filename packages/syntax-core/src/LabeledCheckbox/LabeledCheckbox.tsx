import React, { ReactElement, useRef } from "react";
import classNames from "classnames";
import styles from "./LabeledCheckbox.module.css";
import Typography from "../Typography/Typography";

const typographySize = {
  sm: 100,
  md: 200,
} as const;

// const iconWidth = {
//   sm:
//   md:
// }

/**
 * Checkbox is a clickable element that will show if an option has been selected or not
 */
const Checkbox = ({
  checked = false,
  disabled = false,
  size = "md",
  label,
  error = false,
  onChange,
}: {
  /**
   * Whether or not the box has been clicked
   * @defaultValue false
   */
  checked: boolean;
  /**
   * The callback to be called when the checkbox value changes
   */
  onChange: () => void;
  /**
   * Whether or not the box is disabled
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * The size of the checkbox and icon
   * @defaultValue "md"
   */
  size?: "md" | "sm";
  /**
   * The text accompanying the checkbox
   */
  label: string;
  /**
   * Whether or not there is an error with the input
   * @defaultValue false
   */
  error?: boolean;
}): ReactElement => {
  // const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const checkboxStyling = classNames(styles.checkbox, styles[size], {
    [styles.uncheckedBox]: !checked,
    [styles.checkedBox]: checked,
    [styles.uncheckedError]: !checked && error,
    [styles.checkedError]: checked && error,
    // [styles.focusedCheckbox]: isFocused,
  });

  return (
    <div className={styles.mainContainer}>
      <div className={styles.checkboxContainer}>
        <input
          name="checkbox1"
          type="checkbox"
          className={classNames(styles.inputOverlay, styles[size])}
          checked={checked}
          aria-checked={checked}
          tabIndex={0}
          ref={inputRef}
          onChange={() => onChange()}
          onKeyDown={(e) => {
            if (e.key === "Space") {
              onChange();
            }
          }}
          disabled={disabled}
          // onFocus={() => {
          //   setIsFocused(true);
          // }}
          // onBlur={() => {
          //   setIsFocused(false);
          // }}
        />
        <div className={checkboxStyling}>
          {checked && (
            <svg aria-hidden="true" viewBox="0 0 24 24" width="12">
              <path
                fill="#fff"
                d="m9 16.2-3.5-3.5a.9839.9839 0 0 0-1.4 0c-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4a.9839.9839 0 0 0-1.4 0L9 16.2z"
              ></path>
            </svg>
          )}
        </div>
      </div>
      <div className={classNames(styles.label)}>
        <Typography
          size={typographySize[size]}
          color={error ? "destructive-primary" : "gray800"}
        >
          {label}
        </Typography>
      </div>
    </div>
  );
};

export default Checkbox;
