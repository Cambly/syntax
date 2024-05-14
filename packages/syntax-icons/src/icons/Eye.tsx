import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Eye = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M12 9a3 3 0 1 1 0 6 3 3 0 1 1 0-6m0-5C6 4 2 10 2 10v4s4 6 10 6 10-6 10-6v-4s-4-6-10-6m0 13c-2.758 0-5-2.242-5-5s2.242-5 5-5 5 2.242 5 5-2.242 5-5 5"
    color={color}
    size={size}
  />
));
Eye.displayName = "Eye";
export default Eye;
