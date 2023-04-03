import React, { ReactElement, ReactNode } from "react";
import classnames from "classnames";

import styles from "./Tooltip.module.css";
import Typography from "../Typography/Typography";

/**
 * Tooltip add hover w/ optional icon
 */
const Tooltip = ({
  text,
  url,
  icon,
  direction = "belowRight",
  children,
}: {
  /**
   * Always add a label tag for best accessibility practices
   */
  text: string;
  /**
   * An optional link to direct users to
   */
  url?: string;
  /**
   * The icon the tooltip wraps around. Otherwise it will wrap around the children div
   */
  icon?: ReactElement;
  /**
   * @defaultValue belowRight
   * Where to show tooltip text on hover
   */
  direction?: "belowRight" | "belowLeft" | "aboveRight" | "aboveLeft";
  /**
   * @defaultValue
   */
  children?: ReactNode;
}): ReactElement => {
  // const uncheckedStyles = classnames(styles.background, styles[size], {
  //     [styles.errorBorderColor]: error,
  //     [styles.borderColor]: !error,
  //   });
  return (
    <div className={styles.tooltip}>
      Hover over me
      {icon}
      <span className={styles.tooltiptext}>
        <Typography color="white">{text}</Typography>
      </span>
    </div>
  );
};

export default Tooltip;
