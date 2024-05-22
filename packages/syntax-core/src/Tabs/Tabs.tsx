import { type ReactNode } from "react";
import classnames from "classnames";
import TabButton from "./TabButton";
import TabLink from "./TabLink";
import styles from "./Tabs.module.css";

/**
 * [Tabs](https://cambly-syntax.vercel.app/?path=/docs/components-tabs--docs) are used to organize content into different sections.
 */
export default function Tabs({
  children,
  accessibilityLabel,
  on = "lightBackground",
}: {
  /**
   * The Tabs to display. Each Tab should be a `Tabs.Button` or a `Tabs.Link`.
   * Only use `Tabs.Link` for clicking tab that update the URL upon selection. Otherwise, use `Tabs.Button`.
   */
  children: ReactNode;
  /**
   * Accessibility label for the Tabs container.
   */
  accessibilityLabel: string;
  /**
   * Indicate whether the Tabs render on a light or dark background.
   *
   * @defaulValue `lightBackground`
   */
  on?: "lightBackground" | "darkBackground";
}): JSX.Element {
  return (
    <div
      role="tablist"
      aria-label={accessibilityLabel}
      className={classnames(styles.tabs, {
        [styles.lightBackground]: on === "lightBackground",
        [styles.darkBackground]: on === "darkBackground",
      })}
    >
      {children}
    </div>
  );
}

Tabs.Button = TabButton;
Tabs.Link = TabLink;
