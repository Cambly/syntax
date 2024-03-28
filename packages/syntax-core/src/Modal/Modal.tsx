import { type ReactElement } from "react";
import classnames from "classnames";

import Heading from "../Heading/Heading";
import Box from "../Box/Box";

import FocusTrap from "./FocusTrap";
import StopScroll from "./StopScroll";
import Layer from "./Layer";
import styles from "./Modal.module.css";
import { useTheme } from "../ThemeProvider/ThemeProvider";
import IconButton from "../IconButton/IconButton";

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

function XIconCambio({ className }: { className?: string }) {
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

// Note: Only sm + lg size currently. design thinks there should only be two sizes.
// If there IS a md size at some point, we should use the "size" const.
const sizeWidth = {
  sm: 400,
  lg: 600,
} as const;

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
  size = "sm",
  zIndex = 1,
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
   * The size of the card
   *
   * Classic:
   * * `sm`: 400px (Classic only)
   * * `lg`: 600px
   *
   * Cambio:
   * * `lg`: 600px
   *
   *
   * @defaultValue sm
   */
  size?: keyof typeof sizeWidth;
  /**
   * The z-index for the modal.
   * Typically used if there are other things on the page with higher z-index and you need this overlayed on top.
   *
   * @defaultValue 0
   */
  zIndex?: number;
  /**
   * Test id for the modal
   */
  "data-testid"?: string;
}): ReactElement {
  const { themeName } = useTheme();
  return (
    <Layer zIndex={zIndex}>
      <StopScroll>
        <FocusTrap>
          <div
            className={classnames(
              styles.backdrop,
              themeName === "classic"
                ? styles.backdropClassic
                : styles.backdropCambio,
            )}
            role="presentation"
            onClick={(e) => e.target === e.currentTarget && onDismiss()}
            onKeyDown={(e) => e.key === "Escape" && onDismiss()}
          >
            <Box
              data-testid={dataTestId}
              backgroundColor="white"
              rounding={themeName === "classic" ? "xl" : "md"}
              display="flex"
              direction="column"
              marginStart={4}
              marginEnd={4}
              marginTop={8}
              marginBottom={8}
              minWidth={240}
              maxWidth={sizeWidth[themeName === "classic" ? size : "lg"]}
              width="100%"
              dangerouslySetInlineStyle={{
                __style: {
                  overflow: "hidden",
                  maxHeight: "calc(100vh - 64px)",
                },
              }}
            >
              <Box position="relative">
                {themeName === "classic" ? (
                  <button
                    aria-label={accessibilityCloseLabel}
                    type="button"
                    className={classnames(
                      styles.closeButton,
                      styles.closeButtonClassic,
                      {
                        [styles.closeButtonWithImage]: !!image,
                      },
                    )}
                    onClick={onDismiss}
                  >
                    <XIcon color={image ? "#fff" : "#000"} />
                  </button>
                ) : (
                  <Box
                    position="absolute"
                    dangerouslySetInlineStyle={{
                      __style: { top: 4, right: 4 },
                    }}
                  >
                    <IconButton
                      accessibilityLabel={accessibilityCloseLabel}
                      color={image ? "primary" : "tertiary"}
                      on={image ? "darkBackground" : "lightBackground"}
                      onClick={onDismiss}
                      size="sm"
                      icon={XIconCambio}
                    />
                  </Box>
                )}
              </Box>
              {image && <Box>{image}</Box>}
              <Box
                display="flex"
                gap={themeName === "classic" ? 3 : 4}
                direction="column"
                padding={themeName === "classic" ? 9 : 6}
              >
                <Heading
                  as="h1"
                  size={themeName === "classic" ? 500 : 600}
                  fontStyle={themeName === "classic" ? "sans-serif" : "serif"}
                >
                  {header}
                </Heading>
                <Box
                  marginBottom={themeName === "classic" ? 4 : 0}
                  maxHeight={"calc(100vh - 232px)"} // 232x is combined height of header/footer/padding/margin
                  overflowY="scroll"
                >
                  {children}
                </Box>
                {footer && (
                  <Box
                    display="flex"
                    direction="column"
                    gap={3}
                    marginTop={themeName === "classic" ? 0 : 2}
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
