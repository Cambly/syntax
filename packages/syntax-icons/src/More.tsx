import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const More = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M24 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM3 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
    color={color}
    size={size}
  />
));
More.displayName = "More";
export default More;
