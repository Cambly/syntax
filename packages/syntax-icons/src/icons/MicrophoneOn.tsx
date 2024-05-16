import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const MicrophoneOn = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M12 15a4 4 0 0 1-4-4V6a4 4 0 1 1 8 0v5a4 4 0 0 1-4 4m6-4a5.96 5.96 0 0 1-1.757 4.243A5.96 5.96 0 0 1 12 17a5.96 5.96 0 0 1-4.243-1.757A5.96 5.96 0 0 1 6 11H4a7.97 7.97 0 0 0 2.343 5.657 8 8 0 0 0 2.543 1.714c.679.287 1.387.539 2.114.629v1H7v2h10v-2h-4v-1c.727-.09 1.435-.342 2.114-.63a8 8 0 0 0 2.543-1.713A7.97 7.97 0 0 0 20 11z"
    color={color}
    size={size}
  />
));
MicrophoneOn.displayName = "MicrophoneOn";
export default MicrophoneOn;
