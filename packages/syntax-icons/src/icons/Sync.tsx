import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Sync = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="m11 16-3.5-3.5L9 11l2 2 4-4 1.5 1.5zm-3-6V8H5.075a8 8 0 0 1 1.268-1.657A7.95 7.95 0 0 1 12 4c2.137 0 4.146.832 5.657 2.343A7.95 7.95 0 0 1 20 12h2a9.97 9.97 0 0 0-2.929-7.071A9.97 9.97 0 0 0 12 2a9.97 9.97 0 0 0-8 4V4H2v6zm8 4v2h2.925a8 8 0 0 1-1.268 1.657A7.95 7.95 0 0 1 12 20a7.95 7.95 0 0 1-5.657-2.343A7.95 7.95 0 0 1 4 12c0-2.137-2 0-2 0a9.97 9.97 0 0 0 2.929 7.071A9.97 9.97 0 0 0 12 22a9.97 9.97 0 0 0 8-4v2h2v-6z"
    color={color}
    size={size}
  />
));
Sync.displayName = "Sync";
export default Sync;
