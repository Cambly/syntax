import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const IdentityDocument = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M2 5v14h20V5zm6 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4m3 8H5v-2l2-1 1 1 1-1 2 1zm8-1h-6v-2h6zm0-4h-6V9h6z"
    color={color}
    size={size}
  />
));
IdentityDocument.displayName = "IdentityDocument";
export default IdentityDocument;
