import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Home = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M19 7.333V2h-2v3.556L13 2h-2l-9 8v2h2v10h5v-6a3 3 0 1 1 6 0v6h5V12h2v-2z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Home.displayName = "Home";
export default Home;
