import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const HelpInverted = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M10.286 22h3.428v-3.333h-3.428zm3.428-6.667c0-.913.583-1.52 1.612-2.51C16.517 11.679 18 10.254 18 7.834c0-1.411-.517-2.819-1.418-3.862C15.805 3.07 14.38 2 12 2 9.41 2 7.946 3.115 7.173 4.05 6.307 5.1 6 6.295 6 7h3.429c.008-.101.113-.524.468-.92.443-.496 1.15-.747 2.103-.747.85 0 1.509.263 1.956.781.385.446.615 1.089.615 1.72 0 .98-.598 1.603-1.656 2.62-1.171 1.125-2.63 2.53-2.63 4.88z";
  return <Icon ref={ref} path={path} color={color} size={size} rtlMirror />;
});
HelpInverted.displayName = "HelpInverted";
export default HelpInverted;
