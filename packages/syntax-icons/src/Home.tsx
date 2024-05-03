import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const Home = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M20.4 6.4V0H18v4.267L13.2 0h-2.4L0 9.6V12h2.4v12h6v-7.2a3.6 3.6 0 0 1 7.2 0V24h6V12H24V9.6l-3.6-3.2Z"
    color={color}
    size={size}
  />
));
Home.displayName = "Home";
export default Home;
