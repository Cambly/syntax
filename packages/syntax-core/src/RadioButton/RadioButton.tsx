import React, { ReactElement, useState } from "react";
import classnames from "classnames";

import styles from "./RadioButton.module.css";
import focusStyles from "../Focus.module.css";
import Typography from "../Typography/Typography";
import useFocusVisible from "../useFocusVisible";

/**
 * RadioButton is a radio button with accompanying text
 */
const RadioButton = ({
  checked = false,
  disabled = false,
  error = false,
  label,
  name,
  onChange,
  size = "md",
  value,
}: {
  /**
   * Whether or not the radio button is checked
   *
   * @defaultValue false
   */
  checked?: boolean;
  /**
   * Whether or not the radio button is disabled
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * Whether to show error color schema
   *
   * @defaultValue false
   */
  error?: boolean;
  /**
   * Value to show end user
   */
  label: string;
  /**
   * The name of the grouping the radio buttons are in
   */
  name: string;
  /**
   * The callback to be called when the radio button is clicked
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
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
   * Value of the selected radio option
   */
  value: string;
}): ReactElement => {
  const [isFocused, setIsFocused] = useState(false);
  const { isFocusVisible } = useFocusVisible();

  const sharedStyles = classnames(styles.background, styles[size], {
    [styles.errorBorderColor]: error,
    [styles.borderColor]: !error,
    [focusStyles.accessibilityOutlineFocus]: isFocused && isFocusVisible,
  });

  return (
    <label
      className={classnames(styles.radioBaseContainer, {
        [styles.smBase]: size === "sm",
        [styles.mdBase]: size === "md",
      })}
    >
      <input
        type="radio"
        name={name}
        className={classnames(styles.radioStyleOverride, {
          [styles.smOverride]: size === "sm",
          [styles.mdOverride]: size === "md",
        })}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        value={value}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
      {checked ? (
        <div
          className={classnames(sharedStyles, {
            [styles.mdCheckedBorder]: size === "md",
            [styles.smCheckedBorder]: size === "sm",
          })}
        />
      ) : (
        <div className={classnames(sharedStyles, styles.neutralBorder)} />
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
