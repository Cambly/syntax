import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const SquareEnclosedPlus = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M0 0v24h24V0H0Zm19.2 13.2h-6v6h-2.4v-6h-6v-2.4h6v-6h2.4v6h6v2.4Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
SquareEnclosedPlus.displayName = "SquareEnclosedPlus";
export default SquareEnclosedPlus;
