import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const Leaf = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M20.4 14.4C15.727 12.877 9.86 11.06 6 7.2L7.2 6c3.55 3.55 10.638 4.788 14.347 4.8.034-.369.053-.768.053-1.2 0-4.206-3.6-8.4-9.6-8.4H0V6c0 6 4.112 13.2 12 13.2 3.924 0 6.6-1.8 6.6-1.8 1.477.58 1.8 2.28 1.8 5.4H24c0-5.54-1.2-7.212-3.6-8.4Z"
    color={color}
    size={size}
  />
));
Leaf.displayName = "Leaf";
export default Leaf;
