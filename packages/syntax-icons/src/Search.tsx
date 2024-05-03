import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const Search = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="m23.64 21.96-7.485-7.5A8.932 8.932 0 0 0 18 9a8.94 8.94 0 0 0-2.636-6.364A8.941 8.941 0 0 0 9 0a8.941 8.941 0 0 0-6.364 2.636A8.941 8.941 0 0 0 0 9c0 2.404.936 4.664 2.636 6.364A8.94 8.94 0 0 0 9 18c2 0 3.9-.648 5.46-1.845l7.5 7.485 1.68-1.68ZM4.333 13.667A6.557 6.557 0 0 1 2.4 9c0-1.763.686-3.42 1.933-4.667A6.557 6.557 0 0 1 9 2.4c1.763 0 3.42.687 4.667 1.933A6.557 6.557 0 0 1 15.6 9c0 1.763-.686 3.42-1.933 4.667A6.557 6.557 0 0 1 9 15.6a6.557 6.557 0 0 1-4.667-1.933Z"
    color={color}
    size={size}
  />
));
Search.displayName = "Search";
export default Search;
