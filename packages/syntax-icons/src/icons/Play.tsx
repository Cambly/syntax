import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Play = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path = "M6.8 3v18l14.4-9z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Play.displayName = "Play";
export default Play;
