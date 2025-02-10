import { type ComponentProps, useEffect, useState } from "react";
import Box from "../Box/Box";
import Typography from "../Typography/Typography";
import type InternalIcon from "../Icon/Icon";

function typographyColor({
  on,
}: {
  on: "lightBackground" | "darkBackground";
}): "white" | "gray900" {
  return on === "lightBackground" ? "white" : "gray900";
}

type ToastProps = {
  /**
   * The optional text of the toast under the heading
   */
  body?: string;
  /**
   * Test id for the toast
   */
  "data-testid"?: string;
  heading: string;
  /**
   * The icon to be displayed. Please use a [Material Icon](https://material.io/resources/icons/)
   */
  icon?:
    | React.ComponentType<{ className?: string }>
    | React.ComponentType<ComponentProps<typeof InternalIcon>>;
  /**
  /**
   * Indicate whether the toast renders on a light or dark background. Changes the color of the toast
   *
   * @defaulValue `lightBackground`
   */
  on?: "lightBackground" | "darkBackground";
  /**
   * The number of milliseconds to wait before automatically dismissing the toast
   *
   * @defaultValue 5000
   */
  timeout?: number;
};
/**
 * [Toast](https://cambly-syntax.vercel.app/?path=/docs/components-toast--docs) is a component to display a small, dismissible notification.
 */

export default function Toast({
  body,
  "data-testid": dataTestId,
  heading,
  icon: Icon,
  on = "lightBackground",
  timeout = 5000,
}: ToastProps): JSX.Element {
  const [displayToast, setDisplayToast] = useState<boolean>(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDisplayToast(false);
    }, timeout);
    return () => clearTimeout(timeoutId);
  }, [timeout]);

  return (
    <Box
      position="fixed"
      width="fit-content"
      marginStart="auto"
      marginEnd="auto"
      padding={4}
      rounding="md"
      display={displayToast ? "flex" : "none"}
      gap={5}
      alignItems="center"
      backgroundColor={on === "lightBackground" ? "gray900" : "white"}
      dangerouslySetInlineStyle={{
        __style: {
          left: 0,
          right: 0,
          bottom: 50,
          boxShadow: "0px 16px 32px 0px rgba(0, 0, 0, 0.25)",
        },
      }}
      data-testid={dataTestId}
    >
      {Icon && <Icon color={typographyColor({ on })} size={400} />}
      <Box display="flex" direction="column" gap={1}>
        <Typography
          size={300}
          weight="semiBold"
          color={typographyColor({ on })}
        >
          {heading}
        </Typography>
        {body && (
          <Typography lineClamp={2} color={typographyColor({ on })}>
            {body}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
