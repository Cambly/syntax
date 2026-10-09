import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const WifiOff = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M12 15.942c.961 0 1.8.445 2.35 1.15L12 19.943l-2.35-2.85a2.96 2.96 0 0 1 2.35-1.15m2.912-5.455a8 8 0 0 1 2.745 1.797c.133.133.22.217.343.358l-2.269 2.8c-.913-.986-2.285-1.5-3.731-1.5q-.286 0-.568.027zM12 3.942q1.237.002 2.419.204l-3.906 3.906q-1.24.185-2.406.677A10 10 0 0 0 4.93 10.87c-.09.09-.193.18-.279.272L2 7.943c2.607-2.47 6.126-4 10-4m7.415 2.042c.934.557 1.8 1.215 2.585 1.957l-2.65 3.2c-.086-.091-.19-.182-.279-.27a10 10 0 0 0-2.645-1.897zM18.827 1.5l1.414 1.414L5.7 17.456l-1.414-1.414z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
WifiOff.displayName = "WifiOff";
export default WifiOff;
