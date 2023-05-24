import classNames from "classnames";
import badgeBackgroundColor from "../colors/badgeBackgroundColor";
import badgeForegroundColor from "../colors/badgeForegroundColor";

import Typography from "../Typography/Typography";

import { type BadgeColor } from "../constants";

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
  <span
    className={classNames(
      badgeBackgroundColor(color),
      badgeForegroundColor(color),
    )}
    style={{
      display: "inline",
      borderRadius: "100px",
      padding: "4px 9px",
    }}
  >
    <Typography color="inherit" inline>
      {text}
    </Typography>
  </span>
);

export default Badge;
