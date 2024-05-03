import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const Clock = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm-1.2 2.4h2.4v9.12h-2.4V2.4Zm6.36 16.44-5.64-5.64 1.68-1.68 5.64 5.64-1.68 1.68Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
Clock.displayName = "Clock";
export default Clock;
