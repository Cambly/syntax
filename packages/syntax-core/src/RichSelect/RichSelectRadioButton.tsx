import React, { forwardRef, type ReactElement } from "react";
import RichSelectItem, { type RichSelectItemProps } from "./RichSelectItem";
import RadioButton from "../RadioButton/RadioButton";

const NOOP = () => undefined;

type RichSelectRadioButtonProps = RichSelectItemProps & {
  name: string;
  size?: "sm" | "md";
};

export default forwardRef<HTMLDivElement, RichSelectRadioButtonProps>(
  function RichSelectRadioButton(props, ref): ReactElement {
    const { size = "sm", name, ...otherProps } = props;
    return (
      <RichSelectItem {...otherProps} ref={ref}>
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
      </RichSelectItem>
    );
  },
);
