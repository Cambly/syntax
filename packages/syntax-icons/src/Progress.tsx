import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const Progress = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M21.6 24h-4.8V0h4.8v24ZM14.4 6H9.6v18h4.8V6Zm-7.2 6H2.4v12h4.8V12Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
Progress.displayName = "Progress";
export default Progress;