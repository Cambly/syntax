import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const TextDocument = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M19.8 0H4.2a1.8 1.8 0 0 0-1.8 1.8v20.4A1.8 1.8 0 0 0 4.2 24h15.6a1.8 1.8 0 0 0 1.8-1.8V1.8A1.8 1.8 0 0 0 19.8 0ZM12 15.6H6v-2.4h6v2.4Zm6-4.8H6V8.4h12v2.4ZM18 6H6V3.6h12V6Z"
    color={color}
    size={size}
  />
));
TextDocument.displayName = "TextDocument";
export default TextDocument;
