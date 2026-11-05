import { useEffect, type ReactElement } from "react";

// Counted so nested modals unmounting in the same commit don't restore the
// "hidden" value the inner one saw; only the last unlock restores the body.
let lockCount = 0;
let savedOverflow = "";

export default function StopScroll(props: {
  children: ReactElement;
}): ReactElement {
  useEffect(() => {
    if (lockCount === 0) {
      savedOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    lockCount += 1;
    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = savedOverflow;
      }
    };
  }, []);

  return props.children;
}
