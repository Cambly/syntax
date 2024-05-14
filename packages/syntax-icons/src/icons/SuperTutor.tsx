import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const SuperTutor = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="m19 2.4.2-2.4H4.8L5 2.4H0l1.2 10.8h4.7l.1 1.2 2.4 2.4h2.4v3.6H8.4L6 24h12l-2.4-3.6h-2.4v-3.6h2.4l2.4-2.4.1-1.2h4.7L24 2.4h-5ZM3.333 10.8l-.666-6H5.2l.5 6H3.333Zm14.967 0 .5-6h2.533l-.666 6H18.3Z"
    color={color}
    size={size}
  />
));
SuperTutor.displayName = "SuperTutor";
export default SuperTutor;
