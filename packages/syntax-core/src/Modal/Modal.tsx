import { type ReactElement } from "react";

import Heading from "../Heading/Heading";
import Box from "../Box/Box";

import FocusTrap from "./FocusTrap";
import StopScroll from "./StopScroll";
import Layer from "./Layer";
import styles from "./Modal.module.css";
import { type Size } from "../constants";
import IconButton from "../IconButton/IconButton";
import Divider from "../Divider/Divider";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
    >
      <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
    </svg>
  );
}

/**
 * [Modal](https://cambly-syntax.vercel.app/?path=/docs/components-modal--docs) is a dialog that appears on top of the main content and locks user interaction within the modal.
 *
 ```
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {showModal && <Modal
        header="header text"
        onDismiss={() => setShowModal(false)}
        footer={
          <>
            <Button
              text="Cancel"
              color="secondary"
              onClick={() => {}}
            />
            <Button
              text="Confirm"
              onClick={() => {}}
            />
          </>
        }
      >
        <Typography>
          Body text goes here!
        </Typography>
      </Modal> }
    </>
  )
  ```
 */
export default function Modal({
  header,
  children,
  image,
  onDismiss,
  footer,
  accessibilityCloseLabel = "close modal",
  zIndex = 1,
  size = "md",
  "data-testid": dataTestId,
}: {
  /**
   * The modal's main content. Should typically take in `Typography`'d text.
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
   * Image
   *  * Size should be 600w x 200h
   *  * Be sure to set width="100%" on the image
   * If images aren't that sized, should ask design to give another image.
   */
  image?: JSX.Element;
  /**
   * The footer for the bottom area of the Modal. Typically used for rendering buttons.
   * * Use Syntax `Button` and pass it into footer.
   * * If one button, just pass it in. If two, wrap in a React fragment (`<> </>`)
   * * If two(2) buttons, put primary button _second_.
   *
      <>
        <Button
          text="Cancel"
          color="secondary"
          onClick={() => {}}
        />
        <Button
          text="Confirm"
          onClick={() => {}}
        />
      </>
   */
  footer?: JSX.Element;
  /**
   * The accessibilty text on the close button.
   * (Sets the aria-label of the button)
   *
   *
   * @defaultValue close modal
   */
  accessibilityCloseLabel?: string;
  /**
   * The z-index for the modal.
   * Typically used if there are other things on the page with higher z-index and you need this overlayed on top.
   *
   * @defaultValue 0
   */
  zIndex?: number;
  /**
   * The size of the modal
   *
   * * `sm`: 480px max-width
   * * `md`: 600px max-width
   * * `lg`: 800px max-width
   *
   * @defaultValue "md"
   */
  size?: (typeof Size)[number];
  /**
   * Test id for the modal
   */
  "data-testid"?: string;
}): ReactElement {
  const maxWidthMap = {
    sm: 480,
    md: 600,
    lg: 880,
  };

  return (
    <Layer zIndex={zIndex}>
      <StopScroll>
        <FocusTrap>
          <div
            className={styles.backdrop}
            role="presentation"
            onMouseDown={(e) => e.target === e.currentTarget && onDismiss()}
            onKeyDown={(e) => e.key === "Escape" && onDismiss()}
          >
            <Box
              data-testid={dataTestId}
              backgroundColor="gray100"
              rounding="md"
              display="flex"
              marginStart={4}
              marginEnd={4}
              marginTop={8}
              marginBottom={8}
              minWidth={240}
              maxHeight="calc(100vh - 64px)"
              maxWidth={maxWidthMap[size]}
              overflow="hidden"
              position="relative"
              width="100%"
            >
              {image && (
                <Box
                  position="absolute"
                  dangerouslySetInlineStyle={{
                    __style: { top: 4, right: 4 },
                  }}
                >
                  <IconButton
                    accessibilityLabel={accessibilityCloseLabel}
                    color="primary"
                    on="darkBackground"
                    onClick={onDismiss}
                    size="sm"
                    icon={XIcon}
                  />
                </Box>
              )}

              <Box display="flex" direction="column" width="100%">
                {image && <Box>{image}</Box>}
                <Box
                  padding={4}
                  width="100%"
                  direction="row"
                  display="flex"
                  gap={1}
                  justifyContent="between"
                >
                  <Heading as="h1" size={400}>
                    {header}
                  </Heading>
                  {!image && (
                    <IconButton
                      accessibilityLabel={accessibilityCloseLabel}
                      color="tertiary"
                      on="lightBackground"
                      onClick={onDismiss}
                      size="sm"
                      icon={XIcon}
                    />
                  )}
                </Box>
                {!image && (
                  <Box
                    display="flex"
                    direction="column"
                    width="100%"
                    paddingX={4}
                  >
                    <Divider />
                  </Box>
                )}
                <Box
                  height="100%"
                  overflowY="auto"
                  paddingX={4}
                  paddingY={image ? 0 : 4}
                  marginBottom={image ? 4 : 0}
                >
                  {children}
                </Box>
                {footer && (
                  <Box
                    display="flex"
                    direction="column"
                    gap={3}
                    smDirection="row"
                    smJustifyContent="end"
                    lgDirection="row"
                    lgJustifyContent="end"
                    padding={4}
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
