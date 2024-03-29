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
import { cambioColor } from "./constants/color";
import { backgroundColor } from "../colors/backgroundColor";
import { cambioForegroundColor } from "../colors/foregroundColor";

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
   * `inverse` and `success` are deprecated
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
    | "success-primary"
    | "success-secondary"
    | "success-tertiary"
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
   * Indicate whether the button renders on a light or dark background. Changes the color of the button (Cambio only)
   *
   * @defaulValue `lightBackground`
   */
  on?: "lightBackground" | "darkBackground";
  /**
   * The callback to be called when the button is clicked
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * The tooltip to be displayed when the user hovers over the button
   */
  tooltip?: string;
  /**
   * The type you want to set for the primitive `<button/>`
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
      on = "lightBackground",
      onClick,
      tooltip,
      type = "button",
    }: ButtonProps,
    ref,
  ) => {
    const isHydrated = useIsHydrated();

    const foregroundColorClass = cambioForegroundColor(cambioColor(color), on);
    const backgroundColorClass = backgroundColor(cambioColor(color), on);
    const disabledPrimary = color === "primary" && disabled;

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
          styles[size],
          {
            [styles.fullWidth]: fullWidth,
            [styles.buttonGap]: size === "lg" || size === "md",
          },
        )}
      >
        {!loading && StartIcon && (
          <StartIcon
            className={classNames(
              styles.icon,
              iconSize[size],
              disabledPrimary && styles.disabledPrimary,
            )}
          />
        )}
        {((loading && loadingText) || (!loading && text)) && (
          <Box paddingX={1}>
            <Typography size={textVariant[size]}>
              <span
                className={classNames(
                  // Temporary - until we have cambio colors on Typography
                  foregroundColorClass,
                  disabledPrimary && styles.disabledPrimary,
                )}
                style={{ fontWeight: 500 }}
              >
                {loading ? loadingText : text}
              </span>
            </Typography>
          </Box>
        )}
        {!loading && EndIcon && (
          <EndIcon
            className={classNames(
              styles.icon,
              iconSize[size],
              disabledPrimary && styles.disabledPrimary,
            )}
          />
        )}
        {loading && (
          <svg
            className={classNames(styles.loading, foregroundColorClass)}
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
