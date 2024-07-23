import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const BookmarkFilled = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M5 21V5q0-.824.588-1.413A1.93 1.93 0 0 1 7 3h10q.824 0 1.413.587.586.589.587 1.413v16l-7-3z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
BookmarkFilled.displayName = "BookmarkFilled";
export default BookmarkFilled;
