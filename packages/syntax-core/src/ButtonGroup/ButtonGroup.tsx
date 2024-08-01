import { type ReactElement, type ReactNode } from "react";
import styles from "./ButtonGroup.module.css";
import { type Size } from "../constants";
import classNames from "classnames";

const gap = {
  sm: styles.smallGap,
  md: styles.mediumGap,
  lg: styles.largeGap,
} as const;

/**
 * [ButtonGroup](https://cambly-syntax.vercel.app/?path=/docs/components-buttongroup--docs) groups buttons in a row or column with consistent spacing between each button.
 */
const ButtonGroup = ({
  orientation = "horizontal",
  size = "md",
  children,
  smOrientation,
  lgOrientation,
}: {
  /**
   * The orientation of the button group
   *
   * @defaultValue "horizontal"
   *
   * Responsive props:
   * `smOrientation`
   * `lgOrientation`
   */
  orientation?: "horizontal" | "vertical";
  /**
   * The size of the button group defines the spacing between each button
   *
   * * `sm`: 4px
   * * `md`: 8px
   * * `lg`: 12px
   *
   * @defaultValue "md"
   */
  size?: (typeof Size)[number];
  /**
   * Buttons to be rendered inside the button group
   */
  children?: ReactNode;
  /**
   * Bottom margin on sm (480px) or larger viewports.
   */
  smOrientation?: typeof orientation;
  /**
   * Bottom margin on lg (960px) or larger viewports.
   */
  lgOrientation?: typeof orientation;
}): ReactElement => {
  const classnames = classNames(
    styles.buttonGroup,
    gap[size],
    smOrientation != null && styles[`orientation${smOrientation}Small`],
    lgOrientation != null && styles[`orientation${lgOrientation}Large`],
    {
      [styles.horizontal]: orientation === "horizontal",
      [styles.vertical]: orientation === "vertical",
    },
  );

  return <div className={classnames}>{children}</div>;
};

export default ButtonGroup;
