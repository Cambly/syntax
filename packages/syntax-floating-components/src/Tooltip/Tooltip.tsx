import * as React from "react";
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
  FloatingArrow,
  arrow,
} from "@floating-ui/react";
import type { Placement, Strategy } from "@floating-ui/react";
import styles from "./Tooltip.module.css";

type TooltipOptions = {
  /**
   * How long a user hovers before tooltip shows (in ms)
   *
   * @defaultValue 0
   */
  delay?: number;
  /**
   * Whether an (uncontrolled) tooltip should open on load
   *
   * @defaultValue false
   */
  initialOpen?: boolean;
  /**
   * Value of 'open' state of the tooltip content if controlled
   */
  open?: boolean;
  /**
   * Function to set value of 'open' state of the tooltip content if controlled (setOpen)
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Location of the tooltip content relative to anchor element
   *
   * @defaultValue "right"
   */
  placement?: Placement;
  /**
   * Placement strategy, either "fixed" or "absolute"
   *
   * @defaultValue "absolute"
   */
  strategy?: Strategy;
};

export function useTooltip({
  delay = 0,
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  placement = "right",
  strategy = "absolute",
}: TooltipOptions) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

  const arrowRef = React.useRef(null);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

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
  const role = useRole(context, { role: "tooltip" });

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

type ContextType = ReturnType<typeof useTooltip> | null;

const TooltipContext = React.createContext<ContextType>(null);

const useTooltipContext = () => {
  const context = React.useContext(TooltipContext);

  if (context == null) {
    throw new Error("Tooltip components must be wrapped in <Tooltip />");
  }

  return context;
};

export function Tooltip({
  children,
  ...options
}: { children: React.ReactNode } & TooltipOptions) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useTooltip(options);
  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  );
}

export const TooltipTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement>
>(function TooltipTrigger({ children, ...props }, propRef) {
  const context = useTooltipContext();
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
      "TooltipTrigger must be wrapped around a valid React element",
    );
  }
});

export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function TooltipContent(props, propRef) {
  const { context: floatingContext, ...context } = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!context.open) return null;

  return (
    <div
      {...context.getFloatingProps(props)}
      ref={ref}
      className={styles.tooltipContent}
      style={{
        ...context.floatingStyles,
      }}
    >
      {props.children}
      <FloatingArrow ref={context.arrowRef} context={floatingContext} />
    </div>
  );
});
