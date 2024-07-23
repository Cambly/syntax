import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Wifi = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M4.65 11.2 2 8c2.607-2.469 6.126-4 10-4s7.393 1.531 10 4l-2.65 3.2c-.085-.092-.19-.182-.279-.271A9.97 9.97 0 0 0 12 8a9.97 9.97 0 0 0-7.071 2.929c-.09.09-.194.179-.279.271M12 16c-.96 0-1.8.445-2.35 1.15L12 20l2.35-2.85A2.95 2.95 0 0 0 12 16m5.657-3.657A7.95 7.95 0 0 0 12 10a7.95 7.95 0 0 0-5.657 2.343c-.133.133-.22.217-.343.357l2.269 2.8C9.183 14.515 10.554 14 12 14s2.817.515 3.731 1.5L18 12.7c-.122-.14-.21-.224-.343-.357";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Wifi.displayName = "Wifi";
export default Wifi;
