import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const NewTab = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M.544.536V23.53h23v-8.586h-2.751v5.821H3.295V3.287h5.83V.529H.544Zm13.538 0V3.28h5.015l-9.753 9.743 1.95 1.943 9.499-9.495v4.518h2.751V.536Z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
NewTab.displayName = "NewTab";
export default NewTab;
