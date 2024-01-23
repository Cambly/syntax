import React, { forwardRef, type ReactElement } from "react";
import {
  OverlayArrow as ReactAriaOverlayArrow,
  type OverlayArrowProps as ReactAriaOverlayArrowProps,
} from "react-aria-components";
import classNames from "classnames";
import boxStyles from "../Box/Box.module.css";
import styles from "./AriaOverlayArrow.module.css";

/**
 * AriaOverlayArrow: This component extends Tooltip from react-aria-components
 */
const AriaOverlayArrow = forwardRef<HTMLDivElement, ReactAriaOverlayArrowProps>(
  function AriaOverlayArrow({ ...otherProps }, ref): ReactElement {
    return (
      <ReactAriaOverlayArrow ref={ref} {...otherProps}>
        {({ placement }) => {
          if (placement === "center") return null;
          if (placement === "left") return null;
          if (placement === "right") return null;
          return (
            <div
              className={classNames([
                boxStyles.block,
                styles[`placement${placement}`],
              ])}
            >
              <svg
                className={classNames([boxStyles.block])}
                width={40}
                height={5}
                viewBox="0 0 40 5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17 0L22 5H12L17 0Z" fill="currentColor" />
              </svg>
            </div>
          );
        }}
      </ReactAriaOverlayArrow>
    );
  },
);

export default AriaOverlayArrow;
