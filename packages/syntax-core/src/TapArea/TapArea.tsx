import React, { type ReactNode, forwardRef } from "react";
import classNames from "classnames";
import styles from "./TapArea.module.css";
import roundingStyles from "../rounding.module.css";

type TapAreaProps = {
  /**
   * The children to be rendered inside the tap area.
   */
  children?: ReactNode;
  /**
   * The label to be used for accessibility
   */
  accessibilityLabel?: string;
  /**
   * Test id for the tap area
   */
  "data-testid"?: string;
  /**
   * If `true`, the tap area will be disabled
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * If `true`, the tap area will be full width
   */
  fullWidth?: boolean;
  /**
   * The callback to be called when the tap area is clicked
   */
  onClick: React.MouseEventHandler<HTMLDivElement>;
  /**
   * Border radius of the tap area.
   *
   * * `none`: 0px
   * * `sm`: 8px
   * * `md`: 12px
   * * `lg`: 16px
   * * `xl`: 32px
   * * `full`: 999px
   *
   * @defaultValue "none"
   */
  rounding?: "xl" | "lg" | "md" | "sm" | "full" | "none";
  /**
   * The tab index of the tap area
   */
  tabIndex?: 0 | -1;
};

/**
 * [TapArea](https://cambly-syntax.vercel.app/?path=/docs/components-taparea--docs) allows components to be clickable and touchable in an accessible way.
 */
const TapArea = forwardRef<HTMLDivElement, TapAreaProps>(
  (
    {
      children,
      accessibilityLabel,
      "data-testid": dataTestId,
      disabled = false,
      fullWidth = true,
      onClick,
      rounding = "none",
      tabIndex = 0,
    }: TapAreaProps,
    ref,
  ) => {
    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) =>
      !disabled ? onClick(event) : undefined;

    return (
      <div
        aria-disabled={disabled}
        aria-label={accessibilityLabel}
        className={classNames(
          styles.tapArea,
          styles[`${disabled ? "disabled" : "enabled"}`],
          fullWidth && styles.fullWidth,
          rounding !== "none" && roundingStyles[`rounding${rounding}`],
        )}
        data-testid={dataTestId}
        onClick={handleClick}
        ref={ref}
        role="button"
        tabIndex={disabled ? undefined : tabIndex}
      >
        {children}
      </div>
    );
  },
);

TapArea.displayName = "TapArea";

export default TapArea;
