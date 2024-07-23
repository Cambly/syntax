import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Leaf = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M19 14c-3.895-1.269-8.784-2.784-12-6l1-1c2.958 2.958 8.865 3.99 11.956 4q.043-.46.044-1c0-3.505-3-7-8-7H2v4c0 5 3.426 11 10 11 3.27 0 5.5-1.5 5.5-1.5 1.231.483 1.5 1.9 1.5 4.5h3c0-4.617-1-6.01-3-7";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Leaf.displayName = "Leaf";
export default Leaf;
