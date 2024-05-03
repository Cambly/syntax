import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const Education = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M19.2 18 12 21.6 4.8 18v-4.8l7.2 3.6 7.2-3.6V18ZM12 2.4l-12 6 12 6 9.6-4.8V18H24V8.4l-12-6Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
Education.displayName = "Education";
export default Education;
