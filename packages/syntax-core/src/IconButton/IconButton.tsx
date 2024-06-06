import classNames from "classnames";
import { foregroundColor } from "../colors/foregroundColor";
import React, { type ComponentProps, forwardRef } from "react";
import { type Size } from "../constants";
import styles from "./IconButton.module.css";
import useIsHydrated from "../useIsHydrated";
import { backgroundColor } from "../colors/backgroundColor";
import { border } from "../colors/border";
import type InternalIcon from "../Icon/Icon";
import {
  materialIconSize,
  internalIconSize,
} from "../Button/constants/iconSize";

type IconButtonProps = {
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
    | "success-primary"
    | "success-secondary"
    | "success-tertiary";
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
   * The icon to be displayed.
   *
   * Deprecated: [Rounded Material Icon](https://material.io/resources/icons/?style=round)
   * Preferred: Syntax icon
   */
  icon:
    | React.ComponentType<{ className?: string }>
    | React.ComponentType<ComponentProps<typeof InternalIcon>>;
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
    const foregroundColorClass = foregroundColor(color, on);
    const backgroundColorClass = backgroundColor(color, on);

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
          border(color, on),
          styles[size],
        )}
        ref={ref}
      >
        <Icon
          className={materialIconSize[size]}
          size={internalIconSize[size]}
        />
      </button>
    );
  },
);

IconButton.displayName = "IconButton";

export default IconButton;
