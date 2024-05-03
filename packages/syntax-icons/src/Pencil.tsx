import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const Pencil = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="m0 19.2 15-15L19.8 9l-15 15H0v-4.8ZM16.8 2.4l4.8 4.8L24 4.8 19.2 0l-2.4 2.4Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
Pencil.displayName = "Pencil";
export default Pencil;
