import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Bilibili = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M19 5.2h-2.7L18 3.5c.3-.3.3-.8 0-1.1s-.8-.3-1.1 0l-2.8 2.8H9.7L6.9 2.4c-.3-.3-.8-.3-1.1 0s-.3.8 0 1.1l1.7 1.7H4.8C2.7 5.2 1 6.9 1 9v8.2C1 19.3 2.7 21 4.8 21h14c2.1 0 3.8-1.7 3.8-3.8V9c0-2.1-1.7-3.8-3.8-3.8Zm2.2 12c0 1.2-1 2.2-2.2 2.2H5c-1.2 0-2.2-1-2.2-2.2V9c0-1.2 1-2.2 2.2-2.2h14c1.2 0 2.2 1 2.2 2.2zM8.5 10.5c-.6 0-1 .4-1 1V13c0 .6.4 1 1 1s1-.4 1-1v-1.5c0-.6-.4-1-1-1m7 0c-.6 0-1 .4-1 1V13c0 .6.4 1 1 1s1-.4 1-1v-1.5c0-.6-.4-1-1-1";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Bilibili.displayName = "Bilibili";
export default Bilibili;
