import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const ScreenOff = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M3.5 2 22 20.5 20.5 22 2 3.5zm17.475 15H22V3H6.975l2 2H20v10h-1.025zM4 7.975V15h7.025L16 19.975V21H8v-2l2-2H2V5.975z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
ScreenOff.displayName = "ScreenOff";
export default ScreenOff;
