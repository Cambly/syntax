import React, { type ForwardedRef, forwardRef, type ReactElement } from "react";
import Chip from "../Chip/Chip";
import RichSelectListItem, {
  type RichSelectListItemProps,
} from "./RichSelectListItem";

type RichSelectChipProps = RichSelectListItemProps;

export default forwardRef<HTMLDivElement, RichSelectChipProps>(
  function RichSelectChip(
    props: RichSelectChipProps,
    ref: ForwardedRef<HTMLDivElement>,
  ): ReactElement {
    return (
      <RichSelectListItem {...props} ref={ref}>
        {({ isSelected, isFocusVisible, isDisabled }) => (
          <Chip
            text={props.label}
            selected={isSelected}
            disabled={isDisabled}
            dangerouslyForceFocusStyles={isFocusVisible}
            onChange={() => undefined}
          />
        )}
      </RichSelectListItem>
    );
  },
);
