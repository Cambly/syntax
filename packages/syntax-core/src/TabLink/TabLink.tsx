import {
  forwardRef,
  type HtmlHTMLAttributes,
  type ComponentProps,
} from "react";
import TabInternal from "../Tabs/TabInternal";
import classnames from "classnames";
import styles from "../Tabs/Tabs.module.css";
import Box from "../Box/Box";

type TabLinkProps = ComponentProps<typeof TabInternal> & {
  /**
   * Test id for the button
   */
  "data-testid"?: string;
  /**
   * The link that the Tab should route to.
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
   * An optional onClick event. This is used for certain wrapper's support (such as react-router-dom).
   */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const TabLink = forwardRef<HTMLAnchorElement, TabLinkProps>(
  (
    {
      text,
      href,
      target,
      rel,
      "data-testid": dataTestId,
      on = "lightBackground",
      onClick,
      selected,
      endContent,
      itemCount,
    }: TabLinkProps,
    ref,
  ) => {
    return (
      <div
        role="tab"
        className={classnames(styles.tab, {
          [styles.unselectedTab]: !selected,
          [styles.selectedTabOnLightBackground]:
            selected && on === "lightBackground",
          [styles.selectedTabOnDarkBackground]:
            selected && on === "darkBackground",
        })}
        style={{
          height: "100%",
        }}
      >
        <Box display="flex" alignItems="center" height="100%">
          <a
            href={href}
            data-testid={dataTestId}
            target={target}
            ref={ref}
            rel={rel}
            onClick={onClick}
            className={styles.link}
          >
            <TabInternal
              text={text}
              selected={selected}
              endContent={endContent}
              itemCount={itemCount}
              on={on}
            />
          </a>
        </Box>
      </div>
    );
  },
);

TabLink.displayName = "TabLink";

export default TabLink;
