import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const CalendarBooking = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M18.6 13.2a5.4 5.4 0 1 0 0 10.8 5.4 5.4 0 0 0 0-10.8Zm-.6 8.4-2.7-2.7 1.2-1.2 1.5 1.5 3-3 1.2 1.2-4.2 4.2Zm-9.6-8.4H6v-2.4h2.4v2.4Zm4.8 0h-2.4v-2.4h2.4v2.4ZM8.4 18H6v-2.4h2.4V18Zm4.8-9.6h-2.4V6h2.4v2.4Zm4.8 0h-2.4V6H18v2.4Zm-6 14.4H1.2V0h21.6v12h-2.4V3.6H3.6v16.8H12v2.4Z"
    color={color}
    size={size}
  />
));
CalendarBooking.displayName = "CalendarBooking";
export default CalendarBooking;
