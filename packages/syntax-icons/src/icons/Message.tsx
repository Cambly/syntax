import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Message = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M3 4.05v13.5h3.6v3.6h1.8l3.6-3.6h9V4.05zm10.8 8.1H5.7v-1.8h8.1zm4.5-3.6H5.7v-1.8h12.6z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Message.displayName = "Message";
export default Message;
