import { type ComponentProps, forwardRef } from "react";
import Icon from "../../syntax-core/src/Icon/Icon";

const TeachingCertificate = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M10.8 10.8v2.4h-6v-2.4h6ZM4.8 6v2.4h14.4V6H4.8ZM24 18h-4.004c-.2.422-.47.807-.796 1.14v3.66l-3-1.2-3 1.2v-3.66a4.21 4.21 0 0 1-.796-1.14H0V1.2h24V18ZM21.6 3.6H2.4v12h9.643a4.2 4.2 0 0 1 8.314 0H21.6v-12Z"
    color={color}
    size={size}
  />
));
TeachingCertificate.displayName = "TeachingCertificate";
export default TeachingCertificate;
