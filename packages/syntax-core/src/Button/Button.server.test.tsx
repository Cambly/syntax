/**
 * @vitest-environment node
 */
import Button from "./Button";
import { renderToString } from "react-dom/server";

describe("button - server", () => {
  it("renders on the server without any errors & is disabled before hydration", () => {
    const renderOnServer = () =>
      renderToString(
        <Button
          accessibilityLabel="Continue to the next step"
          text="Continue"
        ></Button>,
      );

    expect(renderOnServer).not.toThrow();
    expect(renderOnServer()).toContain("disabled");
    expect(renderOnServer()).toContain("Continue to the next step");
  });
});
