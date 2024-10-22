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
  size,
  FloatingPortal,
} from "@floating-ui/react";
import type { Side, Strategy, UseFloatingReturn } from "@floating-ui/react";
import Typography from "../../../syntax-core/src/Typography/Typography";
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
   * Function to set value of 'open' state to true if controlled
   */
  onOpen?: (open: boolean) => void;
  /**
   * Function to set value of 'open' state to false if controlled
   */
  onClose?: (close: boolean) => void;
  /**
   * Location of the tooltip content relative to anchor element
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
  /**
   * The z-index of the tooltip
   *
   * @defaultValue 0
   */
  zIndex?: number;
};

function useTooltip({
  delay = 0,
  initialOpen = false,
  open: controlledOpen,
  placement = "right",
  strategy = "absolute",
  onOpen = undefined,
  onClose = undefined,
  zIndex = 0,
}: TooltipOptions): UseFloatingReturn & {
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
  zIndex: number;
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
            maxWidth: `240px`,
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
  const role = useRole(context, { role: "tooltip" });

  const interactions = useInteractions([hover, focus, dismiss, role]);

  return React.useMemo(
    () => ({
      zIndex,
      open,
      setOpen,
      ...interactions,
      ...data,
      arrowRef,
    }),
    [zIndex, open, setOpen, interactions, data],
  );
}

const TooltipContext = React.createContext<ReturnType<
  typeof useTooltip
> | null>(null);

const useTooltipContext = () => {
  const context = React.useContext(TooltipContext);

  if (context == null) {
    throw new Error("Tooltip components must be wrapped in <Tooltip />");
  }

  return context;
};

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function TooltipContent(props, propRef) {
  const { zIndex, context: floatingContext, ...context } = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!context.open) return null;

  return (
    <FloatingPortal>
      <div
        {...context.getFloatingProps(props)}
        ref={ref}
        className={styles.tooltipContent}
        style={{
          ...context.floatingStyles,
          zIndex,
        }}
      >
        <Typography size={100} color="white">
          {props.children}
        </Typography>
        <FloatingArrow ref={context.arrowRef} context={floatingContext} />
      </div>
    </FloatingPortal>
  );
});

const TooltipTrigger = React.forwardRef<
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

/**
 * [Tooltip](https://cambly-syntax.vercel.app/?path=/docs/floating-components-tooltip--docs) displays contextual information on hover or focus.
 *
 *
 * Usage:
 * ```tsx
 * <Tooltip content="This is a tooltip">
 *   <IconButton />
 * </Tooltip>
 * ```
 */
export function Tooltip({
  children,
  content,
  ...options
}: {
  children: React.ReactNode;
  zIndex?: number;
  content: string;
} & TooltipOptions): JSX.Element {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useTooltip(options);

  const value = React.useMemo(() => {
    return {
      ...tooltip,
    };
  }, [tooltip]);

  return (
    <TooltipContext.Provider value={value}>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </TooltipContext.Provider>
  );
}
