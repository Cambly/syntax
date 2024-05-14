import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Search = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="m20.82 19.54-5.699-5.71a6.8 6.8 0 0 0 1.405-4.157c0-1.83-.713-3.552-2.008-4.846A6.8 6.8 0 0 0 9.673 2.82a6.8 6.8 0 0 0-4.846 2.007A6.8 6.8 0 0 0 2.82 9.673c0 1.83.713 3.551 2.007 4.845a6.8 6.8 0 0 0 4.846 2.008 6.8 6.8 0 0 0 4.157-1.405l5.71 5.699zm-14.7-6.314a5 5 0 0 1-1.473-3.553c0-1.343.523-2.605 1.472-3.554a5 5 0 0 1 3.554-1.472c1.342 0 2.604.523 3.553 1.472a5 5 0 0 1 1.472 3.554 5 5 0 0 1-1.472 3.553 5 5 0 0 1-3.553 1.472 5 5 0 0 1-3.554-1.472Z"
    color={color}
    size={size}
  />
));
Search.displayName = "Search";
export default Search;
