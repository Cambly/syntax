import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const CameraOff = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M24 4.8v14.4L8.4 3.6h8.4v6l4.8-4.8H24Zm0 17.4L1.8 0 0 1.8 22.2 24l1.8-1.8ZM0 4.8v15.6h15.6L0 4.8Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
CameraOff.displayName = "CameraOff";
export default CameraOff;