import React, { forwardRef, type ReactElement } from "react";
import RichSelectListItem, {
  type RichSelectListItemProps,
} from "./RichSelectListItem";
import RadioButton from "../RadioButton/RadioButton";

const RichSelectRadioButton = forwardRef<
  HTMLDivElement,
  RichSelectListItemProps & {
    name: string;
    size?: "sm" | "md";
  }
>(function RichSelectRadioButton(
  { size = "sm", name, ...props },
  ref,
): ReactElement {
  return (
    <RichSelectListItem {...props} ref={ref}>
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
});

export default RichSelectRadioButton;
