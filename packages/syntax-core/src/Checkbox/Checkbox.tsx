import React, { type ReactElement, useState } from "react";
import classNames from "classnames";
import useFocusVisible from "../useFocusVisible";
import styles from "./Checkbox.module.css";
import focusStyles from "../Focus.module.css";
import Typography from "../Typography/Typography";
import useIsHydrated from "../useIsHydrated";
import { useTheme } from "../ThemeProvider/ThemeProvider";
import colorStyles from "../colors/colors.module.css";

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
}): ReactElement => {
  const { themeName } = useTheme();
  const isHydrated = useIsHydrated();
  const disabled = !isHydrated || disabledProp;
  const [isFocused, setIsFocused] = useState(false);
  const { isFocusVisible } = useFocusVisible();

  const checkboxStyling = classNames(styles.checkbox, styles[size], {
    [focusStyles.accessibilityOutlineFocus]: isFocused && isFocusVisible,
  });

  const classicCheckboxStyling = classNames(
    checkboxStyling,
    styles[`${size}BorderRadius`],
  );

  const cambioCheckboxStyling = classNames(
    checkboxStyling,
    styles.cambioCheckbox,
    error
      ? colorStyles.cambioDestructive370BackgroundColor
      : colorStyles.cambioGray370BackgroundColor,
  );

  const uncheckedStyling =
    themeName === "classic"
      ? classNames(classicCheckboxStyling, styles.uncheckedBox, {
          [styles.uncheckedBorder]: !error,
          [styles.uncheckedErrorBorder]: error,
        })
      : cambioCheckboxStyling;
  const checkedStyling =
    themeName === "classic"
      ? classNames(classicCheckboxStyling, styles.checkedBox, {
          [styles.checkedNonError]: !error,
          [styles.checkedError]: error,
        })
      : cambioCheckboxStyling;

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
      <div className={checked ? checkedStyling : uncheckedStyling}>
        {checked && themeName === "classic" && (
          <svg aria-hidden="true" viewBox="0 0 24 24" width={iconWidth[size]}>
            <path
              fill="#fff"
              d="m9 16.2-3.5-3.5a.9839.9839 0 0 0-1.4 0c-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4a.9839.9839 0 0 0-1.4 0L9 16.2z"
            ></path>
          </svg>
        )}
        {checked && themeName === "cambio" && (
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
        color={error ? "destructive-primary" : "gray900"}
      >
        {label}
      </Typography>
    </label>
  );
};

export default Checkbox;
