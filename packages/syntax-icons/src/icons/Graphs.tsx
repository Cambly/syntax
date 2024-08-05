import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Graphs = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path = "M14 22h-4V2h4zm6-15h-4v15h4zM8 12H4v10h4z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Graphs.displayName = "Graphs";
export default Graphs;
