import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const Achievement = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M12 0C6.367 0 1.8 4.567 1.8 10.2c0 3.39 1.655 6.395 4.2 8.25V24l6-2.4 6 2.4v-5.55a10.188 10.188 0 0 0 4.2-8.25C22.2 4.567 17.633 0 12 0Zm3 10.8 1.8 3.6-1.2 1.2-3.6-3-3.6 3-1.2-1.2L9 10.8 6 8.4l.6-1.2h3.6l1.2-3.6h1.2l1.2 3.6h3.6l.6 1.2-3 2.4Z"
    color={color}
    size={size}
  />
));
Achievement.displayName = "Achievement";
export default Achievement;
