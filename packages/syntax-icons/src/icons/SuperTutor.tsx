import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const SuperTutor = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M17.833 4 18 2H6l.167 2H2l1 9h3.917L7 14l2 2h2v3H9l-2 3h10l-2-3h-2v-3h2l2-2 .083-1H21l1-9zM4.778 11l-.556-5h2.111l.417 5zm12.472 0 .417-5h2.11l-.555 5z"
    color={color}
    size={size}
  />
));
SuperTutor.displayName = "SuperTutor";
export default SuperTutor;
