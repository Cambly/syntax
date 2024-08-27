import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const ExternalTwitter = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M17.752 2.808h3.067l-6.7 7.658L22 20.886h-6.172l-4.834-6.32-5.53 6.32h-3.07l7.167-8.19L2 2.808h6.328l4.37 5.776zM16.676 19.05h1.699L7.405 4.547H5.583z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
ExternalTwitter.displayName = "ExternalTwitter";
export default ExternalTwitter;
