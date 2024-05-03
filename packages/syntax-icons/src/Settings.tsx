import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const Settings = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M24 14.4V9.6h-3.614l-.76-1.833 2.556-2.555-3.394-3.394-2.555 2.555-1.833-.759V0H9.6v3.614l-1.833.76-2.555-2.556-3.394 3.394 2.555 2.555L3.614 9.6H0v4.8h3.614l.76 1.833-2.556 2.555 3.394 3.394 2.555-2.555 1.833.759V24h4.8v-3.614l1.833-.76 2.555 2.556 3.394-3.394-2.555-2.555.759-1.833H24Zm-8.4-.9-2.1 2.1h-3l-2.1-2.1v-3l2.1-2.1h3l2.1 2.1v3Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
Settings.displayName = "Settings";
export default Settings;
