import { forwardRef, type HtmlHTMLAttributes } from "react";
import classNames from "classnames";
import React from "react";
import { type Size } from "../constants";
import Typography from "../Typography/Typography";
import buttonStyles from "../Button/Button.module.css";
import iconSize from "../Button/constants/iconSize";
import textVariant from "../Button/constants/textVariant";
import styles from "./LinkButton.module.css";
import { cambioColor } from "../Button/constants/color";
import { backgroundColor } from "../colors//backgroundColor";
import { cambioForegroundColor } from "../colors/foregroundColor";

type LinkButtonProps = {
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
   * The rel attribute specifies the relationship between the document and the link.
   *
   */
  rel?: HtmlHTMLAttributes<HTMLAnchorElement>["rel"];
  /**
   * The color of the button
   *
   * `inverse` and `success` are deprecated
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
    | "success"
    | "success-primary"
    | "success-secondary"
    | "success-tertiary"
    | "inverse";
  /**
   * The size of the button
   * * `sm`: 32px
   * * `md`: 48px
   * * `lg`: 64px
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
  startIcon?: React.ComponentType<{ className?: string }>;
  /**
   * The icon to be displayed at the end of the button. Please use a [Rounded Material Icon](https://material.io/resources/icons/?style=round)
   */
  endIcon?: React.ComponentType<{ className?: string }>;
  /**
   * Indicate whether the button renders on a light or dark background. Changes the color of the button
   *
   * @defaulValue `lightBackground`
   */
  on?: "lightBackground" | "darkBackground";
  /**
   * An optional onClick event. This is used for certain wrapper's support (such as react-router-dom).
   */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

/**
 * [LinkButton](https://cambly-syntax.vercel.app/?path=/docs/components-linkbutton--docs) is a "variation" of Button that should look identical to Button, but should be used to render links instead.
 */
const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
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
      on = "lightBackground",
      onClick,
    }: LinkButtonProps,
    ref,
  ) => {
    const foregroundColorClass = cambioForegroundColor(cambioColor(color), on);
    const backgroundColorClass = backgroundColor(cambioColor(color), on);

    return (
      <a
        href={href}
        data-testid={dataTestId}
        target={target}
        ref={ref}
        rel={rel}
        className={classNames(
          styles.linkButton,
          buttonStyles.button,
          foregroundColorClass,
          backgroundColorClass,
          buttonStyles[size],
          {
            [buttonStyles.fullWidth]: fullWidth,
            [styles.fitContent]: !fullWidth,
            [buttonStyles.buttonGap]: size === "lg" || size === "md",
          },
        )}
        onClick={onClick}
      >
        {StartIcon && (
          <StartIcon
            className={classNames(
              buttonStyles.icon,
              iconSize[size],
              foregroundColorClass,
            )}
          />
        )}
        <Typography size={textVariant[size]}>
          <span
            // Temporary - until we have cambio colors on Typogrphay
            className={foregroundColorClass}
            style={{ fontWeight: 500 }}
          >
            {text}
          </span>
        </Typography>
        {EndIcon && (
          <EndIcon
            className={classNames(
              buttonStyles.icon,
              iconSize[size],
              foregroundColorClass,
            )}
          />
        )}
      </a>
    );
  },
);

LinkButton.displayName = "LinkButton";

export default LinkButton;
