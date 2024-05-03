import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const Play = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M2.4 0v24l19.2-12L2.4 0Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
Play.displayName = "Play";
export default Play;
