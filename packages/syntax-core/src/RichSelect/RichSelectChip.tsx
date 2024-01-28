import React, {
  type ForwardedRef,
  forwardRef,
  type ReactElement,
  useContext,
} from "react";
import Chip from "../Chip/Chip";
import RichSelectListItem, {
  RichSelectItemContext,
  getCollectionNode,
  type RichSelectListItemProps,
} from "./RichSelectListItem";
import { type PartialNode } from "@react-stately/collections";

type RichSelectChipProps = RichSelectListItemProps;

function RichSelectChip(
  props: RichSelectChipProps,
  ref: ForwardedRef<HTMLDivElement>,
): ReactElement {
  const { isFocusVisible, isFocused, isDisabled, isSelected, ...ctx } =
    useContext(RichSelectItemContext) ?? {};
  // console.log("render RichSelectChip", ctx);
  return (
    <Chip
      text={props.label || ctxProps?.label || ""}
      selected={isSelected}
      disabled={isDisabled}
      // dangerouslyForceFocusStyles={isFocused || isFocusVisible}
      dangerouslyForceFocusStyles={isFocusVisible}
      onChange={() => undefined}
    />
  );
  return (
    <RichSelectListItem {...props} ref={ref}>
      {/* {({ isSelected, isFocusVisible, isDisabled }) => ( */}
      <Chip
        text={props.label}
        // selected={isSelected}
        // disabled={isDisabled}
        // dangerouslyForceFocusStyles={isFocusVisible}
        onChange={() => undefined}
      />
      {/* )} */}
    </RichSelectListItem>
  );
  // return (
  //   <RichSelectListItem {...props} ref={ref}>
  //     {({ isSelected, isFocusVisible, isDisabled }) => (
  //       <Chip
  //         text={props.label}
  //         selected={isSelected}
  //         disabled={isDisabled}
  //         dangerouslyForceFocusStyles={isFocusVisible}
  //         onChange={() => undefined}
  //       />
  //     )}
  //   </RichSelectListItem>
  // );
}

const _RichSelectChip = forwardRef<HTMLDivElement, RichSelectChipProps>(
  RichSelectChip,
);

// ensure component works with react-aria-components Collections
export default Object.assign(_RichSelectChip, {
  getCollectionNode,
  // getCollectionNode: function* getCollectionNode(
  //   props: RichSelectChipProps,
  // ): Generator<PartialNode<RichSelectChipProps>> {
  //   const { children, label, value } = props;
  //   const textValue =
  //     label || (typeof children === "string" ? children : "") || "";
  //   // yield {
  //   //   type: "item",
  //   //   props: props,
  //   //   rendered: typeof children === "function" ? undefined : children,
  //   //   renderer: typeof children === "function" ? children : undefined,
  //   //   textValue,
  //   //   "aria-label": label,
  //   //   key: value,
  //   //   hasChildNodes: false,
  //   // };
  //   yield {
  //     type: "item",
  //     props: props,
  //     // renderer: () => <RichSelectChip {...props} />,
  //     rendered: <this.render {...props} />,
  //     // rendered: (
  //     //   <Chip
  //     //     text={props.label}
  //     //     // selected={isSelected}
  //     //     // disabled={isDisabled}
  //     //     // dangerouslyForceFocusStyles={isFocusVisible}
  //     //     onChange={() => undefined}
  //     //   />
  //     // ),
  //     // rendered: typeof children === "function" ? undefined : children,
  //     // renderer: typeof children === "function" ? children : undefined,
  //     // rendered: children,
  //     textValue,
  //     "aria-label": label,
  //     key: value,
  //     hasChildNodes: false,
  //     // shouldInvalidate(context) {
  //     //   console.log("shouldInvalidate", context);
  //     //   return true;
  //     // },
  //   };
  // },
});
