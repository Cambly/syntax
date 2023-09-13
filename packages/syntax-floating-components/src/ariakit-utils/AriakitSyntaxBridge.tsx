import {
  forwardRef,
  type HTMLAttributes,
  type ReactElement,
  useRef,
  cloneElement,
  useEffect,
  useState,
  type SyntheticEvent,
} from "react";
import { getFirstTabbableIn } from "@ariakit/core/utils/focus";
import { useMergeRefs } from "@floating-ui/react";
import { Focusable } from "@ariakit/react";

export const createSyntheticEvent = <T extends Element, E extends Event>(
  event: E,
): React.SyntheticEvent<T, E> => {
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
const AriakitSyntaxBridge = forwardRef<
  HTMLDivElement,
  Omit<HTMLAttributes<HTMLDivElement>, "children"> & { children?: ReactElement }
>(function AriakitSyntaxBridge(
  { children, ...props },
  ref,
): ReactElement | undefined {
  const tabbableRef = useRef<HTMLElement | null>(null);
  const cloneRef = useMergeRefs([tabbableRef, ref]);
  const clone = children && cloneElement(children, { ...props, ref: cloneRef });
  const [focusableChild, setFocusableChild] = useState<HTMLElement | null>(
    null,
  );
  useEffect(
    () =>
      setFocusableChild(
        tabbableRef.current &&
          getFirstTabbableIn(tabbableRef.current, true, true),
      ),
    [cloneRef],
  );
  // console.log("ArkitSyntaxBridge", { focusableChild, props, cloneRef });
  // useEffect(() => {
  //   return () => undefined;
  //   if (!focusableChild) return () => undefined;

  //   const cleanups = Object.entries(props).map<(() => void) | undefined>(
  //     ([key, value]) => {
  //       if (!key.startsWith("on")) return;
  //       if (typeof value !== "function") return;
  //       const endsWithCapture = key.endsWith("Capture");
  //       const eventname = key
  //         .slice(2, endsWithCapture ? -7 : undefined)
  //         .toLowerCase();

  //       const handler = (evt: Event) => {
  //         const fn = value as (event: SyntheticEvent) => void;
  //         fn(createSyntheticEvent(evt));
  //       };

  //       const args: [
  //         eventname: string,
  //         handler: EventListenerOrEventListenerObject,
  //         useCapture?: boolean,
  //       ] = [eventname, handler, endsWithCapture];
  //       focusableChild.addEventListener(...args);
  //       return () => focusableChild.removeEventListener(...args);
  //     },
  //   );

  //   return () => cleanups.forEach((cleanup) => cleanup?.());
  // }, [focusableChild, props]);

  if (focusableChild) return clone;
  return <Focusable {...props}>{clone}</Focusable>;

  return clone;
});

export default AriakitSyntaxBridge;
