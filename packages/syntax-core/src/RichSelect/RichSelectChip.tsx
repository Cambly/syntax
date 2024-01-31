import React, { type ForwardedRef, forwardRef, type ReactElement } from "react";
import Chip from "../Chip/Chip";
import RichSelectItem, { type RichSelectItemProps } from "./RichSelectItem";

type RichSelectChipProps = RichSelectItemProps;

export default forwardRef<HTMLDivElement, RichSelectChipProps>(
  function RichSelectChip(
    props: RichSelectChipProps,
    ref: ForwardedRef<HTMLDivElement>,
  ): ReactElement {
    return (
      <RichSelectItem {...props} ref={ref}>
        {({ isSelected, isFocusVisible, isDisabled }) => (
          <Chip
            text={props.label}
            selected={isSelected}
            disabled={isDisabled}
            dangerouslyForceFocusStyles={isFocusVisible}
            onChange={() => undefined}
          />
        )}
      </RichSelectItem>
    );
  },
);
