import {
  forwardRef,
  type HtmlHTMLAttributes,
  type ComponentProps,
} from "react";
import classNames from "classnames";
import React from "react";
import { type Size } from "../constants";
import buttonStyles from "../Button/Button.module.css";
import {
  materialIconSize,
  internalIconSize,
} from "../Button/constants/iconSize";
import { border } from "../colors/border";

import styles from "./IconLinkButton.module.css";
import type InternalIcon from "../Icon/Icon";

type IconLinkButtonProps = {
  /**
   * Test id for the button
   */
  "data-testid"?: string;
  /**
   * The link that the IconLinkButton should route to.
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
   * The label to be used for accessibility
   */
  accessibilityLabel: string;

  /**
   * The icon to be displayed.
   *
   * Deprecated: [Rounded Material Icon](https://material.io/resources/icons/?style=round)
   * Preferred: Syntax icon
   */
  icon:
    | React.ComponentType<{ className?: string }>
    | React.ComponentType<ComponentProps<typeof InternalIcon>>;
  /**
   * Indicate whether the button renders on a light or dark background. Changes the color of the button
   *
   * @defaultValue `lightBackground`
   */
  on?: "lightBackground" | "darkBackground";
  /**
   * An optional onClick event. This is used for certain wrapper's support (such as react-router-dom).
   */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

/**
 * [IconLinkButton](https://cambly-syntax.vercel.app/?path=/docs/components-iconbutton--docs) is a clickable element that is used to perform an action.
 */
const IconLinkButton = forwardRef<HTMLAnchorElement, IconLinkButtonProps>(
  (
    {
      href,
      target,
      rel,
      "data-testid": dataTestId,
      color = "primary",
      size = "md",
      icon: Icon,
      on = "lightBackground",
      onClick,
    }: IconLinkButtonProps,
    ref,
  ) => {
    const buttonClasses = classNames(
      buttonStyles.button,
      styles.iconLinkButton,
      buttonStyles[size],
      border(color, on),
    );

    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        data-testid={dataTestId}
        className={buttonClasses}
        onClick={onClick}
      >
        <Icon
          className={materialIconSize[size]}
          size={internalIconSize[size]}
        />
      </a>
    );
  },
);

IconLinkButton.displayName = "IconLinkButton";

export default IconLinkButton;
