import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const Information = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M12 .062c-6.627 0-12 5.372-12 12 0 6.627 5.373 12 12 12s12-5.373 12-12c0-6.628-5.373-12-12-12ZM13.2 19.2h-2.4V9.6h2.4v9.6Zm0-12h-2.4V4.8h2.4v2.4Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
Information.displayName = "Information";
export default Information;
