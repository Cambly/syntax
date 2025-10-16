import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Face = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12M8.41 7.22c1.156 0 2.093.937 2.093 2.095v.898H6.315v-.898c0-1.158.937-2.095 2.095-2.095m7.187 0c1.158 0 2.095.937 2.095 2.095v.898h-4.19v-.898c0-1.158.937-2.095 2.095-2.095M8.01 14.889c.013.027.255.465.807.905.601.481 1.604 1 3.203 1s2.602-.519 3.203-1c.552-.441.797-.881.81-.905.216-.445.714-.623 1.186-.415.442.221.617.77.395 1.204 0 0-.082.183-.328.512-.206.275-.52.632-.962.986-.896.717-2.289 1.394-4.304 1.394s-3.408-.677-4.304-1.394a5.5 5.5 0 0 1-.962-.986 4 4 0 0 1-.325-.502.91.91 0 0 1 .395-1.214c.472-.208.97-.03 1.186.415";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Face.displayName = "Face";
export default Face;
