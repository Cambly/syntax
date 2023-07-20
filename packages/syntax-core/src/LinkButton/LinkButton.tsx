import { type HtmlHTMLAttributes } from "react";
import classNames from "classnames";
import backgroundColor from "../colors/backgroundColor";
import foregroundColor from "../colors/foregroundColor";
import foregroundTypographyColor from "../colors/foregroundTypographyColor";
import React from "react";
import { type Size } from "../constants";
import Typography from "../Typography/Typography";

import buttonStyles from "../Button/Button.module.css";
import iconSize from "../Button/constants/iconSize";
import textVariant from "../Button/constants/textVariant";

import styles from "./LinkButton.module.css";

/**
 * [LinkButton](https://cambly-syntax.vercel.app/?path=/docs/components-linkbutton--docs) is a "variation" of Button that should look identical to Button, but should be used to render links instead.
 */
export default function LinkButton({
  text,
  href,
  target,
  rel,
  "data-testid": dataTestId,
  color = "primary",
  size = "md",
  fullWidth = false,
  startIcon: StartIcon,
  endIcon: EndIcon,
  onClick,
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
   * The link that the LinkButton should route to.
   *
   */
  href?: string;
  /**
   * The target attribute specifies where to open the linked document.
   *
   */
  target?: "_blank" | "_self" | "_parent" | "_top";
  /**
   * The target attribute specifies where to open the linked document.
   *
   */
  rel?: HtmlHTMLAttributes<HTMLAnchorElement>["rel"];
  /**
   * The color of the button
   *
   * @defaultValue "primary"
   */
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "destructive-primary"
    | "destructive-secondary"
    | "destructive-tertiary"
    | "branded"
    | "success";
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
   * An optional onClick event. This is used for certain wrapper's support (such as react-router-dom).
   */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}): JSX.Element {
  return (
    <a
      href={href}
      data-testid={dataTestId}
      target={target}
      rel={rel}
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
      onClick={onClick}
    >
      {StartIcon && (
        <StartIcon className={classNames(buttonStyles.icon, iconSize[size])} />
      )}
      <Typography
        color={foregroundTypographyColor(color)}
        size={textVariant[size]}
      >
        <span style={{ fontWeight: 500 }}>{text}</span>
      </Typography>
      {EndIcon && (
        <EndIcon className={classNames(buttonStyles.icon, iconSize[size])} />
      )}
    </a>
  );
}
