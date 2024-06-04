import {
  forwardRef,
  type HtmlHTMLAttributes,
  type ComponentProps,
} from "react";
import classNames from "classnames";
import React from "react";
import { type Size } from "../constants";
import Typography from "../Typography/Typography";
import buttonStyles from "../Button/Button.module.css";
import iconSize from "../Button/constants/iconSize";
import textVariant from "../Button/constants/textVariant";
import loadingIconSize from "../Button/constants/loadingIconSize";
import styles from "./LinkButton.module.css";
import { backgroundColor } from "../colors//backgroundColor";
import { foregroundColor } from "../colors/foregroundColor";
import { border } from "../colors/border";
import type InternalIcon from "../Icon/Icon";

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
    | "success-primary"
    | "success-secondary"
    | "success-tertiary";
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
   * If `true`, the button will be in a loading state
   *
   * @defaultValue false
   */
  loading?: boolean;
  /**
   * If `true`, the button will take up the full width of its container
   *
   * @defaultValue false
   */
  fullWidth?: boolean;
  /**
   * The icon to be displayed at the start of the button. Please use a [Rounded Material Icon](https://material.io/resources/icons/?style=round)
   */
  startIcon?:
    | React.ComponentType<{ className?: string }>
    | React.ComponentType<ComponentProps<typeof InternalIcon>>;
  /**
   * The icon to be displayed at the end of the button. Please use a [Rounded Material Icon](https://material.io/resources/icons/?style=round)
   */
  endIcon?:
    | React.ComponentType<{ className?: string }>
    | React.ComponentType<ComponentProps<typeof InternalIcon>>;
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
      loading = false,
      fullWidth = false,
      startIcon: StartIcon,
      endIcon: EndIcon,
      on = "lightBackground",
      onClick,
    }: LinkButtonProps,
    ref,
  ) => {
    const foregroundColorClass = foregroundColor(color, on);
    const backgroundColorClass = backgroundColor(color, on);

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
          border(color, on),
          buttonStyles[size],
          {
            [buttonStyles.fullWidth]: fullWidth,
            [styles.fitContent]: !fullWidth,
            [buttonStyles.buttonGap]: size === "lg" || size === "md",
            [buttonStyles.disabled]: loading,
          },
        )}
        onClick={onClick}
      >
        {!loading && StartIcon && (
          <StartIcon
            className={classNames(buttonStyles.icon, foregroundColorClass)}
            size={iconSize[size]}
          />
        )}
        {!loading && text && (
          <Typography size={textVariant[size]} weight="medium">
            <span
              // Temporary - until we have cambio colors on Typogrphay
              className={foregroundColorClass}
            >
              {text}
            </span>
          </Typography>
        )}
        {!loading && EndIcon && (
          <EndIcon
            className={classNames(buttonStyles.icon, foregroundColorClass)}
            size={iconSize[size]}
          />
        )}
        {loading && (
          <svg
            className={classNames(buttonStyles.loading, foregroundColorClass)}
            viewBox="22 22 44 44"
            width={loadingIconSize[size]}
            height={loadingIconSize[size]}
          >
            <circle
              className={buttonStyles.loadingCircle}
              cx="44"
              cy="44"
              r="20.2"
              fill="none"
              strokeWidth="3.6"
            />
          </svg>
        )}
      </a>
    );
  },
);

LinkButton.displayName = "LinkButton";

export default LinkButton;
