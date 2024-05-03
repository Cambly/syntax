import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const NewStarter = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="m21 1.2-4.8 2.4-3-3.6-3 1.2.6 5.4-6 1.8.6 3.6H12v6.6l3 .6 2.4-6 5.4.6 1.2-3-3.6-3L22.8 3 21 1.2Zm-10.2 12V18l-9.6 6L0 22.8l6-9.6h4.8Z"
    color={color}
    size={size}
  />
));
NewStarter.displayName = "NewStarter";
export default NewStarter;
