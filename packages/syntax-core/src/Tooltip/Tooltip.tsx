import React, { ReactElement, ReactNode } from "react";
import classnames from "classnames";

import styles from "./Tooltip.module.css";

/**
 * Tooltip add hover w/ optional icon
 */
const Tooltip = ({
  text,
  icon,
  link = "",
  direction = "belowRight",
  children,
}: {
  /**
   * Always add a label tag for best accessibility practices
   */
  text: string;
  /**
   * The icon to show that the tooltip wraps around. Otherwise it will wrap round the div
   */
  icon?: React.ComponentType<{ className: string }>;
  /**
   * @defaultValue ""
   * Show linke below tooltip text
   */
  link?: string;
  /**
   * @defaultValue belowRight
   * Where to show tooltip text on hover
   */
  direction?: "belowLeft" | "belowRight" | "aboveLeft" | "aboveRight";
  /**
   * @defaultValue
   */
  children?: ReactNode;
}): ReactElement => {
  //   const baseRadioButtonSingle = classnames(styles.baseRadioButton, {
  //     [styles.smBase]: size === "sm",
  //     [styles.mdBase]: size === "md",
  //   });

  return (
    <div className={styles.tooltip}>
      <>
        {children}
        {icon}
        <span className={styles.tooltiptext}>Tooltip text</span>
      </>
    </div>
  );
};

export default Tooltip;
