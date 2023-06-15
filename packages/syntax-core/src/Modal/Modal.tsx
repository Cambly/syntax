import { type ReactElement } from "react";
import Heading from "../Heading/Heading";
import Box from "../Box/Box";

import FocusTrap from "./FocusTrap";
import StopScroll from "./StopScroll";
import Layer from "./Layer";
import styles from "./Modal.module.css";

function XIcon({ color = "#000" }: { color?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill={color}>
      <path
        fill="inherit"
        d="M11.25.758a.83.83 0 0 0-1.175 0L6 4.825 1.925.75A.83.83 0 1 0 .75 1.925L4.825 6 .75 10.075a.83.83 0 1 0 1.175 1.175L6 7.175l4.075 4.075a.83.83 0 1 0 1.175-1.175L7.175 6l4.075-4.075a.835.835 0 0 0 0-1.167Z"
      />
    </svg>
  );
}

// Note: Only sm + lg size currently. design thinks there should only be two sizes.
// If there IS a md size at some point, we should use the "size" const.
const ModalSizes = ["sm", "lg"] as const;

type ModalType = {
  /**
   * The children inside for the inside of a Modal.
   */
  children: JSX.Element;
  /**
   * The header inside a modal as a string.
   */
  header: string;
  /**
   * What the X button (or clicking out of the modal area) does.
   * Typically used for closing the Modal
   */
  onDismiss: () => void;
  /**
   * The optional image rendered above the Modal.
   * Image size should be 400w x 200h.
   * If images aren't that sized, should ask design to give another image.
   */
  image?: JSX.Element;
  /**
   * The footer for the bottom area of the Modal.
   * Typically used for rendering buttons.
   */
  footer?: JSX.Element;
  /**
   * The size of the card
   *
   * `sm`: 400px
   * `lg`: 600px
   *
   * @defaultValue sm
   */
  size?: (typeof ModalSizes)[number];
  /**
   * The z-index for the modal.
   * Typically used if there are other things on the page with higher z-index and you need this overlayed on top.
   * If two(2) buttons, put primary button first.
   *
   * @defaultValue 1
   */
  zIndex?: number;
  /**
   * Test id for the button
   */
  "data-testid"?: string;
};

/**
 * Modal is a dialog that appears on top of the main content and locks user interaction within the modal.
 *
 *
 */

export default function Modal({
  header,
  children,
  image,
  onDismiss,
  footer,
  size = "sm",
  zIndex = 1,
  "data-testid": dataTestId,
}: ModalType): ReactElement {
  const sizeWidth = {
    sm: 400,
    lg: 600,
  } as const;

  return (
    <Layer zIndex={zIndex}>
      <StopScroll>
        <FocusTrap>
          <div
            className={styles.backdrop}
            role="presentation"
            onClick={(e) => e.target === e.currentTarget && onDismiss()}
            onKeyDown={(e) => e.key === "Escape" && onDismiss()}
          >
            <Box
              data-testid={dataTestId}
              backgroundColor="white"
              rounding="xl"
              display="flex"
              direction="column"
              minWidth={240}
              maxWidth={sizeWidth[size]}
              width="100%"
              dangerouslySetInlineStyle={{ __style: { overflow: "hidden" } }}
            >
              <Box position="relative">
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={onDismiss}
                  style={
                    image
                      ? {
                          borderRadius: "50%",
                          backgroundColor: "rgba(0, 0, 0, 0.3)",
                        }
                      : {}
                  }
                >
                  <XIcon color={image ? "#fff" : "#000"} />
                </button>
              </Box>
              {image && <Box maxHeight={200}>{image}</Box>}
              <Box display="flex" gap={3} direction="column" padding={10}>
                <Heading as="h1" size={500}>
                  {header}
                </Heading>
                <div className={styles.content}>{children}</div>
                {footer && (
                  <Box
                    display="flex"
                    direction="column"
                    gap={3}
                    smDirection="row"
                    smJustifyContent="end"
                    lgDirection="row"
                    lgJustifyContent="end"
                  >
                    {footer}
                  </Box>
                )}
              </Box>
            </Box>
          </div>
        </FocusTrap>
      </StopScroll>
    </Layer>
  );
}

Modal.displayName = "Modal";
