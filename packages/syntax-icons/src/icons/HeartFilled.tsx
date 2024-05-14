import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";

const HeartFilled = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="m12 22.77-.345-.099a17.406 17.406 0 0 1-8.223-5.392 15.104 15.104 0 0 1-2.503-4.14A12.78 12.78 0 0 1 0 8.4c0-.318.032-1.171.324-2.207.296-1.05.756-1.926 1.367-2.608C2.954 2.07 4.777 1.2 6.7 1.2c.867 0 1.711.185 2.51.55.78.356 1.478.865 2.076 1.515.264.287.503.607.715.935.212-.328.451-.648.715-.935a6.454 6.454 0 0 1 2.076-1.515c.799-.365 1.643-.55 2.51-.55 1.922 0 3.746.869 5.008 2.385.611.682 1.072 1.559 1.367 2.608A8.43 8.43 0 0 1 24 8.4c0 1.595-.313 3.189-.929 4.738a15.104 15.104 0 0 1-2.503 4.141 17.406 17.406 0 0 1-8.223 5.392L12 22.77Z"
    color={color}
    size={size}
  />
));
HeartFilled.displayName = "HeartFilled";
export default HeartFilled;
