import classNames from "classnames";
import { cambioForegroundColor } from "../colors/foregroundColor";
import React, { forwardRef } from "react";
import { type Size } from "../constants";
import styles from "./IconButton.module.css";
import useIsHydrated from "../useIsHydrated";
import { cambioColor } from "../Button/constants/color";
import { backgroundColor } from "../colors/backgroundColor";

const iconSize = {
  sm: styles.smIcon,
  md: styles.mdIcon,
  lg: styles.lgIcon,
};

type IconButtonProps = {
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
   * Test id for the button
   */
  "data-testid"?: string;
  /**
   * The size of the button

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
   * Indicate whether the button renders on a light or dark background. Changes the color of the button
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
      on = "lightBackground",
      onClick,
    }: IconButtonProps,
    ref,
  ) => {
    const isHydrated = useIsHydrated();
    const foregroundColorClass = cambioForegroundColor(cambioColor(color), on);
    const backgroundColorClass = backgroundColor(cambioColor(color), on);

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
          styles[size],
          styles.iconButtonNoBorder,
        )}
        ref={ref}
      >
        <Icon className={iconSize[size]} />
      </button>
    );
  },
);

IconButton.displayName = "IconButton";

export default IconButton;
