import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const FlagFilled = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M24 1.2h-2.4a7.032 7.032 0 0 1-1.207 1.223c-.982.781-1.985 1.177-2.983 1.177-1.183 0-2.128-.458-3.221-.988C12.823 1.95 11.276 1.2 9.018 1.2 6.554 1.2 4.066 2.496 2.4 3.6V0H0v24h2.4v-5.43a18.805 18.805 0 0 1 1.954-1.362c1.738-1.052 3.35-1.608 4.664-1.608 1.707 0 2.88.57 4.124 1.172C14.387 17.376 15.676 18 17.41 18c3.443 0 5.784-1.758 5.882-1.833L24 15.6V1.2Z"
    color={color}
    size={size}
  />
));
FlagFilled.displayName = "FlagFilled";
export default FlagFilled;
