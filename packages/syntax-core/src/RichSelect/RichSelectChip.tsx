import React, { type ForwardedRef, forwardRef, type ReactElement } from "react";
import Chip from "../Chip/Chip";
import RichSelectListItem, {
  getCollectionNode,
  type RichSelectListItemProps,
} from "./RichSelectListItem";

type RichSelectChipProps = RichSelectListItemProps;

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
}

const _RichSelectChip = forwardRef<HTMLDivElement, RichSelectChipProps>(
  RichSelectChip,
);

// ensure component works with react-aria-components Collections
export default Object.assign(_RichSelectChip, { getCollectionNode });
