import {
  forwardRef,
  type HtmlHTMLAttributes,
  type ComponentProps,
} from "react";
import classNames from "classnames";
import React from "react";
import { type Size } from "../constants";
import {
  materialIconSize,
  internalIconSize,
} from "../Button/constants/iconSize";
import { border } from "../colors/border";

import buttonStyles from "../Button/Button.module.css";
import type InternalIcon from "../Icon/Icon";
import iconButtonStyles from "../IconButton/IconButton.module.css";

import { foregroundColor } from "../colors/foregroundColor";
import { backgroundColor } from "../colors/backgroundColor";

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
   * If `true`, the button will be disabled
   *
   * @defaultValue false
   */
  disabled?: boolean;
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
 * [IconLinkButton](https://cambly-syntax.vercel.app/?path=/docs/components-iconlinkbutton--docs) is a "variation" of IconButton that should look identical to IconButton, but should be used to render links instead.
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
      disabled = false,
      accessibilityLabel,
    }: IconLinkButtonProps,
    ref,
  ) => {
    const foregroundColorClass = foregroundColor(color, on);
    const backgroundColorClass = backgroundColor(color, on);

    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        data-testid={dataTestId}
        aria-label={accessibilityLabel}
        className={classNames(
          iconButtonStyles.iconButton,
          foregroundColorClass,
          backgroundColorClass,
          border(color, on),
          iconButtonStyles[size],
          {
            [buttonStyles.disabled]: disabled,
          },
        )}
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
