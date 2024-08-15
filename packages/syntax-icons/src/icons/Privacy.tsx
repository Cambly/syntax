import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Privacy = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path = "#fff";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Privacy.displayName = "Privacy";
export default Privacy;
