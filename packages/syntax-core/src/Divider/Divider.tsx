import styles from "./Divider.module.css";
import classNames from "classnames";
import colorStyles from "../colors/colors.module.css";

/**
 * [Divider](https://cambly-syntax.vercel.app/?path=/docs/components-divider--docs) is a thin horizontal line to group content in lists and layouts.
 */
export default function Divider(): React.ReactElement {
  return (
    <hr
      className={classNames(styles.divider, colorStyles.gray370BackgroundColor)}
    />
  );
}

Divider.displayName = "Divider";
