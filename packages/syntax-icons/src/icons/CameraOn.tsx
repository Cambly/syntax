import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const CameraOn = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path = "m20 6-4 4V5H2v14h14v-5l4 4h2V6z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
CameraOn.displayName = "CameraOn";
export default CameraOn;
