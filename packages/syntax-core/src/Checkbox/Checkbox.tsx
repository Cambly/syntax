import React, { type ReactElement, useState } from "react";
import classNames from "classnames";
import useFocusVisible from "../useFocusVisible";
import styles from "./Checkbox.module.css";
import focusStyles from "../Focus.module.css";
import Typography from "../Typography/Typography";
import useIsHydrated from "../useIsHydrated";

const typographySize = {
  sm: 100,
  md: 200,
} as const;

const iconWidth = {
  sm: 12,
  md: 20,
};

/**
 * [Checkbox](https://cambly-syntax.vercel.app/?path=/docs/components-checkbox--docs) is a clickable element that will show if an option has been selected or not.
 */
const Checkbox = ({
  checked = false,
  "data-testid": dataTestId,
  disabled: disabledProp = false,
  size = "md",
  label,
  error = false,
  onChange,
  "aria-describedby": ariaDescribedby,
}: {
  /**
   * Whether or not the box has been clicked
   *
   * @defaultValue false
   */
  checked: boolean;
  /**
   * Test id for the checkbox
   */
  "data-testid"?: string;
  /**
   * The callback to be called when the checkbox value changes
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Whether or not the box is disabled
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * The size of the checkbox and icon
   *
   * * `sm`: 16px
   * * `md`: 24px
   *
   * @defaultValue "md"
   */
  size?: "sm" | "md";
  /**
   * The text accompanying the checkbox
   */
  label: string;
  /**
   * Whether or not there is an error with the input
   *
   * @defaultValue false
   */
  error?: boolean;
  /**
   * The aria-describedby attribute for the checkbox. This aria- prop identifies the element that describes the element on which the attribute is set.
   *
   * @defaultValue undefined
   */
  "aria-describedby"?: string;
}): ReactElement => {
  const isHydrated = useIsHydrated();
  const disabled = !isHydrated || disabledProp;
  const [isFocused, setIsFocused] = useState(false);
  const { isFocusVisible } = useFocusVisible();

  return (
    <label
      className={classNames(
        styles.mainContainer,
        styles[`cursor${disabled ? "Disabled" : "Enabled"}`],
        {
          [styles.disabled]: disabled,
        },
      )}
    >
      <div
        className={classNames(
          styles.checkbox,
          styles[size],
          {
            [focusStyles.accessibilityOutlineFocus]:
              isFocused && isFocusVisible,
          },
          checked && styles.checkboxChecked,
          error && styles.checkboxError,
        )}
      >
        {checked && (
          <svg aria-hidden="true" viewBox="0 0 24 24" width={iconWidth[size]}>
            <path
              className={error ? styles.checkmarkError : styles.checkmark}
              d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4 9.55 18Z"
            ></path>
          </svg>
        )}
      </div>
      <input
        data-testid={dataTestId}
        aria-describedby={ariaDescribedby}
        type="checkbox"
        className={classNames(
          styles.inputOverlay,
          styles[size],
          styles[`cursor${disabled ? "Disabled" : "Enabled"}`],
        )}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
      <Typography
        size={typographySize[size]}
        color={error ? "destructive-darkBackground" : "primary"}
      >
        {label}
      </Typography>
    </label>
  );
};

export default Checkbox;
