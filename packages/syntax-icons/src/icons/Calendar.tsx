import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const Calendar = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M1.2 0v22.8h21.6V0H1.2Zm2.4 20.4V3.6h16.8v16.8H3.6Zm4.8-7.2H6v-2.4h2.4v2.4Zm4.8 0h-2.4v-2.4h2.4v2.4Zm4.8 0h-2.4v-2.4H18v2.4ZM13.2 18h-2.4v-2.4h2.4V18Zm-4.8 0H6v-2.4h2.4V18Zm4.8-9.6h-2.4V6h2.4v2.4Zm4.8 0h-2.4V6H18v2.4Z"
    color={color}
    size={size}
  />
));
Calendar.displayName = "Calendar";
export default Calendar;
