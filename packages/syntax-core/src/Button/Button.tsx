import React, { forwardRef } from "react";
import classNames from "classnames";

import backgroundColor from "../colors//backgroundColor";
import foregroundColor from "../colors/foregroundColor";
import foregroundTypographyColor from "../colors/foregroundTypographyColor";
import { type Size } from "../constants";
import Typography from "../Typography/Typography";
import Box from "../Box/Box";

import iconSize from "./constants/iconSize";
import textVariant from "./constants/textVariant";
import loadingIconSize from "./constants/loadingIconSize";
import styles from "./Button.module.css";
import useIsHydrated from "../useIsHydrated";
import { useTheme } from "../ThemeProvider/ThemeProvider";

type ButtonProps = {
  /**
   * Test id for the button
   */
  "data-testid"?: string;
  /**
   * The text to be displayed inside the button
   */
  text: string;
  /**
   * The text to be displayed inside the button when it is in a loading state
   */
  loadingText?: string;
  /**
   * The color of the button
   *
   * @defaultValue "primary"
   */
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "destructive-primary"
    | "destructive-secondary"
    | "destructive-tertiary"
    | "branded"
    | "success"
    | "inverse";
  /**
   * The size of the button
   *
   * * `sm`: 32px
   * * `md`: 40px
   * * `lg`: 48px
   *
   * @defaultValue "md"
   */
  size?: (typeof Size)[number];
  /**
   * The label to be used for accessibility
   */
  accessibilityLabel?: string;
  /**
   * If `true`, the button will be disabled
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * If `true`, the button will be in a loading state
   *
   * @defaultValue false
   */
  loading?: boolean;
  /**
   * If `true`, the button will take up the full width of its container
   *
   * @defaultValue false
   */
  fullWidth?: boolean;
  /**
   * The icon to be displayed at the start of the button. Please use a [Rounded Material Icon](https://material.io/resources/icons/?style=round)
   */
  startIcon?: React.ComponentType<{ className?: string }>;
  /**
   * The icon to be displayed at the end of the button. Please use a [Rounded Material Icon](https://material.io/resources/icons/?style=round)
   */
  endIcon?: React.ComponentType<{ className?: string }>;
  /**
   * The callback to be called when the button is clicked
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * The tooltip to be displayed when the user hovers over the button
   */
  tooltip?: string;
  /**
   * The type you want to set for the primitive <button/>
   */
  type?: "button" | "submit" | "reset";
};

/**
 * [Button](https://cambly-syntax.vercel.app/?path=/docs/components-button--docs) is used to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      "data-testid": dataTestId,
      text,
      loadingText,
      color = "primary",
      size = "md",
      accessibilityLabel,
      disabled = false,
      loading = false,
      fullWidth = false,
      startIcon: StartIcon,
      endIcon: EndIcon,
      onClick,
      tooltip,
      type = "button",
    }: ButtonProps,
    ref,
  ) => {
    const isHydrated = useIsHydrated();
    const { themeName } = useTheme();

    return (
      <button
        data-testid={dataTestId}
        ref={ref}
        aria-label={accessibilityLabel}
        type={type}
        title={tooltip}
        disabled={!isHydrated || disabled || loading}
        onClick={onClick}
        className={classNames(
          styles.button,
          foregroundColor(color),
          backgroundColor(color),
          themeName === "classic" ? styles[size] : styles[`${size}Cambio`],
          {
            [styles.fullWidth]: fullWidth,
            [styles.buttonGap]: size === "lg" || size === "md",
            [styles.secondaryBorder]: color === "secondary",
            [styles.secondaryDestructiveBorder]:
              color === "destructive-secondary",
          },
        )}
      >
        {!loading && StartIcon && (
          <StartIcon className={classNames(styles.icon, iconSize[size])} />
        )}
        {((loading && loadingText) || (!loading && text)) && (
          <Box paddingX={1}>
            <Typography
              size={textVariant[size]}
              color={foregroundTypographyColor(color)}
            >
              <span style={{ fontWeight: 500 }}>
                {loading ? loadingText : text}
              </span>
            </Typography>
          </Box>
        )}
        {!loading && EndIcon && (
          <EndIcon className={classNames(styles.icon, iconSize[size])} />
        )}
        {loading && (
          <svg
            className={classNames(styles.loading, foregroundColor(color))}
            viewBox="22 22 44 44"
            width={loadingIconSize[size]}
            height={loadingIconSize[size]}
          >
            <circle
              className={styles.loadingCircle}
              cx="44"
              cy="44"
              r="20.2"
              fill="none"
              strokeWidth="3.6"
            />
          </svg>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
