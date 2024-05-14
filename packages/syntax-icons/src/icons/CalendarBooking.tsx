import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const CalendarBooking = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M17.5 13a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9m-.5 7-2.25-2.25 1-1L17 18l2.5-2.5 1 1zm-8-7H7v-2h2zm4 0h-2v-2h2zm-4 4H7v-2h2zm4-8h-2V7h2zm4 0h-2V7h2zm-5 12H3V2h18v10h-2V5H5v14h7z"
    color={color}
    size={size}
  />
));
CalendarBooking.displayName = "CalendarBooking";
export default CalendarBooking;
