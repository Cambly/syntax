import { type SyntheticEvent, useEffect } from "react";

const createSyntheticEvent = <T extends Element, E extends Event>(
  event: E,
): SyntheticEvent<T, E> => {
  let isDefaultPrevented = false;
  let isPropagationStopped = false;
  const preventDefault = () => {
    isDefaultPrevented = true;
    event.preventDefault();
  };
  const stopPropagation = () => {
    isPropagationStopped = true;
    event.stopPropagation();
  };
  return {
    nativeEvent: event,
    currentTarget: event.currentTarget as EventTarget & T,
    target: event.target as EventTarget & T,
    bubbles: event.bubbles,
    cancelable: event.cancelable,
    defaultPrevented: event.defaultPrevented,
    eventPhase: event.eventPhase,
    isTrusted: event.isTrusted,
    preventDefault,
    isDefaultPrevented: () => isDefaultPrevented,
    stopPropagation,
    isPropagationStopped: () => isPropagationStopped,
    persist: () => undefined,
    timeStamp: event.timeStamp,
    type: event.type,
  };
};

export const useDomRefSyntheticEventBridge = <T extends Element>(
  props: Record<string, unknown>,
  ref: React.RefObject<T>,
  { enabled = true }: { enabled?: boolean } = {},
): void => {
  useEffect(() => {
    if (!enabled) return () => undefined;
    if (!ref.current) return () => undefined;
    const element = ref.current;

    const cleanups = Object.entries(props).map<(() => void) | undefined>(
      ([key, value]) => {
        if (!key.startsWith("on")) return;
        if (typeof value !== "function") return;
        const endsWithCapture = key.endsWith("Capture");
        const eventname = key
          .slice(2, endsWithCapture ? -7 : undefined)
          .toLowerCase();

        const handler = (evt: Event) => {
          const fn = value as (event: SyntheticEvent) => void;
          fn(createSyntheticEvent(evt));
        };

        const args: [
          eventname: string,
          handler: EventListenerOrEventListenerObject,
          useCapture?: boolean,
        ] = [eventname, handler, endsWithCapture];
        element.addEventListener(...args);
        return () => element.removeEventListener(...args);
      },
    );

    return () => cleanups.forEach((cleanup) => cleanup?.());
  }, [enabled, props, ref]);
};
