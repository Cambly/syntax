import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const CameraOn = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="m20 6-4 4V5H2v14h14v-5l4 4h2V6z"
    color={color}
    size={size}
  />
));
CameraOn.displayName = "CameraOn";
export default CameraOn;
