import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const More = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M24 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM3 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
More.displayName = "More";
export default More;
