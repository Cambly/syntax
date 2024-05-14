import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Translate = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M18 10h-2l-4 12h2l1-3h4l1 3h2zm-1 2.5 1.35 4.5h-2.7zM17 5v2h-3c0 1.099-.395 2.195-1.206 3.35-.642.912-1.45 1.706-2.094 2.35l-1.425 1.425L10.95 15.8l-1.4 1.4-1.675-1.675L4.7 18.7l-1.4-1.4 3.175-3.175-.432-.418C4.573 12.237 4 10.917 4 9h2c0 1.39.354 2.19 1.457 3.293l.418.432L9.3 11.3C10.443 10.157 12 8.586 12 7H2V5h6V2h2v3z"
    color={color}
    size={size}
  />
));
Translate.displayName = "Translate";
export default Translate;
