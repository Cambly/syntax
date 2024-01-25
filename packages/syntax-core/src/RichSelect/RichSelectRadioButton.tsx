import React, { forwardRef, type ReactElement } from "react";
import RichSelectListItem, {
  getCollectionNode,
  type RichSelectListItemProps,
} from "./RichSelectListItem";
import RadioButton from "../RadioButton/RadioButton";

type RichSelectRadioButtonProps = RichSelectListItemProps & {
  name: string;
  size?: "sm" | "md";
};
function RichSelectRadioButton({
  size = "sm",
  name,
  ...props
}: RichSelectRadioButtonProps): ReactElement {
  return (
    <RichSelectListItem {...props}>
      {({ isSelected, isFocusVisible, isDisabled }) => (
        <RadioButton
          checked={isSelected}
          disabled={isDisabled}
          name={name}
          label={props.label}
          value={props.value}
          dangerouslyForceFocusStyles={isFocusVisible}
          onChange={() => undefined}
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
