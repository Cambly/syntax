import { forwardRef, type HtmlHTMLAttributes } from "react";
import classNames from "classnames";
import backgroundColor from "../colors/backgroundColor";
import foregroundColor from "../colors/foregroundColor";
import foregroundTypographyColor from "../colors/foregroundTypographyColor";
import React from "react";
import { type Size } from "../constants";
import Typography from "../Typography/Typography";

import buttonStyles from "../Button/Button.module.css";
import textVariant from "../Button/constants/textVariant";

import styles from "./LinkButton.module.css";

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
      onClick,
    }: LinkButtonProps,
    ref,
  ) => {
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
        <Typography
          color={foregroundTypographyColor(color)}
          size={textVariant[size]}
        >
          <span style={{ fontWeight: 500 }}>{text}</span>
        </Typography>
      </a>
    );
  },
);

LinkButton.displayName = "LinkButton";

export default LinkButton;
