import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Calendar = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M2.5 2v20h19V2zm2.111 17.895V5.158H19.39v14.737H4.61Zm4.222-6.316h-2.11v-2.105h2.11zm4.223 0h-2.112v-2.105h2.111zm4.222 0h-2.111v-2.105h2.11zm-4.222 4.21h-2.112v-2.105h2.112zm-4.223 0h-2.11v-2.105h2.11zm4.223-8.42h-2.112V7.262h2.112v2.105Zm4.222 0h-2.111V7.262h2.11v2.105Z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Calendar.displayName = "Calendar";
export default Calendar;
