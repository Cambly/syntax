import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const Bell = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M15.6 20.4a3.6 3.6 0 0 1-7.2 0h7.2Zm3.6-13.2c-.612-2.693-2.731-3.884-4.8-4.8L13.2 0h-2.4L9.6 2.4c-2.069.916-4.188 2.107-4.8 4.8-.519 2.283-.55 4.8-3.6 8.4L2.4 18h19.2l1.2-2.4c-3.05-3.6-3.08-6.117-3.6-8.4Z"
    color={color}
    size={size}
  />
));
Bell.displayName = "Bell";
export default Bell;
