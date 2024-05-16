import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const TextDocument = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M18.5 2h-13A1.5 1.5 0 0 0 4 3.5v17A1.5 1.5 0 0 0 5.5 22h13a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 18.5 2M12 15H7v-2h5zm5-4H7V9h10zm0-4H7V5h10z"
    color={color}
    size={size}
  />
));
TextDocument.displayName = "TextDocument";
export default TextDocument;
