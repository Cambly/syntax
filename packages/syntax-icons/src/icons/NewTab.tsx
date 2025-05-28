import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const NewTab = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M2 2v20h20v-7.464h-2.39v5.07H4.393V4.39h5.07V2Zm11.771 0v2.39h4.36l-8.474 8.475 1.69 1.691 8.262-8.258v3.93H22V2Z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
NewTab.displayName = "NewTab";
export default NewTab;
