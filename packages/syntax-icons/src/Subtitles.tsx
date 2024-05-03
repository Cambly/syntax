import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const Subtitles = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M0 2.4v19.2h24V2.4H0Zm3.6 8.4h4.8v2.4H3.6v-2.4Zm9.6 7.2H3.6v-2.4h9.6V18Zm7.2 0h-4.8v-2.4h4.8V18Zm0-4.8h-9.6v-2.4h9.6v2.4Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
Subtitles.displayName = "Subtitles";
export default Subtitles;
