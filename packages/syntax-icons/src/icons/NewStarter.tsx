import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const NewStarter = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "m19.5 3-4 2L13 2l-2.5 1 .5 4.5L6 9l.5 3H12v5.5l2.5.5 2-5 4.5.5 1-2.5-3-2.5 2-4zM11 13v4l-8 5-1-1 5-8z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
NewStarter.displayName = "NewStarter";
export default NewStarter;
