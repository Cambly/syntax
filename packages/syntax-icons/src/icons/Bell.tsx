import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Bell = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M15 19a3 3 0 1 1-6 0zm3-11c-.51-2.244-2.276-3.236-4-4l-1-2h-2l-1 2c-1.724.764-3.49 1.756-4 4-.433 1.903-.458 4-3 7l1 2h16l1-2c-2.542-3-2.567-5.097-3-7";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Bell.displayName = "Bell";
export default Bell;
