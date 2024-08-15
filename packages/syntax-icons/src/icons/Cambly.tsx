import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Cambly = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "m22 15.716-.218.524-4.75-1.967.218-.525zm-5.734-.279-.53.53 3.637 3.636.53-.53zm-1.51 1.2-.906.375 1.97 4.757.907-.375zm-3.054 5.722h1.213v-5.152l-1.213-.001zm-.71-5.286-1.334-.555-1.976 4.77 1.335.554 1.976-4.77Zm-1.74-.821-1.186-1.188L4.41 18.72l1.186 1.187 3.655-3.655ZM2 10.938v2.14l5.191.002a5.233 5.233 0 0 1 9.957-3.074l4.747-1.966a10.37 10.37 0 0 0-11.007-6.302v3.133L9.69 1.975 7.071 3.062l1.31 3.176L5.96 3.816 4.116 5.66l2.85 2.85-3.72-1.533-.906 2.188 4.279 1.772zm5.195 2.155-4.788 1.983.732 1.765 4.786-1.983a5.2 5.2 0 0 1-.73-1.765";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Cambly.displayName = "Cambly";
export default Cambly;
