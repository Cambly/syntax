import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const CircleEnclosedCross = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm6.24 16.56-1.68 1.68L12 13.71l-4.56 4.53-1.68-1.68L10.29 12 5.76 7.44l1.68-1.68L12 10.29l4.56-4.53 1.68 1.68L13.71 12l4.53 4.56Z"
    color={color}
    size={size}
  />
));
CircleEnclosedCross.displayName = "CircleEnclosedCross";
export default CircleEnclosedCross;
