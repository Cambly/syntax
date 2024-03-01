import classNames from "classnames";
import {
  classicForegroundColor,
  cambioForegroundColor,
} from "../colors/foregroundColor";
import React, { forwardRef } from "react";
import { type Size } from "../constants";
import styles from "./IconButton.module.css";
import useIsHydrated from "../useIsHydrated";
import { useTheme } from "../ThemeProvider/ThemeProvider";
import { classicColor, cambioColor } from "../Button/constants/color";
import buttonStyles from "../Button/Button.module.css";
import {
  classicBackgroundColor,
  cambioBackgroundColor,
} from "../colors/backgroundColor";

const classicIconSize = {
  sm: styles.smIcon,
  md: styles.mdIcon,
  lg: styles.lgIcon,
};

const cambioIconSize = {
  sm: styles.smIconCambio,
  md: styles.mdIconCambio,
  lg: styles.lgIconCambio,
  xl: styles.xlIconCambio,
};

type IconButtonProps = {
  /**
   * The color of the button
   *
   * Classic only:
   * * `inverse`
   * * `success`
   *
   * Cambio only:
   * * `success-primary`
   * * `success-secondary`
   * * `success-tertiary`
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
    | "inverse";
  /**
   * Test id for the button
   */
  "data-testid"?: string;
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
  accessibilityLabel: string;
  /**
   * The icon to be displayed. Please use a [Rounded Material Icon](https://material.io/resources/icons/?style=round)
   */
  icon: React.ComponentType<{ className?: string }>;
  /**
   * If `true`, the button will be disabled
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * The callback to be called when the button is clicked
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * The tooltip to be displayed when the user hovers over the button
   */
  tooltip?: string;
};

/**
 * [IconButton](https://cambly-syntax.vercel.app/?path=/docs/components-iconbutton--docs) is a clickable element that is used to perform an action.
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      accessibilityLabel,
      color = "primary",
      "data-testid": dataTestId,
      disabled = false,
      icon: Icon,
      size = "md",
      tooltip,
      onClick,
    }: IconButtonProps,
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
        aria-label={accessibilityLabel}
        data-testid={dataTestId}
        type="button"
        title={tooltip}
        disabled={!isHydrated || disabled}
        onClick={onClick}
        className={classNames(
          styles.iconButton,
          foregroundColorClass,
          backgroundColorClass,
          themeName === "classic" ? styles[size] : styles[`${size}Cambio`],
          {
            [buttonStyles.secondaryBorder]:
              themeName === "classic" && color === "secondary",
            [buttonStyles.secondaryDestructiveBorder]:
              themeName === "classic" && color === "destructive-secondary",
            [styles.iconButtonNoBorder]:
              (themeName === "classic" &&
                !["secondary", "destructive-secondary"].includes(color)) ||
              themeName === "cambio",
          },
        )}
        ref={ref}
      >
        <Icon
          className={
            themeName === "classic"
              ? classicIconSize[size]
              : cambioIconSize[size]
          }
        />
      </button>
    );
  },
);

IconButton.displayName = "IconButton";

export default IconButton;
