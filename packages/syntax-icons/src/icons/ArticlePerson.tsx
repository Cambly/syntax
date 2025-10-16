import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const ArticlePerson = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path = "#1C1B1F";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
ArticlePerson.displayName = "ArticlePerson";
export default ArticlePerson;
