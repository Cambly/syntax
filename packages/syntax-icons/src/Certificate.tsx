import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const Certificate = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M22.2 1.2H1.8A1.8 1.8 0 0 0 0 3v14.4a1.8 1.8 0 0 0 1.8 1.8H6V24l6-2.4 6 2.4v-4.8h4.2a1.8 1.8 0 0 0 1.8-1.8V3a1.8 1.8 0 0 0-1.8-1.8Zm-1.8 14.4H3.6v-4.8h16.8v4.8Z"
    color={color}
    size={size}
  />
));
Certificate.displayName = "Certificate";
export default Certificate;
