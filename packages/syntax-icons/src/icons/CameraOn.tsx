import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const CameraOff = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="m21.6 4.8-4.8 4.8v-6H0v16.8h16.8v-6.001l4.8 4.801H24V4.8h-2.4Z"
    color={color}
    size={size}
  />
));
CameraOff.displayName = "CameraOff";
export default CameraOff;
