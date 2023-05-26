import classNames from "classnames";
import badgeBackgroundColor from "../colors/badgeBackgroundColor";
import badgeForegroundColor from "../colors/badgeForegroundColor";

import Typography from "../Typography/Typography";

import { type BadgeColor } from "../constants";

import styles from "./Badge.module.css";

/**
 * Badge is a component to display short text and give additional context to features and other components.
 */
const Badge = ({
  text,
  color = "primary",
}: {
  /**
   * The text to display inside the badge
   */
  text: string;
  /**
   * The color of the badge
   *
   * @defaultValue "primary"
   */
  color?: (typeof BadgeColor)[number];
}): JSX.Element => (
  <div
    className={classNames(
      styles.badge,
      badgeBackgroundColor(color),
      badgeForegroundColor(color),
    )}
  >
    <Typography color="inherit">{text}</Typography>
  </div>
);

export default Badge;
