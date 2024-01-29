import React, { forwardRef, type ReactElement } from "react";
import RichSelectListItem, {
  type RichSelectListItemProps,
} from "./RichSelectListItem";
import RadioButton from "../RadioButton/RadioButton";

const NOOP = () => undefined;

type RichSelectRadioButtonProps = RichSelectListItemProps & {
  name: string;
  size?: "sm" | "md";
};

export default forwardRef<HTMLDivElement, RichSelectRadioButtonProps>(
  function RichSelectRadioButton(props, ref): ReactElement {
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
            size={size}
            onChange={NOOP}
          />
        )}
      </RichSelectListItem>
    );
  },
);
