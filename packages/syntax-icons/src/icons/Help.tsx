import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Help = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2m1 16h-2v-2h2zm.94-5.506c-.6.594-.94.958-.94 1.506h-2c0-1.41.85-2.252 1.534-2.928.617-.61.966-.984.966-1.572 0-.378-.134-.764-.359-1.031C12.881 8.158 12.496 8 12 8c-.556 0-.968.15-1.227.448A1.15 1.15 0 0 0 10.5 9h-2c0-.423.18-1.14.684-1.77C9.635 6.67 10.49 6 12 6c1.388 0 2.22.643 2.673 1.182.525.626.827 1.471.827 2.318 0 1.452-.865 2.307-1.56 2.994"
    color={color}
    size={size}
  />
));
Help.displayName = "Help";
export default Help;
