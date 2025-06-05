import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Exit = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M4 4v16h7v2H2V2h9v2zm11 1-1.5 1.5L18 11H7v2h11l-4.5 4.5L15 19l7-7z";
  return <Icon ref={ref} path={path} color={color} size={size} rtlMirror />;
});
Exit.displayName = "Exit";
export default Exit;
