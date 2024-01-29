/* TODO: rename to RichSelectSection */
import React, { type ForwardedRef, forwardRef, type ReactElement } from "react";
import {
  Section as ReactAriaSection,
  Header as ReactAriaHeader,
  Collection as ReactAriaCollection,
  type SectionProps as ReactAriaSectionProps,
} from "react-aria-components";
import classNames from "classnames";
import boxStyles from "../Box/Box.module.css";
import layoutStyles from "../layout.module.css";
import { type PartialNode } from "@react-stately/collections";

export type AriaListBoxSectionProps<T> = {
  title?: string;
} & ReactAriaSectionProps<T>;

export function AriaListBoxSection<T extends object>(
  props: AriaListBoxSectionProps<T>,
): ReactElement {
  // const { onChangeState, ...otherProps } = props;
  // const listState = useContext(ListStateContext);
  // console.log("listState", listState);

  return (
    <ReactAriaSection {...props}>
      <ReactAriaHeader>{props.title}</ReactAriaHeader>
      <ReactAriaCollection items={props.items}>
        {props.children}
      </ReactAriaCollection>
    </ReactAriaSection>
  );
}

type RichSelectOptGroupProps = {
  "data-testid"?: string;
  label: string;
  children: ReactElement | ReactElement[];
  orientation?: "horizontal" | "vertical";
};

export default forwardRef<HTMLDivElement, RichSelectOptGroupProps>(
  function RichSelectOptGroup(props, ref): ReactElement {
    const {
      "data-testid": dataTestId,
      label,
      children,
      orientation = "horizontal",
    } = props;

    return (
      <ReactAriaSection
        // <AriaListBoxSection
        ref={ref}
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
        {/* <ReactAriaCollection items={props.items}>
        {props.children}
      </ReactAriaCollection> */}
        {/* </AriaListBoxSection> */}
      </ReactAriaSection>
    );
  },
);
