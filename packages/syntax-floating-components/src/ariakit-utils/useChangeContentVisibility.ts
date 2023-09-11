import { useEffect, useState } from "react";
import { type DisclosureStore } from "@ariakit/react";

/**
 * Hook AriaKit - based floating components
 * Wires a handler to fire when visibility changes to an ariakit DisclosureStore store (tooltip, hovercard, popover, etc...)
 * Use for analytics and controlling open state externally
 */
export default function useChangeContentVisibility(
  store: DisclosureStore,
  onChangeContentVisibility?: (visible: boolean) => void,
): void {
  // when visibility changes, fire `onChangeContentVisibility`
  const { animating, open } = store.getState();
  const contentVisible = open ? !animating : animating;
  const [prevContentVisible, setPrevContentVisible] = useState(false);
  useEffect(() => setPrevContentVisible(contentVisible), [contentVisible]);
  useEffect(() => {
    if (contentVisible === prevContentVisible) return undefined;
    onChangeContentVisibility?.(contentVisible);
  }, [contentVisible, prevContentVisible, onChangeContentVisibility]);
  // prevent over-firing of `onChangeContentVisibility` handler
  // when `animated`, `open` turns true a tick before `animating` turns true
  const animated = store.useState("animated");
  // so use that to determine which bit gets subscribe to
  store.useState(animated ? "animating" : "open");
}
