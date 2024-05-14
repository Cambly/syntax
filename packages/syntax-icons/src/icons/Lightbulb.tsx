import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const Lightbulb = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M15.6 24H8.4l-1.2-3.6h9.6L15.6 24ZM12 0C7.76-.004 4.2 3.391 4.2 7.65c0 2.228.825 4.185 2.247 5.627.486.493.753 1.15.753 1.843V18h9.6v-2.88c0-.693.267-1.35.753-1.843C18.975 11.836 19.8 9.878 19.8 7.65 19.8 3.391 16.24-.004 12 0Z"
    color={color}
    size={size}
  />
));
Lightbulb.displayName = "Lightbulb";
export default Lightbulb;
