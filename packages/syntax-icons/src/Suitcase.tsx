import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const Suitcase = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M0 24V12l9.6 7.2h4.8L24 12v12H0ZM24 6v3l-9.6 7.2v-1.8H9.6v1.8L0 9V6h7.2c0-2.647 2.153-4.8 4.8-4.8s4.8 2.153 4.8 4.8H24ZM9.6 6h4.8c0-1.323-1.077-2.4-2.4-2.4A2.403 2.403 0 0 0 9.6 6Z"
    color={color}
    size={size}
  />
));
Suitcase.displayName = "Suitcase";
export default Suitcase;
