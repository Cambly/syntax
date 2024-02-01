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
import { type Key } from "react-aria";
import useIsHydrated from "../useIsHydrated";

export type RichSelectItemProps = {
  "data-testid"?: string;
  value: string;
  label: string;
  name?: string;
  disabled?: boolean;
  /** The children of the component. A function may be provided to alter the children based on component state. */
  children?:
    | string
    | ReactElement
    | ((values: ListBoxItemRenderProps) => ReactElement);
};

export const RichSelectItemContext = createContext<{
  disableKey?: (key: Key, value: boolean) => void;
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
      disabled: disabledProp = false,
      children,
    } = props;
    const isHydrated = useIsHydrated();
    const disabled = !isHydrated || disabledProp;

    const { disableKey } = useContext(RichSelectItemContext);
    useEffect(
      () => disableKey?.(value, disabled),
      [disableKey, disabled, value],
    );
    return (
      <ReactAriaListBoxItem
        id={value}
        textValue={label}
        className={styles.richSelectItem}
        data-testid={dataTestId}
        ref={ref}
      >
        {children}
      </ReactAriaListBoxItem>
    );
  },
);
