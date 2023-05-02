import * as React from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDelayGroupContext,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingArrow,
  arrow,
} from "@floating-ui/react";
import type { Placement, Strategy } from "@floating-ui/react";

interface TooltipOptions {
  initialOpen?: boolean;
  noRest?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: Placement;
  strategy?: Strategy;
}

export function useTooltip({
  initialOpen = false,
  noRest = true,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  placement = "right",
  strategy = "absolute",
}: TooltipOptions) {
  const { delay, isInstantPhase } = useDelayGroupContext();
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
      offset(4),
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
    restMs: isInstantPhase || noRest ? 0 : 150,
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

export const useTooltipContext = () => {
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
  React.HTMLProps<HTMLElement> & { asChild?: boolean }
>(function TooltipTrigger({ children, asChild = false, ...props }, propRef) {
  const context = useTooltipContext();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([
    context.refs.setReference,
    propRef,
    childrenRef,
  ] as React.Ref<unknown>[]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        "data-state": context.open ? "open" : "closed",
      } as React.HTMLProps<Element> | undefined),
    );
  }

  return (
    <button
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context.open ? "open" : "closed"}
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  );
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
      className={props.className}
      style={{
        ...context.floatingStyles,
        ...props.style,
      }}
    >
      {props.children}
      <FloatingArrow ref={context.arrowRef} context={floatingContext} />
    </div>
  );
});
