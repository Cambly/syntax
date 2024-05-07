import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const Type = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M22.893 7.626A4.274 4.274 0 0 0 19.5 6c-1.284 0-2.46.489-3.31 1.376-.756.79-1.19 1.82-1.19 2.824h2.4c0-.628.616-1.8 2.1-1.8.621 0 1.133.245 1.521.729A2.75 2.75 0 0 1 21.6 10.8v.69c-.931 0-2.19.055-3.6.3-2.4.417-3.6 1.87-3.6 3.81s1.254 3.6 3.6 3.6 3.237-.842 3.6-1.2v1.2H24v-8.4c0-1.14-.404-2.297-1.107-3.174Zm-4.203 9.426c-.788 0-1.29-.658-1.29-1.311 0-.49.106-1.346 1.2-1.821.885-.384 2.234-.36 3-.36V15c-.286 1.107-1.294 2.052-2.91 2.052ZM7.8 3.6H5.4L0 19.2h2.4l1.68-4.8h5.04l1.68 4.8h2.4L7.8 3.6ZM4.92 12 6.6 7.2 8.28 12H4.92Z"
    color={color}
    size={size}
  />
));
Type.displayName = "Type";
export default Type;
