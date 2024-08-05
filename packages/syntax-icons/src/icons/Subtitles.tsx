import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Subtitles = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path = "M2 4v16h20V4zm3 7h4v2H5zm8 6H5v-2h8zm6 0h-4v-2h4zm0-4h-8v-2h8z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Subtitles.displayName = "Subtitles";
export default Subtitles;
