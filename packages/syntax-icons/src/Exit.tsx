import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const Exit = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M2.4 2.4v19.2h8.4V24H0V0h10.8v2.4H2.4Zm13.2 1.2-1.8 1.8 5.4 5.4H6v2.4h13.2l-5.4 5.4 1.8 1.8L24 12l-8.4-8.4Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
Exit.displayName = "Exit";
export default Exit;
