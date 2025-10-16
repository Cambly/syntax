import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Face = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path = "#050500";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Face.displayName = "Face";
export default Face;
