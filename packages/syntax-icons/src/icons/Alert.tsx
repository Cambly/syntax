import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Alert = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M13.5 4h-3L2 18l1 2h18l1-2zM11 7h2v6h-2zm1 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"
    color={color}
    size={size}
  />
));
Alert.displayName = "Alert";
export default Alert;
