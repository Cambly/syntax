import React, {
  type ReactNode,
  forwardRef,
  useReducer,
  type AriaAttributes,
} from "react";
import classNames from "classnames";
import styles from "./TapArea.module.css";
import roundingStyles from "../rounding.module.css";
import useIsHydrated from "../useIsHydrated";

type TapAreaProps = AriaAttributes & {
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
   * If `true`, the tap area will be full height
   */
  fullHeight?: boolean;
  /**
   * If `true`, the tap area will be full width
   */
  fullWidth?: boolean;
  /**
   * The callback to be called when the tap area is clicked
   */
  onClick: (event: React.SyntheticEvent<HTMLDivElement>) => void;
  /**
   * The callback to be called when the tap area is hovered
   */
  onMouseEnter?: (event: React.SyntheticEvent<HTMLDivElement>) => void;
  /**
   * The callback to be called when the tap area is no longer hovered
   */
  onMouseLeave?: (event: React.SyntheticEvent<HTMLDivElement>) => void;
  /**
   * Border radius of the tap area.
   *
   * * `none`: 0px
   * * `sm`: 8px
   * * `md`: 12px
   * * `full`: 999px
   *
   * @defaultValue "none"
   */
  rounding?: "md" | "sm" | "full" | "none";
  /**
   * The tab index of the tap area
   */
  tabIndex?: 0 | -1;
};

function reducer(
  state: {
    hovered: boolean;
    focussed: boolean;
  },
  action: {
    type: "BLUR" | "FOCUS" | "MOUSE_ENTER" | "MOUSE_LEAVE";
  },
) {
  switch (action.type) {
    case "BLUR":
      return { ...state, focussed: false };
    case "FOCUS":
      return { ...state, focussed: true };
    case "MOUSE_ENTER":
      return { ...state, hovered: true };
    case "MOUSE_LEAVE":
      return { ...state, hovered: false };
    default:
      return state;
  }
}

/**
 * [TapArea](https://cambly-syntax.vercel.app/?path=/docs/components-taparea--docs) allows components to be clickable and touchable in an accessible way.
 */
const TapArea = forwardRef<HTMLDivElement, TapAreaProps>(
  (
    {
      children,
      accessibilityLabel,
      "data-testid": dataTestId,
      disabled: disabledProp = false,
      fullHeight = false,
      fullWidth = true,
      onClick,
      onMouseEnter,
      onMouseLeave,
      rounding = "none",
      tabIndex = 0,
      ...accessibilityProps
    }: TapAreaProps,
    ref,
  ) => {
    const isHydrated = useIsHydrated();
    const disabled = !isHydrated || disabledProp;
    const [{ hovered, focussed }, dispatch] = useReducer(reducer, {
      hovered: false,
      focussed: false,
    });

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
      if (disabled) {
        undefined;
      } else {
        event.currentTarget.blur();
        onClick(event);
      }
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (
      event,
    ) => {
      if (disabled) return;
      if (event.key === "Enter" || event.key === " " || event.key === "Space") {
        event.preventDefault();
        onClick(event);
      }
    };

    const handleOnMouseEnter: React.MouseEventHandler<HTMLDivElement> = (
      event,
    ) => {
      if (disabled) return;
      dispatch({ type: "MOUSE_ENTER" });
      onMouseEnter?.(event);
    };

    const handleOnMouseLeave: React.MouseEventHandler<HTMLDivElement> = (
      event,
    ) => {
      if (disabled) return;
      dispatch({ type: "MOUSE_LEAVE" });
      onMouseLeave?.(event);
    };

    const isHoveredOrFocussed = !disabled && (hovered || focussed);
    const roundingClasses =
      rounding !== "none" && roundingStyles[`rounding${rounding}`];

    return (
      <div
        {...accessibilityProps}
        aria-disabled={disabled || accessibilityProps["aria-disabled"]}
        aria-label={accessibilityLabel ?? accessibilityProps["aria-label"]}
        className={classNames(
          styles.tapArea,
          styles[`${disabled ? "disabled" : "enabled"}`],
          fullHeight && styles.fullHeight,
          fullWidth && styles.fullWidth,
          isHoveredOrFocussed && styles.hoveredOrFocussed,
          roundingClasses,
        )}
        data-testid={dataTestId}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onFocus={() => dispatch({ type: "FOCUS" })}
        onBlur={() => dispatch({ type: "BLUR" })}
        ref={ref}
        role="button"
        tabIndex={disabled ? undefined : tabIndex}
      >
        {!disabled && (hovered || focussed) && (
          <div className={classNames(styles.overlay, roundingClasses)} />
        )}
        {children}
      </div>
    );
  },
);

TapArea.displayName = "TapArea";

export default TapArea;
