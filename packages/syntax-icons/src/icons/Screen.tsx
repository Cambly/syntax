import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Screen = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M22 3H2v14h8l-2 2v2h8v-2l-2-2h8zm-2 12H4V5h16z"
    color={color}
    size={size}
  />
));
Screen.displayName = "Screen";
export default Screen;
