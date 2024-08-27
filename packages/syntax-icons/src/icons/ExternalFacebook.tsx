import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const ExternalFacebook = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M12 2C6.477 2 2 6.494 2 12.037c0 4.707 3.229 8.656 7.584 9.741v-6.674H7.522v-3.067h2.062v-1.322c0-3.416 1.54-5 4.882-5 .634 0 1.727.125 2.174.25v2.78a13 13 0 0 0-1.155-.037c-1.64 0-2.273.623-2.273 2.244v1.085h3.266l-.561 3.067h-2.705V22C18.163 21.4 22 17.168 22 12.037 22 6.494 17.523 2 12 2";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
ExternalFacebook.displayName = "ExternalFacebook";
export default ExternalFacebook;
