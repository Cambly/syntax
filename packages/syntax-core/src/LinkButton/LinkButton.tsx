import classNames from "classnames";
import backgroundColor from "../colors/backgroundColor";
import foregroundColor, {
  foregroundTypographyColor,
} from "../colors/foregroundColor";
import React from "react";
import { type Color, type Size } from "../constants";
import Typography from "../Typography/Typography";

import buttonStyles from "../Button/Button.module.css";
import { textVariant, iconSize } from "../Button/ButtonConstants";

import styles from "./LinkButton.module.css";

/**
 * LinkButton is a "variation" of Button that should look identical to Button, but should be used to render links instead.
 * It needs to be wrapped with the appropriate wrapper for react-router, next/link, or a tag.
 * The wrapper will most likely need a style={{textDecoration: "none"}} to remove the default underline styling.
 *
 * ```
 * <a href="/english/resources" target="_blank" style={{textDecoration: "none"}}>
 *    <LinkButton text="Resources" />
 * </a>
 * ```
 *
 * ```
 * import Link from "next/link";
 *
 * <Link href="/english/resources" style={{textDecoration: "none"}}>
 *    <LinkButton text="Resources" />
 * </Link>
 * ```
 *
 * ```
 * import Link from "react-router-dom";
 *
 * <Link href="/english/resources" style={{textDecoration: "none"}}>
 *    <LinkButton text="Resources" />
 * </Link>
 * ```
 */
export default function LinkButton({
  text,
  "data-testid": dataTestId,
  color = "primary",
  size = "md",
  fullWidth = false,
  startIcon: StartIcon,
  endIcon: EndIcon,
}: {
  /**
   * Test id for the button
   */
  "data-testid"?: string;
  /**
   * The text to be displayed inside the button
   */
  text: string;
  /**
   * The color of the button
   *
   * @defaultValue "primary"
   */
  color?: (typeof Color)[number];
  /**
   * The size of the button
   *
   * * `sm`: 32px
   * * `md`: 40px
   * * `lg`: 48px
   *
   * @defaultValue "md"
   */
  size?: (typeof Size)[number];
  /**
   * If `true`, the button will take up the full width of its container
   *
   * @defaultValue false
   */
  fullWidth?: boolean;
  /**
   * The icon to be displayed at the start of the button. Please use a [Rounded Material Icon](https://material.io/resources/icons/?style=round)
   */
  startIcon?: React.ComponentType<{ className: string }>;
  /**
   * The icon to be displayed at the end of the button. Please use a [Rounded Material Icon](https://material.io/resources/icons/?style=round)
   */
  endIcon?: React.ComponentType<{ className: string }>;
  /**
   * The custom wrapper for LinkButton, This wrapper is used to change the default "a" tag to something like Next.js Link or react-router-dom's Link.
   */
}): JSX.Element {
  return (
    <div
      data-testid={dataTestId}
      className={classNames(
        styles.linkButton,
        buttonStyles.button,
        foregroundColor(color),
        backgroundColor(color),
        buttonStyles[size],
        {
          [buttonStyles.fullWidth]: fullWidth,
          [styles.fitContent]: !fullWidth,
          [buttonStyles.buttonGap]: size === "lg" || size === "md",
          [buttonStyles.secondaryBorder]: color === "secondary",
          [buttonStyles.secondaryDestructiveBorder]:
            color === "destructive-secondary",
        },
      )}
    >
      {StartIcon && (
        <StartIcon className={classNames(styles.icon, iconSize[size])} />
      )}
      <Typography
        color={foregroundTypographyColor(color)}
        size={textVariant[size]}
      >
        {text}
      </Typography>
      {EndIcon && (
        <EndIcon className={classNames(styles.icon, iconSize[size])} />
      )}
    </div>
  );
}
