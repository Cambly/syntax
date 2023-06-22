import { useEffect, type ReactElement } from "react";

export default function StopScroll(props: {
  children: ReactElement;
}): ReactElement {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return props.children;
}
