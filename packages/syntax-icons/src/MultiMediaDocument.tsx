import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const MultiMediaDocument = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M8.1 4.29 7.32 6.6h1.56L8.1 4.29Zm2.1 10.11c.993 0 1.8.807 1.8 1.8s-.807 1.8-1.8 1.8-1.8-.807-1.8-1.8.807-1.8 1.8-1.8ZM19.8 0H4.2c-.993 0-1.8.807-1.8 1.8v20.4c0 .993.807 1.8 1.8 1.8h15.6c.993 0 1.8-.807 1.8-1.8V1.8c0-.993-.807-1.8-1.8-1.8ZM7.2 2.4H9l2.4 7.2H9.87l-.51-1.5H6.84l-.51 1.5H4.8l2.4-7.2Zm12 19.2-4.8-4.8-3.6 3.6-2.4-1.2L4.8 21v-9h14.4v9.6Zm0-12h-6V7.2h6v2.4Zm0-4.8h-6V2.4h6v2.4Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
MultiMediaDocument.displayName = "MultiMediaDocument";
export default MultiMediaDocument;
