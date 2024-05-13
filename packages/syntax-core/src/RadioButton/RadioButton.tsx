import React, { type ReactElement, useState } from "react";
import classnames from "classnames";

import styles from "./RadioButton.module.css";
import focusStyles from "../Focus.module.css";
import Typography from "../Typography/Typography";
import useFocusVisible from "../useFocusVisible";
import useIsHydrated from "../useIsHydrated";
import colorStyles from "../colors/colors.module.css";
import Box from "../Box/Box";

/**
 * [RadioButton](https://cambly-syntax.vercel.app/?path=/docs/components-radiobutton--docs) is a radio button with accompanying text
 */
const RadioButton = ({
  checked = false,
  "data-testid": dataTestId,
  dangerouslyForceFocusStyles = false,
  disabled: disabledProp = false,
  error = false,
  id,
  label,
  name,
  onChange,
  size = "md",
  value,
  "aria-describedby": ariaDescribedby,
}: {
  /**
   * Whether or not the radio button is checked
   *
   * @defaultValue false
   */
  checked?: boolean;
  /**
   * Test id for the radio button
   */
  "data-testid"?: string;
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
   * Id for the the radio button
   */
  id?: string;
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
  value: string | number;
  /** forces focus ring styling */
  dangerouslyForceFocusStyles?: boolean;
  /**
   * The aria-describedby attribute for the RadioButton. This aria- prop identifies the element that describes the element on which the attribute is set.
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
      className={classnames(
        styles.radioBaseContainer,
        styles[`cursor${disabled ? "Disabled" : "Enabled"}`],
        {
          [styles.disabled]: disabled,
        },
      )}
    >
      <div
        className={classnames(
          styles.background,
          error
            ? colorStyles.cambioDestructive370BackgroundColor
            : colorStyles.cambioGray370BackgroundColor,
          styles[size],
          {
            [focusStyles.accessibilityOutlineFocus]:
              (isFocused && isFocusVisible) || dangerouslyForceFocusStyles,
          },
        )}
      />
      {checked && (
        <Box
          backgroundColor={error ? "destructive900" : "gray900"}
          width={size === "md" ? 12 : 8}
          height={size === "md" ? 12 : 8}
          position="absolute"
          rounding="full"
          dangerouslySetInlineStyle={{
            __style: {
              left: size === "md" ? 6 : 4,
            },
          }}
        />
      )}
      <input
        aria-describedby={ariaDescribedby}
        data-testid={dataTestId}
        type="radio"
        id={id}
        name={name}
        className={classnames(
          styles.radioStyleOverride,
          styles[`cursor${disabled ? "Disabled" : "Enabled"}`],
          {
            [styles.smOverride]: size === "sm",
            [styles.mdOverride]: size === "md",
          },
        )}
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
      {label && (
        <Typography
          size={size === "md" ? 200 : 100}
          color={error ? "destructive-primary" : "gray900"}
        >
          {label}
        </Typography>
      )}
    </label>
  );
};

export default RadioButton;
