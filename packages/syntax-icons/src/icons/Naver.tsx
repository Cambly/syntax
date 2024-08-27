import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Naver = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8m4 11.4H9.4L7.1 8v3.4H4.5V4.7h2.6l2.3 3.4V4.7H12z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Naver.displayName = "Naver";
export default Naver;
