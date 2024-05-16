import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Book = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M7.5 3A4.5 4.5 0 0 0 3 7.5v9A4.5 4.5 0 0 0 7.5 21H21v-1.8s-.9-.897-.9-2.7.9-2.7.9-2.7V3zm11.7 16.2H7.5a2.7 2.7 0 1 1 0-5.4h11.7s-.9.9-.9 2.7.9 2.7.9 2.7"
    color={color}
    size={size}
  />
));
Book.displayName = "Book";
export default Book;
