import React, {
  forwardRef,
  type ReactElement,
  type ForwardedRef,
  createContext,
} from "react";
import {
  ListBoxItem as ReactAriaListBoxItem,
  type ListBoxItemRenderProps,
} from "react-aria-components";
import { type PartialNode, Item } from "@react-stately/collections";
import styles from "./RichSelect.module.css";
import { useDisableKey, useSelectKey } from "./DisabledKeysProvider";
import { type OptionAria } from "react-aria";

export type RichSelectListItemProps = {
  "data-testid"?: string;
  value: string;
  label: string;
  name?: string;
  disabled?: boolean;
  selected?: boolean;
  /** The children of the component. A function may be provided to alter the children based on component state. */
  children?:
    | string
    | ReactElement
    | ((values: ListBoxItemRenderProps) => ReactElement);
};

// TODO: rename to RichSelectItem (whole file)
export const RichSelectItemContext = createContext<OptionAria | null>(null);

function RichSelectListItem(
  props: RichSelectListItemProps,
  ref: ForwardedRef<HTMLDivElement>,
): ReactElement {
  const {
    "data-testid": dataTestId,
    value,
    label,
    disabled = false,
    selected = false,
    children,
  } = props;
  useDisableKey(value, disabled);
  useSelectKey(value, selected); // wait, does/did this work?
  return (
    <Item
      id={value}
      textValue={label}
      className={styles.listBoxItem}
      data-testid={dataTestId}
      ref={ref}
    >
      {children}
    </Item>
  );
  // return (
  //   <ReactAriaListBoxItem
  //     id={value}
  //     textValue={label}
  //     className={styles.listBoxItem}
  //     data-testid={dataTestId}
  //     ref={ref}
  //   >
  //     {children}
  //   </ReactAriaListBoxItem>
  // );
}

// ensure component works with react-aria-components Collections
export function* getCollectionNode(
  props: RichSelectListItemProps,
): Generator<PartialNode<ListBoxItemRenderProps>> {
  const { children, label, value } = props;
  const textValue =
    label || (typeof children === "string" ? children : "") || "";
  // yield {
  //   type: "item",
  //   props: props,
  //   rendered: typeof children === "function" ? undefined : children,
  //   renderer: typeof children === "function" ? children : undefined,
  //   textValue,
  //   "aria-label": label,
  //   key: value,
  //   hasChildNodes: false,
  // };
  yield {
    type: "item",
    props: props,
    rendered: <this.render {...props} />,

    // rendered: typeof children === "function" ? undefined : children,
    // renderer: typeof children === "function" ? children : undefined,
    // rendered: children,
    textValue,
    "aria-label": label,
    key: value,
    hasChildNodes: false,
  };
}

const _RichSelectListItem = forwardRef<HTMLDivElement, RichSelectListItemProps>(
  RichSelectListItem,
);

// ensure component works with react-aria-components Collections
export default Object.assign(_RichSelectListItem, {
  getCollectionNode,
});
