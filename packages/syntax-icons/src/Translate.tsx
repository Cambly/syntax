import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const Translate = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M19.2 9.6h-2.4L12 24h2.4l1.2-3.6h4.8l1.2 3.6H24L19.2 9.6Zm-1.2 3 1.62 5.4h-3.24L18 12.6Zm0-9V6h-3.6c0 1.319-.473 2.634-1.448 4.02-.77 1.094-1.74 2.047-2.512 2.82l-1.71 1.71 2.01 2.01-1.68 1.68-2.01-2.01-3.81 3.81-1.68-1.68 3.81-3.81-.519-.502C3.087 12.285 2.4 10.702 2.4 8.4h2.4c0 1.668.425 2.628 1.749 3.951l.501.519 1.71-1.71C10.13 9.79 12 7.903 12 6H0V3.6h7.2V0h2.4v3.6H18Z"
    color={color}
    size={size}
  />
));
Translate.displayName = "Translate";
export default Translate;
