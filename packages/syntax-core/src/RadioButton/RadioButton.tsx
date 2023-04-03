import React, { ReactElement, useState } from "react";
import classnames from "classnames";

import styles from "./RadioButton.module.css";
import Typography from "../Typography/Typography";

/**
 * RadioButton is a radio button with accompanying text
 */
const RadioButton = ({
  label,
  onChange,
  checked = false,
  error = false,
  size = "md",
  disabled = false,
  value = "",
}: {
  /**
   * Always add a label tag for best accessibility practices
   */
  label: string;
  /**
   * The callback to be called when the button is clicked
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Whether or not the box is checked
   *
   * @defaultValue false
   */
  checked?: boolean;
  /**
   * Whether to show error color schema
   *
   * @defaultValue false
   */
  error?: boolean;
  /**
   * Size of the components
   *
   * * `sm`: 16px
   * * `md`: 24px
   *
   * @defaultValue "md"
   */
  size?: "sm" | "md";
  /**
   * Whether or not the box is disabled
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * Value of the selected radio option
   */
  value?: string;
}): ReactElement => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <label
      className={classnames(styles.radioButton, {
        [styles.smBase]: size === "sm",
        [styles.mdBase]: size === "md",
      })}
    >
      <input
        type="radio"
        className={classnames(styles.radioStyleOverride, {
          [styles.smOverride]: size === "sm",
          [styles.mdOverride]: size === "md",
        })}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        value={value ?? label}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
      {checked ? (
        <div
          className={classnames(styles.outer, styles[size], {
            [styles.errorOuterBackgroundColor]: error,
            [styles.outerBackgroundColor]: !error,
            [styles.focusedRadioButton]: isFocused,
          })}
        >
          <div
            className={classnames(styles.circle, {
              [styles.smInner]: size === "sm",
              [styles.mdInner]: size === "md",
            })}
          />
        </div>
      ) : (
        <div
          className={classnames(styles.background, styles[size], {
            [styles.errorBorderColor]: error,
            [styles.borderColor]: !error,
            [styles.focusedRadioButton]: isFocused,
          })}
        />
      )}
      <Typography
        size={size === "md" ? 200 : 100}
        color={error ? "destructive-primary" : "gray800"}
      >
        {label}
      </Typography>
    </label>
  );
};

export default RadioButton;
