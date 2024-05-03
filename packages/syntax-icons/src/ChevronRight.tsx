import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const ChevronRight = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="m7.2 24-1.8-1.8L15.6 12 5.4 1.8 7.2 0l12 12-12 12Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
ChevronRight.displayName = "ChevronRight";
export default ChevronRight;
