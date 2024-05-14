import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const MicrophoneOn = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M12 15.6a4.8 4.8 0 0 1-4.8-4.8v-6a4.8 4.8 0 0 1 9.6 0v6a4.8 4.8 0 0 1-4.8 4.8Zm7.2-4.8a7.153 7.153 0 0 1-2.109 5.091A7.153 7.153 0 0 1 12 18a7.153 7.153 0 0 1-5.091-2.109A7.153 7.153 0 0 1 4.8 10.8H2.4a9.566 9.566 0 0 0 2.812 6.788 9.566 9.566 0 0 0 3.05 2.057c.816.345 1.665.646 2.538.755v1.2H6V24h12v-2.4h-4.8v-1.2c.873-.108 1.722-.41 2.537-.755a9.566 9.566 0 0 0 3.051-2.057A9.566 9.566 0 0 0 21.6 10.8h-2.4Z"
    color={color}
    size={size}
  />
));
MicrophoneOn.displayName = "MicrophoneOn";
export default MicrophoneOn;
