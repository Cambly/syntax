import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const Stars = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="m24 15-7.2 1.8L15 24h-2.4l-1.8-7.2L3.6 15v-2.4l7.2-1.8 1.8-7.2H15l1.8 7.2 7.2 1.8V15ZM9.6 4.2 6.6 3 5.4 0H4.2L3 3 0 4.2v1.2l3 1.2 1.2 3h1.2l1.2-3 3-1.2V4.2Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
Stars.displayName = "Stars";
export default Stars;
