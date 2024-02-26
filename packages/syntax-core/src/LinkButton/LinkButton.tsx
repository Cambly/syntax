import { forwardRef, type HtmlHTMLAttributes } from "react";
import classNames from "classnames";
import React from "react";
import { type Size } from "../constants";
import Typography from "../Typography/Typography";
import buttonStyles from "../Button/Button.module.css";
import iconSize from "../Button/constants/iconSize";
import textVariant from "../Button/constants/textVariant";
import styles from "./LinkButton.module.css";

import { classicColor, cambioColor } from "../Button/constants/color";
import {
  classicBackgroundColor,
  cambioBackgroundColor,
} from "../colors//backgroundColor";
import {
  classicForegroundColor,
  cambioForegroundColor,
} from "../colors/foregroundColor";
import { useTheme } from "../ThemeProvider/ThemeProvider";
import classicSize from "../Button/constants/classicSize";

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
   * Classic only:
   * * `success-primary`
   * * `success-secondary`
   * * `inverse`
   *
   * Cambio only:
   * * `quaternary`
   * * `destructive-tertiary`
   * * `success-primary`
   * * `success-secondary`
   *
   * @defaultValue "primary"
   */
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "quaternary"
    | "destructive-primary"
    | "destructive-secondary"
    | "destructive-tertiary"
    | "branded"
    | "success"
    | "success-primary"
    | "success-secondary"
    | "inverse";
  /**
   * The size of the button
   *
   * Classic:
   * * `sm`: 32px
   * * `md`: 40px
   * * `lg`: 48px
   *
   * Cambio:
   * * `sm`: 32px
   * * `md`: 48px
   * * `lg`: 64px
   * * `xl`: 80px
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
   * Note: startIcon is not supported in the Cambio theme
   */
  startIcon?: React.ComponentType<{ className?: string }>;
  /**
   * The icon to be displayed at the end of the button. Please use a [Rounded Material Icon](https://material.io/resources/icons/?style=round)
   * Note: endIcon is not supported in the Cambio theme
   */
  endIcon?: React.ComponentType<{ className?: string }>;
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
      onClick,
    }: LinkButtonProps,
    ref,
  ) => {
    const { themeName } = useTheme();

    const foregroundColorClass =
      themeName === "classic"
        ? classicForegroundColor(classicColor(color))
        : cambioForegroundColor(cambioColor(color));

    const backgroundColorClass =
      themeName === "classic"
        ? classicBackgroundColor(classicColor(color))
        : cambioBackgroundColor(cambioColor(color));

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
          themeName === "classic"
            ? buttonStyles[classicSize(size)]
            : buttonStyles[`${size}Cambio`],
          {
            [buttonStyles.fullWidth]: fullWidth,
            [styles.fitContent]: !fullWidth,
            [buttonStyles.buttonGap]:
              themeName === "classic" && (size === "lg" || size === "md"),
            [buttonStyles.secondaryBorder]:
              themeName === "classic" && color === "secondary",
            [buttonStyles.secondaryDestructiveBorder]:
              themeName === "classic" && color === "destructive-secondary",
            [buttonStyles.cambioSecondaryBorder]:
              themeName === "cambio" && color === "secondary",
            [buttonStyles.cambioSecondaryDestructiveBorder]:
              themeName === "cambio" &&
              (color === "destructive-secondary" ||
                color === "destructive-tertiary"),
            [buttonStyles.cambioSecondarySuccessBorder]:
              themeName === "cambio" && color === "success-secondary",
          },
        )}
        onClick={onClick}
      >
        {StartIcon && themeName === "classic" && (
          <StartIcon
            className={classNames(
              buttonStyles.icon,
              iconSize[classicSize(size)],
              foregroundColorClass,
            )}
          />
        )}
        <Typography
          size={
            themeName === "classic"
              ? textVariant[classicSize(size)]
              : textVariant[size]
          }
        >
          <span
            // Temporary - until we have cambio colors on Typogrphay
            className={foregroundColorClass}
            style={{ fontWeight: 500 }}
          >
            {text}
          </span>
        </Typography>
        {EndIcon && themeName === "classic" && (
          <EndIcon
            className={classNames(
              buttonStyles.icon,
              iconSize[classicSize(size)],
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
