import { type ReactElement, type ReactNode } from "react";
import styles from "./ButtonGroup.module.css";
import { type Size } from "../constants";
import classNames from "classnames";

const gap = {
  ["sm"]: styles.smallGap,
  ["md"]: styles.mediumGap,
  ["lg"]: styles.largeGap,
} as const;

/**
 * Group buttons to render them in a row or column with consistent spacing between each button
 */
const ButtonGroup = ({
  orientation = "horizontal",
  size = "md",
  children,
}: {
  /**
   * The orientation of the button group
   *
   * @defaultValue "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * The size of the button group defines the spacing between each button
   *
   * * `sm`: 8px
   * * `md`: 12px
   * * `lg`: 16px
   *
   * @defaultValue "md"
   */
  size?: (typeof Size)[number];
  /**
   * Buttons to be rendered inside the button group
   */
  children?: ReactNode;
}): ReactElement => {
  const classnames = classNames(styles.buttonGroup, gap[size], {
    [styles.horizontal]: orientation === "horizontal",
    [styles.vertical]: orientation === "vertical",
  });

  return <div className={classnames}>{children}</div>;
};

export default ButtonGroup;
