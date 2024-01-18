import React, {
  forwardRef,
  type ReactElement,
  type Ref,
  type RefAttributes,
} from "react";
import { mergeProps, useButton, useFocusable, useHover } from "react-aria";
import { useObjectRef, mergeRefs } from "@react-aria/utils";
import { useHasTabbableChild } from "@react-aria/focus";
import { useDomRefSyntheticEventBridge } from "./useDomRefSyntheticEventBridge";
import styles from "./Triggerable.module.css";

type ReactElementWithRef<T = unknown> = ReactElement & RefAttributes<T>;
function cloneWithRef<T>(children: ReactElementWithRef<T>, parentRef: Ref<T>) {
  // No need for the isValidElement check since children is already typed as a ReactElement
  return React.cloneElement(children, {
    ref: children.ref ? mergeRefs<T>(parentRef, children.ref) : parentRef,
  });
}

const Triggerable = forwardRef<
  HTMLSpanElement,
  { children?: ReactElement | (ReactElement & { ref?: Ref<Element> }) }
>(function Triggerable(props, forwardedRef) {
  const { children } = props;
  const wrapperDomRef = useObjectRef(forwardedRef);
  const childRef = useObjectRef<HTMLElement>(null);
  const hasTabbableChild = useHasTabbableChild(wrapperDomRef);
  const focusableRef = hasTabbableChild ? childRef : wrapperDomRef;
  const WrapperComponent = "span";
  const { focusableProps } = useFocusable({}, focusableRef);
  const elementType = WrapperComponent;
  const { buttonProps } = useButton({ elementType }, focusableRef);
  const { hoverProps } = useHover({});
  // focus handlers are attached to tabbable child if present
  const { onFocus, onBlur, onKeyDown, onKeyUp, ...otherFocusableProps } =
    focusableProps;
  const focusableHandlerProps = { onFocus, onBlur, onKeyDown, onKeyUp };
  // attach focus handlers to tabbable child if present
  const child = children ? cloneWithRef(children, childRef) : children;
  useDomRefSyntheticEventBridge(focusableHandlerProps, childRef, {
    enabled: hasTabbableChild,
  });

  return (
    <WrapperComponent
      ref={wrapperDomRef}
      {...mergeProps(
        buttonProps,
        hasTabbableChild ? {} : focusableHandlerProps,
        otherFocusableProps,
        hoverProps,
        {
          className: styles.trigger,
          style: {
            display: "inline-block",
            verticalAlign: "text-top",
          },
        },
      )}
      tabIndex={hasTabbableChild ? undefined : 0}
    >
      {child}
    </WrapperComponent>
  );
});

export default Triggerable;
