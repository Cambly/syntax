import styles from "./Divider.module.css";
import classNames from "classnames";
import colorStyles from "../colors/colors.module.css";

const dividerColors = [
  "white40",
  "white70",
  "gray270",
  "gray370",
  "gray870",
  "cream",
  "lilac",
  "navy",
  "orange",
  "pink",
  "purple",
  "red",
  "sky",
  "slate",
  "tan",
  "teal",
  "thistle",
] as const;

/**
 * [Divider](https://cambly-syntax.vercel.app/?path=/docs/components-divider--docs) is a thin horizontal line to group content in lists and layouts.
 */
export default function Divider({
  color = "gray370",
}: {
  color?: (typeof dividerColors)[number];
}): React.ReactElement {
  return (
    <hr
      className={classNames(
        styles.divider,
        colorStyles[`${color}BackgroundColor`],
      )}
    />
  );
}

Divider.displayName = "Divider";
