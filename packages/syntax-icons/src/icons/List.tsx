import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const List = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M24 7.2H7.2V2.4H24v4.8ZM4.8 2.4H0v4.8h4.8V2.4ZM24 9.6H7.2v4.8H24V9.6Zm-19.2 0H0v4.8h4.8V9.6ZM24 16.8H7.2v4.8H24v-4.8Zm-19.2 0H0v4.8h4.8v-4.8Z"
    color={color}
    size={size}
  />
));
List.displayName = "List";
export default List;
