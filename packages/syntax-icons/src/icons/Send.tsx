import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const Send = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M21.6 0 0 8.4V12l7.2 3 6.6-6.6 1.8 1.8L9 16.8l3 7.2h3.6L24 2.4 21.6 0Z"
    color={color}
    size={size}
  />
));
Send.displayName = "Send";
export default Send;
