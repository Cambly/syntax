import React, { type ForwardedRef, forwardRef, type ReactElement } from "react";
import RichSelectListItem, {
  getCollectionNode,
  type RichSelectListItemProps,
} from "./RichSelectListItem";
import RadioButton from "../RadioButton/RadioButton";

type RichSelectRadioButtonProps = RichSelectListItemProps & {
  name: string;
  size?: "sm" | "md";
};
function RichSelectRadioButton(
  props: RichSelectRadioButtonProps,
  ref: ForwardedRef<HTMLDivElement>,
): ReactElement {
  const { size = "sm", name, ...otherProps } = props;
  return (
    <RichSelectListItem {...otherProps} ref={ref}>
      {({ isSelected, isFocusVisible, isDisabled }) => (
        <RadioButton
          checked={isSelected}
          disabled={isDisabled}
          name={name}
          label={otherProps.label}
          value={otherProps.value}
          dangerouslyForceFocusStyles={isFocusVisible}
          onChange={(e) =>
            console.log("RichSelectRadioButton onChange", e.target.value)
          }
          size={size}
        />
      )}
    </RichSelectListItem>
  );
}

const _RichSelectRadioButton = forwardRef<
  HTMLDivElement,
  RichSelectRadioButtonProps
>(RichSelectRadioButton);

// ensure component works with react-aria-components Collections
export default Object.assign(_RichSelectRadioButton, { getCollectionNode });
