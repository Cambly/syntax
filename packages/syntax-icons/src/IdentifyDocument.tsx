import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const IdentifyDocument = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M0 3.6v16.8h24V3.6H0Zm7.2 3.6a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8Zm3.6 9.6H3.6v-2.4L6 13.2l1.2 1.2 1.2-1.2 2.4 1.2v2.4Zm9.6-1.2h-7.2v-2.4h7.2v2.4Zm0-4.8h-7.2V8.4h7.2v2.4Z"
    color={color}
    size={size}
  />
));
IdentifyDocument.displayName = "IdentifyDocument";
export default IdentifyDocument;
