import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Education = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path = "m18 17-6 3-6-3v-4l6 3 6-3zM12 4 2 9l10 5 8-4v7h2V9z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Education.displayName = "Education";
export default Education;
