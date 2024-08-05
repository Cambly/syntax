import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Accent = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M22 9.368h-6.316V7.263H22zM19.895 2l-5.263 2.105 1.052 2.106 5.263-2.106zm1.052 10.526-5.263-2.105-1.052 2.105 5.263 2.106zM2 22h15.79l-2.106-5.263-5.263-3.158-2.632 4.21-2.631-4.21L2 15.684zM12.526 7.79a4.737 4.737 0 1 1-9.473 0 4.737 4.737 0 0 1 9.473 0";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Accent.displayName = "Accent";
export default Accent;
