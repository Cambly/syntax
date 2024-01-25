/* TODO: rename to RichSelectSection */
import React, { forwardRef, type ReactElement } from "react";
import {
  Section as ReactAriaSection,
  Header as ReactAriaHeader,
} from "react-aria-components";
import classNames from "classnames";
import boxStyles from "../Box/Box.module.css";
import layoutStyles from "../layout.module.css";
import { type PartialNode } from "@react-stately/collections";

type RichSelectOptGroupProps = {
  "data-testid"?: string;
  label: string;
  children: ReactElement | ReactElement[];
  orientation?: "horizontal" | "vertical";
};
function RichSelectOptGroup(props: RichSelectOptGroupProps): ReactElement {
  const {
    "data-testid": dataTestId,
    label,
    children,
    orientation = "horizontal",
  } = props;
  return (
    <ReactAriaSection
      data-testid={dataTestId}
      className={classNames(
        [boxStyles.box, boxStyles.flex, boxStyles.flexWrap, boxStyles.gap3],
        {
          [boxStyles.row]: orientation === "horizontal",
          [boxStyles.column]: orientation === "vertical",
        },
      )}
    >
      {label && (
        <ReactAriaHeader className={classNames(layoutStyles.fullWidth)}>
          {label}
        </ReactAriaHeader>
      )}
      {children}
    </ReactAriaSection>
  );
}

export function* getCollectionNode(
  props: RichSelectOptGroupProps,
): Generator<PartialNode<unknown>> {
  const { children, label } = props;
  yield {
    type: "section",
    props: props,
    hasChildNodes: true,
    rendered: label,
    "aria-label": label,
    *childNodes() {
      const items: PartialNode<unknown>[] = [];
      React.Children.forEach(children, (child) => {
        items.push({
          type: "item",
          element: child,
        });
      });

      yield* items;
    },
  };
}

const _RichSelectOptGroup = forwardRef<HTMLDivElement, RichSelectOptGroupProps>(
  RichSelectOptGroup,
);

// ensure component works with react-aria-components Collections
export default Object.assign(_RichSelectOptGroup, { getCollectionNode });
