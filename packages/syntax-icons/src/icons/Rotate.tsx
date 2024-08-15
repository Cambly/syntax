import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Rotate = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M5.025 13.8a7.16 7.16 0 0 0 1.884 3.291A7.15 7.15 0 0 0 12 19.2a7.15 7.15 0 0 0 5.091-2.109A7.15 7.15 0 0 0 19.2 12a7.15 7.15 0 0 0-2.109-5.091A7.15 7.15 0 0 0 12 4.8a7.15 7.15 0 0 0-5.091 2.109A7.2 7.2 0 0 0 5.768 8.4H8.4v1.8H3V4.8h1.8v1.8A8.97 8.97 0 0 1 12 3a8.97 8.97 0 0 1 6.364 2.636A8.97 8.97 0 0 1 21 12a8.97 8.97 0 0 1-2.636 6.364A8.97 8.97 0 0 1 12 21a8.97 8.97 0 0 1-6.364-2.636A8.97 8.97 0 0 1 3.18 13.8z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Rotate.displayName = "Rotate";
export default Rotate;
