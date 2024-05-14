import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const Sync = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="m10.8 16.8-4.2-4.2 1.8-1.8 2.4 2.4 4.8-4.8 1.8 1.8-6.6 6.6ZM7.2 9.6V7.2H3.69a9.615 9.615 0 0 1 1.522-1.988A9.537 9.537 0 0 1 12 2.4c2.564 0 4.975.999 6.788 2.812A9.537 9.537 0 0 1 21.6 12H24a11.959 11.959 0 0 0-3.515-8.485A11.96 11.96 0 0 0 12 0a11.959 11.959 0 0 0-8.485 3.515c-.404.404-.776.834-1.115 1.285V2.4H0v7.2h7.2Zm9.6 4.8v2.4h3.51a9.61 9.61 0 0 1-1.522 1.988A9.537 9.537 0 0 1 12 21.6a9.537 9.537 0 0 1-6.788-2.812A9.537 9.537 0 0 1 2.4 12c0-2.564-2.4 0-2.4 0a11.96 11.96 0 0 0 3.515 8.485A11.959 11.959 0 0 0 12 24a11.96 11.96 0 0 0 8.485-3.515c.404-.404.776-.834 1.115-1.285v2.4H24v-7.2h-7.2Z"
    color={color}
    size={size}
  />
));
Sync.displayName = "Sync";
export default Sync;
