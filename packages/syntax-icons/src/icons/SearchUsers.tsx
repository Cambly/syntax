import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const SearchUsers = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M20.086 13.014v-.051a3.549 3.549 0 1 0-2.535 1.065h.786l1.749 3.042 1.749-1.014-1.75-3.042Zm-4.056-2.535a1.52 1.52 0 1 1 3.042 0 1.52 1.52 0 0 1-3.042 0M1.835 15.042l3.042-2.028 2.535 4.056 2.535-4.056 5.07 3.042 2.027 5.07H1.835zm10.14-7.605a4.563 4.563 0 1 1-9.126 0 4.563 4.563 0 0 1 9.125 0Z"
    color={color}
    size={size}
  />
));
SearchUsers.displayName = "SearchUsers";
export default SearchUsers;
