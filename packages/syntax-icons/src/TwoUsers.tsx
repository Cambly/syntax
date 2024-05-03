import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const TwoUsers = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M10.8 21.6H0v-6l2.4-1.2 3 3.6 3-3.6 2.4 1.2v6Zm13.2 0v-8.4L21.6 12l-3 3.6-3-3.6-2.4 1.2v8.4H24ZM18.6 2.4a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4ZM5.4 4.8a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
TwoUsers.displayName = "TwoUsers";
export default TwoUsers;
