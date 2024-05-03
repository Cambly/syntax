import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const Pause = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M9.6 22.8H4.8V1.2h4.8v21.6Zm9.6-21.6h-4.8v21.6h4.8V1.2Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
Pause.displayName = "Pause";
export default Pause;
