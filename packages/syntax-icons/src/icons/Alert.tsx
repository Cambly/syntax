import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const Alert = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M13.8 2.4h-3.6L0 19.2l1.2 2.4h21.6l1.2-2.4L13.8 2.4Zm-3 3.6h2.4v7.2h-2.4V6ZM12 19.2a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6Z"
    color={color}
    size={size}
  />
));
Alert.displayName = "Alert";
export default Alert;
