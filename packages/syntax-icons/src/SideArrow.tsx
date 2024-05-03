import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const SideArrow = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M13.8 1.8 12 3.6l7.2 7.2H0v2.4h19.2L12 20.4l1.8 1.8L24 12 13.8 1.8Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
SideArrow.displayName = "SideArrow";
export default SideArrow;
