import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const FlagUnfilled = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M22 3h-2c-.003.005-.378.52-1.006 1.02-.818.65-1.654.98-2.485.98-.987 0-1.774-.382-2.685-.823C12.686 3.625 11.397 3 9.514 3 7.463 3 5.389 4.08 4 5V2H2v20h2v-4.525c.34-.272.918-.706 1.628-1.135C7.077 15.463 8.42 15 9.515 15c1.422 0 2.4.474 3.436.976C13.99 16.48 15.063 17 16.51 17c2.868 0 4.82-1.465 4.9-1.528L22 15zm-8.176 11.177C12.686 13.625 11.397 13 9.514 13 7.463 13 5.389 14.08 4 15V7.475c.334-.267.897-.69 1.598-1.116C7.058 5.469 8.412 5 9.515 5c1.422 0 2.4.474 3.436.976C13.99 6.48 15.063 7 16.51 7c1.425 0 2.617-.609 3.491-1.25V14c-.478.296-1.779 1-3.491 1-.987 0-1.774-.382-2.685-.823Z"
    color={color}
    size={size}
  />
));
FlagUnfilled.displayName = "FlagUnfilled";
export default FlagUnfilled;
