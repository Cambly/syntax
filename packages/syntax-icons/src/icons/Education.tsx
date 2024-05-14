import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const Education = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M19.2 18 12 21.6 4.8 18v-4.8l7.2 3.6 7.2-3.6V18ZM12 2.4l-12 6 12 6 9.6-4.8V18H24V8.4l-12-6Z"
    color={color}
    size={size}
  />
));
Education.displayName = "Education";
export default Education;
