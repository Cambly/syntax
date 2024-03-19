import * as React from "react";
import classNames from "classnames";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  arrow,
  size,
} from "@floating-ui/react";
import type { Side, Strategy, UseFloatingReturn } from "@floating-ui/react";

import styles from "./Popover.module.css";
import elevationStyles from "../../../syntax-core/src/elevation/elevation.module.css";
import { useTheme } from "../../../syntax-core/src/ThemeProvider/ThemeProvider";

type PopoverOptions = {
  /**
   * How long a user hovers before Popover shows (in ms)
   *
   * @defaultValue 0
   */
  delay?: number;
  /**
   * Whether an (uncontrolled) Popover should open on load
   *
   * @defaultValue false
   */
  initialOpen?: boolean;
  /**
   * Value of 'open' state of the Popover content if controlled
   */
  open?: boolean;
  /**
   * Function to set value of 'open' state to true if controlled
   */
  onOpen?: (open: boolean) => void;
  /**
   * Function to set value of 'open' state to false if controlled
   */
  onClose?: (close: boolean) => void;
  /**
   * Location of the Popover content relative to anchor element
   *
   * @defaultValue "right"
   */
  placement?: Side;
  /**
   * Placement strategy, either "fixed" or "absolute"
   *
   * @defaultValue "absolute"
   */
  strategy?: Strategy;
};

export function usePopover({
  delay = 0,
  initialOpen = false,
  open: controlledOpen,
  placement = "right",
  strategy = "absolute",
  onOpen = undefined,
  onClose = undefined,
}: PopoverOptions): UseFloatingReturn & {
  getReferenceProps: (
    userProps?: React.HTMLProps<Element> | undefined,
  ) => Record<string, unknown>;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined,
  ) => Record<string | number | symbol, unknown>;
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined,
  ) => Record<string | number | symbol, unknown>;
  arrowRef: React.MutableRefObject<null>;
  open: boolean;
  setOpen: (open: boolean) => void;
} {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

  const arrowRef = React.useRef(null);

  const open = controlledOpen ?? uncontrolledOpen;
  let setOpen: (open: boolean) => void;
  if (onOpen && controlledOpen == true) {
    setOpen = onOpen;
  } else if (onClose && controlledOpen == false) {
    setOpen = onClose;
  } else {
    setOpen = setUncontrolledOpen;
  }

  const data = useFloating({
    placement,
    strategy,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      shift({ padding: 4 }),
      arrow({ element: arrowRef }),
      size({
        apply({ availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
          });
        },
      }),
    ],
  });

  const context = data.context;

  const hover = useHover(context, {
    move: false,
    enabled: controlledOpen == null,
    delay,
  });
  const focus = useFocus(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "dialog" });

  const interactions = useInteractions([hover, focus, dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      arrowRef,
    }),
    [open, setOpen, interactions, data],
  );
}

const PopoverContext = React.createContext<ReturnType<
  typeof usePopover
> | null>(null);

const usePopoverContext = () => {
  const context = React.useContext(PopoverContext);

  if (context == null) {
    throw new Error("Popover components must be wrapped in <Popover />");
  }

  return context;
};

/**
 * [Popover](https://cambly-syntax.vercel.app/?path=/docs/floating-components-Popover--docs) is a floating component that can be filled with anything.
 *
 * Most likely will be using the controlled variation for showing/hiding components. For detailed implementation details, see `See Code` in `Controlled Popover`.
 *
 * Popover content takes in props of width and maxWidth so you can control what size you want it to be.
 * Padding is set to `28px`
 * Would recommend passing in a `Box` component into PopoverContent to control spacing and positioning.
 *
 * Example Usage:
 ```
<Popover
  delay={0}
  placement="bottom"
  initialOpen
  strategy="absolute"
>
  <PopoverTrigger>
    <IconButton />
  </PopoverTrigger>
  <PopoverContent maxWidth="500px" width="100%">
    <Box>
      // content goes here
    </Box>
  </PopoverContent>
</Popover/>
 ```
 */
export function Popover({
  children,
  ...options
}: { children: React.ReactNode } & PopoverOptions): JSX.Element {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const popover = usePopover(options);
  return (
    <PopoverContext.Provider value={popover}>
      {children}
    </PopoverContext.Provider>
  );
}

export const PopoverTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement>
>(function PopoverTrigger({ children, ...props }, propRef) {
  const context = usePopoverContext();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([
    context.refs.setReference,
    propRef,
    childrenRef,
  ] as React.Ref<unknown>[]);

  if (React.isValidElement(children)) {
    return React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        "data-state": context.open ? "open" : "closed",
      } as React.HTMLProps<Element> | undefined),
    );
  } else {
    throw new Error(
      "PopoverTrigger must be wrapped around a valid React element",
    );
  }
});

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement> & {
    maxWidth?: string | number;
    width?: string | number;
  }
>(function PopoverContent(props, propRef) {
  const { ...context } = usePopoverContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);
  const { themeName } = useTheme();

  if (!context.open) return null;

  return (
    <div
      {...context.getFloatingProps(props)}
      ref={ref}
      className={classNames(
        themeName === "classic"
          ? styles.popoverContent
          : styles.popoverContentCambio,
        elevationStyles.elevation400BoxShadow,
      )}
      style={{
        ...context.floatingStyles,
        width: props.width,
        maxWidth: props.maxWidth,
      }}
    >
      {props.children}
    </div>
  );
});
