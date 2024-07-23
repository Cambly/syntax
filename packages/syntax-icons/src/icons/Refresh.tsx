import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Refresh = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M18.975 13.8a7.16 7.16 0 0 1-1.884 3.291A7.15 7.15 0 0 1 12 19.2a7.15 7.15 0 0 1-5.091-2.109A7.15 7.15 0 0 1 4.8 12c0-1.923.749-3.731 2.109-5.091A7.15 7.15 0 0 1 12 4.8c1.923 0 3.731.749 5.091 2.109.452.451.83.953 1.142 1.491H15.6v1.8H21V4.8h-1.8v1.8A8.97 8.97 0 0 0 12 3a8.97 8.97 0 0 0-6.364 2.636A8.97 8.97 0 0 0 3 12a8.97 8.97 0 0 0 2.636 6.364A8.97 8.97 0 0 0 12 21a8.97 8.97 0 0 0 6.364-2.636A8.97 8.97 0 0 0 20.82 13.8z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Refresh.displayName = "Refresh";
export default Refresh;
