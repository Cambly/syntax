import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const CameraOff = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M22 6v12L9 5h7v5l4-4zm0 14.5L3.5 2 2 3.5 20.5 22zM2 6v13h13z"
    color={color}
    size={size}
  />
));
CameraOff.displayName = "CameraOff";
export default CameraOff;
