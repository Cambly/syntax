import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Speaker = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M14 20.725v-2.05q2.25-.65 3.625-2.5t1.375-4.2-1.375-4.2C16.25 5.925 15.5 5.708 14 5.275v-2.05q3.1.7 5.05 3.138T21 11.975c0 3.175-.65 3.988-1.95 5.613Q17.1 20.025 14 20.725M3 15V9h4l5-5v16l-5-5zm11 1V7.95a4.15 4.15 0 0 1 1.838 1.65A4.57 4.57 0 0 1 16.5 12q0 1.275-.662 2.363A4.17 4.17 0 0 1 14 16";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Speaker.displayName = "Speaker";
export default Speaker;
