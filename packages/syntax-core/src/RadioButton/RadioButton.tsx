import React, { ReactElement } from "react";
import classnames from "classnames";

import styles from "./RadioButton.module.css";
import Typography from "../Typography/Typography";

/**
 * Radio Button (Base) This is a single lonely radio button with accompanying text
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
   * @defaultValue false
   * Whether or not the box has been clicked
   */
  checked?: boolean;
  /**
   * @defaultValue false
   * Whether to show error color schema
   */
  error?: boolean;
  /**
   * @defaultValue "md"
   * Size of the components
   */
  size?: "md" | "sm";
  /**
   * @defaultValue false
   * Whether or not the box is disabled
   */
  disabled?: boolean;
  /**
   * Value of the selected radio option
   */
  value?: string;
}): ReactElement => {
  const checkedStyles = classnames(styles.outer, styles[size], {
    [styles.errorOuterBackgroundColor]: error,
    [styles.outerBackgroundColor]: !error,
  });
  const uncheckedStyles = classnames(styles.background, styles[size], {
    [styles.errorBorderColor]: error,
    [styles.borderColor]: !error,
  });
  const baseRadioButtonSingle = classnames(styles.baseRadioButton, {
    [styles.smBase]: size === "sm",
    [styles.mdBase]: size === "md",
  });

  return (
    <label className={baseRadioButtonSingle}>
      <input
        type="radio"
        className={styles.radioStyleOverride}
        checked={checked}
        aria-checked={checked}
        tabIndex={0}
        onChange={onChange}
        disabled={disabled}
        value={value || label}
      />
      {checked ? (
        <div className={checkedStyles}>
          <div className={size === "md" ? styles.mdInner : styles.smInner} />
        </div>
      ) : (
        <div className={uncheckedStyles} />
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
