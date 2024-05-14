import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const Accent = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M22.8 8.4h-7.2V6h7.2v2.4ZM20.4 0l-6 2.4 1.2 2.4 6-2.4L20.4 0Zm1.2 12-6-2.4-1.2 2.4 6 2.4 1.2-2.4ZM0 22.8h18l-2.4-6-6-3.6-3 4.8-3-4.8L0 15.6v7.2ZM12 6.6a5.4 5.4 0 1 1-10.8 0 5.4 5.4 0 0 1 10.8 0Z"
    color={color}
    size={size}
  />
));
Accent.displayName = "Accent";
export default Accent;
