import React, { forwardRef } from "react";
import classNames from "classnames";
import { type Size } from "../constants";
import Typography from "../Typography/Typography";
import Box from "../Box/Box";
import iconSize from "./constants/iconSize";
import textVariant from "./constants/textVariant";
import loadingIconSize from "./constants/loadingIconSize";
import styles from "./Button.module.css";
import useIsHydrated from "../useIsHydrated";
import { useTheme } from "../ThemeProvider/ThemeProvider";
import { classicColor, cambioColor } from "./constants/color";
import {
  classicBackgroundColor,
  cambioBackgroundColor,
} from "../colors/backgroundColor";
import {
  classicForegroundColor,
  cambioForegroundColor,
} from "../colors/foregroundColor";
import classicSize from "./constants/classicSize";

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
   * Classic only:
   * * `success-primary`
   * * `success-secondary`
   * * `inverse`
   *
   * Cambio only:
   * * `quaternary`
   * * `destructive-tertiary`
   * * `success-primary`
   * * `success-secondary`
   *
   * @defaultValue "primary"
   */
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "quaternary"
    | "destructive-primary"
    | "destructive-secondary"
    | "destructive-tertiary"
    | "branded"
    | "success"
    | "success-primary"
    | "success-secondary"
    | "inverse";
  /**
   * The size of the button
   *
   * Classic:
   * * `sm`: 32px
   * * `md`: 40px
   * * `lg`: 48px
   *
   * Cambio:
   * * `sm`: 32px
   * * `md`: 48px
   * * `lg`: 64px
   * * `xl`: 80px
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
   * Note: startIcon is not supported in the Cambio theme
   */
  startIcon?: React.ComponentType<{ className?: string }>;
  /**
   * The icon to be displayed at the end of the button. Please use a [Rounded Material Icon](https://material.io/resources/icons/?style=round)
   * Note: endIcon is not supported in the Cambio theme
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

    const foregroundColorClass =
      themeName === "classic"
        ? classicForegroundColor(classicColor(color))
        : cambioForegroundColor(cambioColor(color));

    const backgroundColorClass =
      themeName === "classic"
        ? classicBackgroundColor(classicColor(color))
        : cambioBackgroundColor(cambioColor(color));

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
          foregroundColorClass,
          backgroundColorClass,
          themeName === "classic"
            ? styles[classicSize(size)]
            : styles[`${size}Cambio`],
          {
            [styles.fullWidth]: fullWidth,
            [styles.buttonGap]:
              themeName === "classic" && (size === "lg" || size === "md"),
            [styles.secondaryBorder]:
              themeName === "classic" && color === "secondary",
            [styles.secondaryDestructiveBorder]:
              themeName === "classic" && color === "destructive-secondary",
            [styles.cambioSecondaryBorder]:
              themeName === "cambio" && color === "secondary",
            [styles.cambioSecondaryDestructiveBorder]:
              themeName === "cambio" &&
              (color === "destructive-secondary" ||
                color === "destructive-tertiary"),
            [styles.cambioSecondarySuccessBorder]:
              themeName === "cambio" && color === "success-secondary",
          },
        )}
      >
        {!loading && StartIcon && themeName === "classic" && (
          <StartIcon
            className={classNames(styles.icon, iconSize[classicSize(size)])}
          />
        )}
        {((loading && loadingText) || (!loading && text)) && (
          <Box paddingX={1}>
            <Typography
              size={
                themeName === "classic"
                  ? textVariant[classicSize(size)]
                  : textVariant[size]
              }
            >
              <span
                // Temporary - until we have cambio colors on Typogrphay
                className={foregroundColorClass}
                style={{ fontWeight: 500 }}
              >
                {loading ? loadingText : text}
              </span>
            </Typography>
          </Box>
        )}
        {!loading && EndIcon && themeName === "classic" && (
          <EndIcon
            className={classNames(styles.icon, iconSize[classicSize(size)])}
          />
        )}
        {loading && (
          <svg
            className={classNames(styles.loading, foregroundColorClass)}
            viewBox="22 22 44 44"
            width={loadingIconSize[classicSize(size)]}
            height={loadingIconSize[classicSize(size)]}
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
