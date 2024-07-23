import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Download = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M17.5 8.5 19 10l-7 7-7-7 1.5-1.5L11 13V2h2v11zM20 13v7H4v-7H2v9h20v-9z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Download.displayName = "Download";
export default Download;
