import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const SearchUsers = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M21.6 13.2v-.06a4.2 4.2 0 1 0-3 1.26h.93L21.6 18l2.07-1.2-2.07-3.6Zm-4.8-3a1.8 1.8 0 1 1 3.6 0 1.8 1.8 0 0 1-3.6 0ZM0 15.6l3.6-2.4 3 4.8 3-4.8 6 3.6 2.4 6H0v-7.2Zm12-9a5.4 5.4 0 1 1-10.8 0 5.4 5.4 0 0 1 10.8 0Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
SearchUsers.displayName = "SearchUsers";
export default SearchUsers;
