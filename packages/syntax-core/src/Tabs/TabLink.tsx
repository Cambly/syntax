import {
  forwardRef,
  type HtmlHTMLAttributes,
  type ComponentProps,
} from "react";
import React from "react";
import TabInternal from "./TabInternal";

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
      on,
      onClick,
      selected,
      endContent,
      itemCount,
    }: TabLinkProps,
    ref,
  ) => {
    return (
      <a
        href={href}
        data-testid={dataTestId}
        target={target}
        ref={ref}
        rel={rel}
        onClick={onClick}
      >
        <TabInternal
          text={text}
          selected={selected}
          endContent={endContent}
          itemCount={itemCount}
          on={on}
        />
      </a>
    );
  },
);

TabLink.displayName = "TabLink";

export default TabLink;
