import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const Book = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M6 0a6 6 0 0 0-6 6v12a6 6 0 0 0 6 6h18v-2.4s-1.2-1.196-1.2-3.6 1.2-3.6 1.2-3.6V0H6Zm15.6 21.6H6a3.6 3.6 0 0 1 0-7.2h15.6s-1.2 1.2-1.2 3.6c0 2.4 1.2 3.6 1.2 3.6Z"
    color={color}
    size={size}
  />
));
Book.displayName = "Book";

export default Book;
