import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const Graphs = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M14.4 24H9.6V0h4.8v24Zm7.2-18h-4.8v18h4.8V6ZM7.2 12H2.4v12h4.8V12Z"
    color={color}
    size={size}
  />
));
Graphs.displayName = "Graphs";
export default Graphs;
