import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const MicrophoneOff = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M20.5 22 2 3.5 3.5 2 22 20.5zm-4.6-10.1q.1-.435.1-.9V6a4 4 0 0 0-4-4 4 4 0 0 0-3.65 2.35zm3.05 3.05c.154-.271.298-.546.42-.836.418-.987.63-2.034.63-3.114h-2c0 .866-.154 1.734-.5 2.5zM16 20h-3v-1c.538-.067 1.087-.222 1.6-.4l-1.65-1.65c-.304.047-.636.05-.95.05a5.96 5.96 0 0 1-4.243-1.757A5.96 5.96 0 0 1 6 11H4a7.97 7.97 0 0 0 2.343 5.657 8 8 0 0 0 2.543 1.714c.679.287 1.387.539 2.114.629v1H7v2h10v-1z"
    color={color}
    size={size}
  />
));
MicrophoneOff.displayName = "MicrophoneOff";
export default MicrophoneOff;
