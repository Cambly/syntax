import React, { ReactElement, useId } from "react";
import classnames from "classnames";

import styles from "./RadioButton.module.css";
import Typography from "../Typography/Typography";

const typographySize = {
  sm: 100,
  md: 200,
};

/**
 * Radio Button (Base) This is a single lonely radio button with accompanying text
 */
const RadioButton = ({
  checked = false,
  disabled = false,
  label,
  size = "md",
  error = false,
  onChange,
}: {
  /**
   * @defaultValue false
   * Whether or not the box has been clicked
   */
  checked: boolean;
  /**
   * @defaultValue false
   * Whether to show error color schema
   */
  error?: boolean;
  /**
   * @defaultValue "md"
   * Size of the components
   */
  size?: string;
  /**
   * The callback to be called when the button is clicked
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Always add a label tag for best accessibility practices
   */
  label: string;
  /**
   * @defaultValue false
   * Whether or not the box is disabled
   */
  disabled?: boolean;
}): ReactElement => {
  const checkedStyles = classnames(styles.outer, styles[size], {
    [styles.errorOuter]: error,
  });
  const uncheckedStyles = classnames(styles.background, styles[size], {
    [styles.errorBackground]: error,
  });

  const id = useId();
  return (
    <label className={styles.baseRadioButtonSingle}>
      <input
        id={id}
        type="radio"
        className={`${styles.radioStyleOverride}`}
        checked={checked}
        aria-checked={checked}
        tabIndex={0}
        onChange={onChange}
        disabled={disabled}
      />
      {checked ? (
        <div className={checkedStyles}>
          <div className={size === "md" ? styles.mdInner : styles.smInner} />
        </div>
      ) : (
        <div className={uncheckedStyles} />
      )}
      <Typography
        size={typographySize[size]}
        color={error ? "destructive-primary" : "gray800"}
      >
        {label}
      </Typography>
    </label>
  );
};

export default RadioButton;
