import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const AddNew = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M6.6 3v14.4H21V3zm11.7 8.1h-3.6v3.6h-1.8v-3.6H9.3V9.3h3.6V5.7h1.8v3.6h3.6zm.9 9.9H3V4.8h1.8v14.4h14.4z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
AddNew.displayName = "AddNew";
export default AddNew;
