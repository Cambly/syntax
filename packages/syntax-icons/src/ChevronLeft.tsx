import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const ChevronLeft = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="m16.8 0 1.8 1.8L8.4 12l10.2 10.2-1.8 1.8-12-12 12-12Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
ChevronLeft.displayName = "ChevronLeft";
export default ChevronLeft;
