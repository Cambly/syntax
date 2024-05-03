import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const Eye = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M12 8.4c1.989 0 3.6 1.611 3.6 3.6s-1.611 3.6-3.6 3.6A3.599 3.599 0 0 1 8.4 12c0-1.989 1.611-3.6 3.6-3.6Zm0-6C4.8 2.4 0 9.6 0 9.6v4.8s4.8 7.2 12 7.2 12-7.2 12-7.2V9.6s-4.8-7.2-12-7.2ZM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
Eye.displayName = "Eye";
export default Eye;
