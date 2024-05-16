import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Shuffle = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="m22 6-4 4-1.5-1.5L18 7H4v5H2V5h16l-1.5-1.5L18 2zM6 22l1.5-1.5L6 19h16v-7h-2v5H6l1.5-1.5L6 14l-4 4z"
    color={color}
    size={size}
  />
));
Shuffle.displayName = "Shuffle";
export default Shuffle;
