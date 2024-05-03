import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const Cross = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M23.64 2.04 21.96.36 12 10.32 2.04.36.36 2.04 10.32 12 .36 21.96l1.68 1.68L12 13.68l9.96 9.96 1.68-1.68L13.68 12l9.96-9.96Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
Cross.displayName = "Cross";
export default Cross;
