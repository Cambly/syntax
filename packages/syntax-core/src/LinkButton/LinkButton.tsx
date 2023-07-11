import classNames from "classnames";
import backgroundColor from "../colors/backgroundColor";
import foregroundColor, {
  foregroundTypographyColor,
} from "../colors/foregroundColor";
import React, { type ReactElement, type ReactNode } from "react";
import { type Color, type Size } from "../constants";
import Typography from "../Typography/Typography";

import buttonStyles from "../Button/Button.module.css";
import { textVariant, iconSize } from "../Button/ButtonConstants";

import styles from "./LinkButton.module.css";

function A({
  children,
  href,
  openInNewWindow,
}: {
  children: ReactNode;
  href: string;
  openInNewWindow: boolean;
}): ReactElement {
  const target = openInNewWindow ? "_blank" : "";
  return (
    <a href={href} target={target}>
      {children}
    </a>
  );
}

const LinkButton = ({
  text,
  color = "primary",
  size = "md",
  fullWidth = false,
  startIcon: StartIcon,
  endIcon: EndIcon,
  wrapper: Wrapper = A,
  href,
  openInNewWindow = false,
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
  wrapper?: React.ComponentType<{
    children: ReactNode;
    href: string;
    openInNewWindow: boolean;
  }>;
  /**
   * The link or url that the button should redirect to.
   */
  href: string;
  /**
   * If `true`, the link will open in a new window/tab.
   */
  openInNewWindow?: boolean;
}): JSX.Element => {
  return (
    <Wrapper href={href} openInNewWindow={openInNewWindow}>
      <div
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
    </Wrapper>
  );
};

export default LinkButton;
