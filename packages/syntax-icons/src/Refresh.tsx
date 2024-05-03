import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const Refresh = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M21.3 14.4a9.543 9.543 0 0 1-2.512 4.388A9.537 9.537 0 0 1 12 21.6a9.537 9.537 0 0 1-6.788-2.812A9.537 9.537 0 0 1 2.4 12c0-2.564.999-4.975 2.812-6.788A9.537 9.537 0 0 1 12 2.4c2.564 0 4.975.999 6.788 2.812A9.611 9.611 0 0 1 20.31 7.2H16.8v2.4H24V2.4h-2.4v2.4c-.34-.45-.71-.881-1.115-1.285A11.96 11.96 0 0 0 12 0a11.96 11.96 0 0 0-8.485 3.515A11.959 11.959 0 0 0 0 12a11.96 11.96 0 0 0 3.515 8.485A11.957 11.957 0 0 0 12 24a11.957 11.957 0 0 0 8.485-3.515A11.957 11.957 0 0 0 23.76 14.4H21.3Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
Refresh.displayName = "Refresh";
export default Refresh;
