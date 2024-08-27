import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const ExternalNaver = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2m5 14.25h-3.25L10.875 12v4.25h-3.25V7.875h3.25l2.875 4.25v-4.25H17z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
ExternalNaver.displayName = "ExternalNaver";
export default ExternalNaver;
