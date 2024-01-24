import React, { forwardRef, type ReactElement } from "react";
import Chip from "../Chip/Chip";
import RichSelectListItem, {
  type RichSelectListItemProps,
} from "./RichSelectListItem";

const RichSelectChip = forwardRef<HTMLDivElement, RichSelectListItemProps>(
  function RichSelectChip(props, ref): ReactElement {
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

export default RichSelectChip;
