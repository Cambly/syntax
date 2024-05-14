import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const MultipleUsers = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M15.6 6a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0ZM3 7.2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm3 8.4-1.2-1.2L3 15.6l-1.8-1.2L0 15.6v6h3.6l2.4-6Zm15-8.4a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm3 8.4-1.2-1.2-1.8 1.2-1.8-1.2-1.2 1.2 2.4 6H24v-6ZM15.6 12l-1.2-1.2-2.4 2.4-2.4-2.4L8.4 12 6 21.6h12L15.6 12Z"
    color={color}
    size={size}
  />
));
MultipleUsers.displayName = "MultipleUsers";
export default MultipleUsers;
