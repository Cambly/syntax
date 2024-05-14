import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const AddNew = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M4.8 0v19.2H24V0H4.8Zm15.6 10.8h-4.8v4.8h-2.4v-4.8H8.4V8.4h4.8V3.6h2.4v4.8h4.8v2.4ZM21.6 24H0V2.4h2.4v19.2h19.2V24Z"
    color={color}
    size={size}
  />
));
AddNew.displayName = "AddNew";
export default AddNew;
