import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const TeachingCertificate = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M11 11v2H6v-2zM6 7v2h12V7zm16 10h-3.337a3.5 3.5 0 0 1-.663.95V21l-2.5-1-2.5 1v-3.05a3.5 3.5 0 0 1-.663-.95H2V3h20zM20 5H4v10h8.036a3.5 3.5 0 0 1 6.928 0H20z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
TeachingCertificate.displayName = "TeachingCertificate";
export default TeachingCertificate;
