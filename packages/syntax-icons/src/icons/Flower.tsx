import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Flower = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M3.667 13.667A8.333 8.333 0 0 1 12 22h-1.667A8.333 8.333 0 0 1 2 13.667zm18.333 0A8.333 8.333 0 0 1 13.667 22H12a8.333 8.333 0 0 1 8.333-8.333zm-8.333-9.44 1.574-1.575 2.357 2.357-1.575 1.574h2.227v3.334h-2.227l1.575 1.574-2.357 2.357-1.574-1.575V14.5h-3.334v-2.227l-1.574 1.575-2.357-2.357 1.575-1.574H5.75V6.583h2.227L6.402 5.009 8.76 2.652l1.574 1.575V2h3.334zM12 5.75a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Flower.displayName = "Flower";
export default Flower;
