import React, {
  forwardRef,
  type HtmlHTMLAttributes,
  useReducer,
  type AriaAttributes,
  type ReactNode,
} from "react";
import tapAreaStyles from "../TapArea/TapArea.module.css";
import roundingStyles from "../rounding.module.css";
import useIsHydrated from "../useIsHydrated";
import classNames from "classnames";
import styles from "./LinkTapArea.module.css";

type LinkTapAreaProps = AriaAttributes & {
  /**
   * The children to be rendered inside the tap area.
   */
  children?: ReactNode;
  /**
   * The link that the LinkTapArea should route to.
   *
   */
  href?: string;
  /**
   * The target attribute specifies where to open the linked document.
   *
   */
  target?: "_blank" | "_self" | "_parent" | "_top";
  /**
   * The rel attribute specifies the relationship between the document and the link.
   *
   */
  rel?: HtmlHTMLAttributes<HTMLAnchorElement>["rel"];
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
  onClick: (event: React.SyntheticEvent<HTMLAnchorElement>) => void;
  /**
   * The callback to be called when the tap area is hovered
   */
  onMouseEnter?: (event: React.SyntheticEvent<HTMLAnchorElement>) => void;
  /**
   * The callback to be called when the tap area is no longer hovered
   */
  onMouseLeave?: (event: React.SyntheticEvent<HTMLAnchorElement>) => void;
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
const LinkTapArea = forwardRef<HTMLAnchorElement, LinkTapAreaProps>(
  (
    {
      children,
      href,
      target,
      rel,
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
    }: LinkTapAreaProps,
    ref,
  ) => {
    const isHydrated = useIsHydrated();
    const disabled = !isHydrated || disabledProp;
    const [{ hovered, focussed }, dispatch] = useReducer(reducer, {
      hovered: false,
      focussed: false,
    });
    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
      if (disabled) {
        undefined;
      } else {
        event.currentTarget.blur();
        onClick(event);
      }
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLAnchorElement> = (
      event,
    ) => {
      if (disabled) return;
      if (event.key === "Enter" || event.key === " " || event.key === "Space") {
        event.preventDefault();
        onClick(event);
      }
    };

    const handleOnMouseEnter: React.MouseEventHandler<HTMLAnchorElement> = (
      event,
    ) => {
      if (disabled) return;
      dispatch({ type: "MOUSE_ENTER" });
      onMouseEnter?.(event);
    };

    const handleOnMouseLeave: React.MouseEventHandler<HTMLAnchorElement> = (
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
      <a
        {...accessibilityProps}
        aria-disabled={disabled || accessibilityProps["aria-disabled"]}
        aria-label={accessibilityLabel ?? accessibilityProps["aria-label"]}
        className={classNames(
          styles.linkTapArea,
          tapAreaStyles.tapArea,
          tapAreaStyles[`${disabled ? "disabled" : "enabled"}`],
          fullHeight && tapAreaStyles.fullHeight,
          fullWidth && tapAreaStyles.fullWidth,
          isHoveredOrFocussed && tapAreaStyles.hoveredOrFocussed,
          roundingClasses,
        )}
        data-testid={dataTestId}
        href={href}
        target={target}
        rel={rel}
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
          <div className={classNames(tapAreaStyles.overlay, roundingClasses)} />
        )}
        {children}
      </a>
    );
  },
);

LinkTapArea.displayName = "LinkTapArea";

export default LinkTapArea;
