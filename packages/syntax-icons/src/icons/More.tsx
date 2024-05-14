import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const More = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M22 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m-7.5 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5"
    color={color}
    size={size}
  />
));
More.displayName = "More";
export default More;
