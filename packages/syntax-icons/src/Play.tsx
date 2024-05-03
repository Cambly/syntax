import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const Play = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon ref={ref} path="M2.4 0v24l19.2-12L2.4 0Z" color={color} size={size} />
));
Play.displayName = "Play";
export default Play;
