import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const MicrophoneOff = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M22.2 24 0 1.8 1.8 0 24 22.2 22.2 24Zm-5.52-12.12c.08-.347.12-.71.12-1.08v-6A4.8 4.8 0 0 0 12 0a4.803 4.803 0 0 0-4.38 2.82l9.06 9.06Zm3.66 3.66c.185-.325.358-.655.505-1.003.501-1.184.755-2.442.755-3.737h-2.4c0 1.04-.184 2.08-.6 3l1.74 1.74ZM16.8 21.6h-3.6v-1.2c.645-.08 1.305-.266 1.92-.48l-1.98-1.98c-.365.056-.763.06-1.14.06a7.153 7.153 0 0 1-5.091-2.109A7.153 7.153 0 0 1 4.8 10.8H2.4a9.566 9.566 0 0 0 2.812 6.788 9.566 9.566 0 0 0 3.05 2.057c.816.345 1.665.646 2.538.755v1.2H6V24h12v-1.2l-1.2-1.2Z"
    color={color}
    size={size}
  />
));
MicrophoneOff.displayName = "MicrophoneOff";
export default MicrophoneOff;
