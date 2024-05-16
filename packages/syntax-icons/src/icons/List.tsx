import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const List = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M22 8H8V4h14zM6 4H2v4h4zm16 6H8v4h14zM6 10H2v4h4zm16 6H8v4h14zM6 16H2v4h4z"
    color={color}
    size={size}
  />
));
List.displayName = "List";
export default List;
