import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Certificate = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M19.65 4.05H4.35A1.35 1.35 0 0 0 3 5.4v10.8c0 .746.604 1.35 1.35 1.35H7.5v3.6l4.5-1.8 4.5 1.8v-3.6h3.15A1.35 1.35 0 0 0 21 16.2V5.4a1.35 1.35 0 0 0-1.35-1.35m-1.35 10.8H5.7v-3.6h12.6z"
    color={color}
    size={size}
  />
));
Certificate.displayName = "Certificate";
export default Certificate;
