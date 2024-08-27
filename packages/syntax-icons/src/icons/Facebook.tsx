import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Facebook = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M8 0a8 8 0 0 0-1.932 15.765v-5.32h-1.65V8h1.65V6.947c0-2.723 1.232-3.985 3.905-3.985.507 0 1.382.1 1.74.198v2.216c-.19-.02-.518-.03-.925-.03-1.312 0-1.818.498-1.818 1.79V8h2.613l-.45 2.445H8.97v5.496A8 8 0 0 0 8 0";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Facebook.displayName = "Facebook";
export default Facebook;
