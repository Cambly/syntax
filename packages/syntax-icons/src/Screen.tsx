import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const Screen = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M24 1.2H0V18h9.6l-2.4 2.4v2.4h9.6v-2.4L14.4 18H24V1.2Zm-2.4 14.4H2.4v-12h19.2v12Z"
    color={color}
    size={size}
  />
));
Screen.displayName = "Screen";
export default Screen;
