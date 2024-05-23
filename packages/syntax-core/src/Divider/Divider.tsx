import { type ReactElement } from "react";
import styles from "./Divider.module.css";
import classNames from "classnames";
import colorStyles from "../colors/colors.module.css";

/**
 * [Divider](https://cambly-syntax.vercel.app/?path=/docs/components-divider--docs) is a thin horizontal line to group content in lists and layouts.
 */
function Divider({
  on = "lightBackground",
}: {
  /**
   * Indicate whether the divider renders on a light or dark background. Changes the color of the divider.
   *
   * @defaulValue `lightBackground`
   */
  on?: "lightBackground" | "darkBackground";
}): ReactElement {
  return (
    <hr
      className={classNames(
        styles.divider,
        {
          [colorStyles.cambioGray370BackgroundColor]: on === "lightBackground",
          [colorStyles.cambioWhite40BackgroundColor]: on === "darkBackground",
        }
      )}
    />
  );
}

export default Divider;
