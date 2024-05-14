import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const CircleEnclosedStar = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm5.4 18-1.8 1.2-3.6-3.6-3.6 3.6L6.6 18l1.8-4.8-3.6-2.4.6-1.8h4.2l1.2-4.2h2.4L14.4 9h4.2l.6 1.8-3.6 2.4 1.8 4.8Z"
    color={color}
    size={size}
  />
));
CircleEnclosedStar.displayName = "CircleEnclosedStar";
export default CircleEnclosedStar;
