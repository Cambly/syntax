import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Settings = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M22 14v-4h-3.012l-.632-1.527 2.13-2.13-2.83-2.828-2.129 2.13L14 5.011V2h-4v3.012l-1.527.632-2.13-2.13-2.828 2.83 2.13 2.129L5.011 10H2v4h3.012l.632 1.527-2.13 2.13 2.83 2.828 2.129-2.13 1.527.633V22h4v-3.012l1.527-.632 2.13 2.13 2.828-2.83-2.13-2.129.633-1.527zm-7-.75L13.25 15h-2.5L9 13.25v-2.5L10.75 9h2.5L15 10.75z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Settings.displayName = "Settings";
export default Settings;
