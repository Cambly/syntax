import classNames from "classnames";
import backgroundColor from "../colors//backgroundColor";
import foregroundColor from "../colors/foregroundColor";
import React, { forwardRef } from "react";
import { Color, Size } from "../constants";
import styles from "./Button.module.css";

const textVariant = {
  // Replace with `Typography` once it lands in `syntax-core`
  ["sm"]: styles.buttonTextSmall,
  ["md"]: styles.buttonTextMedium,
  ["lg"]: styles.buttonTextLarge,
} as const;

const loadingIconSize = {
  ["sm"]: 16,
  ["md"]: 20,
  ["lg"]: 24,
};

const iconSize = {
  ["sm"]: styles.smIcon,
  ["md"]: styles.mdIcon,
  ["lg"]: styles.lgIcon,
};

type ButtonType = {
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
  color?: (typeof Color)[number];
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
  startIcon?: React.ComponentType<{ className: string }>;
  /**
   * The icon to be displayed at the end of the button. Please use a [Rounded Material Icon](https://material.io/resources/icons/?style=round)
   */
  endIcon?: React.ComponentType<{ className: string }>;
  /**
   * The callback to be called when the button is clicked
   */
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * The tooltip to be displayed when the user hovers over the button
   */
  tooltip?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonType>(
  (
    {
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
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        aria-label={accessibilityLabel}
        type="button"
        title={tooltip}
        disabled={disabled || loading}
        onClick={onClick}
        className={classNames(
          styles.button,
          foregroundColor(color),
          backgroundColor(color),
          styles[size],
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
          <div className={styles.textContainer}>
            {/* Replace with `Typography` once it lands in `syntax-core` */}
            <div className={classNames(styles.buttonText, textVariant[size])}>
              {loading ? loadingText : text}
            </div>
          </div>
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

export default Button;
