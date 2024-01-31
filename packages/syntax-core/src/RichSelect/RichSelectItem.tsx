import React, {
  forwardRef,
  type ReactElement,
  type ForwardedRef,
  createContext,
  useEffect,
  useContext,
} from "react";
import {
  ListBoxItem as ReactAriaListBoxItem,
  type ListBoxItemRenderProps,
} from "react-aria-components";
import styles from "./RichSelect.module.css";
import { useDisableKey, useSelectKey } from "./DisabledKeysProvider";
import { type Key, type OptionAria } from "react-aria";

export type RichSelectItemProps = {
  "data-testid"?: string;
  value: string;
  label: string;
  name?: string;
  disabled?: boolean;
  selected?: boolean;
  checked?: boolean;
  /** The children of the component. A function may be provided to alter the children based on component state. */
  children?:
    | string
    | ReactElement
    | ((values: ListBoxItemRenderProps) => ReactElement);
};

// TODO: rename to RichSelectItem (whole file)
export const RichSelectItemContext = createContext<{
  disableKey?: (key: Key, value: boolean) => void;
  selectKey?: (key: Key, value: boolean) => void;
}>({});

export default forwardRef<HTMLDivElement, RichSelectItemProps>(
  function RichSelectItem(
    props: RichSelectItemProps,
    ref: ForwardedRef<HTMLDivElement>,
  ): ReactElement {
    const {
      "data-testid": dataTestId,
      value,
      label,
      disabled = false,
      selected = false,
      checked = false,
      children,
    } = props;

    const { disableKey, selectKey } = useContext(RichSelectItemContext) || {};
    useEffect(
      () => disableKey?.(value, disabled),
      [disableKey, disabled, value],
    );
    useEffect(
      () => selectKey?.(value, selected || checked),
      [checked, selectKey, selected, value],
    );

    useDisableKey(value, disabled);
    useSelectKey(value, selected); // wait, does/did this work?
    return (
      <ReactAriaListBoxItem
        id={value}
        textValue={label}
        className={styles.listBoxItem}
        data-testid={dataTestId}
        ref={ref}
      >
        {children}
      </ReactAriaListBoxItem>
    );
  },
);
