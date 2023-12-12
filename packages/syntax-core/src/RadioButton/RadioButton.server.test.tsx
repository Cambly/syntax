/**
 * @vitest-environment node
 */
import RadioButton from "./RadioButton";
import { renderToString } from "react-dom/server";

describe("radioButton - server", () => {
  it("renders on the server without any errors & is disabled before hydration", () => {
    const renderOnServer = () =>
      renderToString(
        <RadioButton
          label="RadioButton label"
          name="radio-button"
          value="radio-button-value"
          onChange={() => {
            /* empty */
          }}
        />,
      );

    expect(renderOnServer).not.toThrow();
    expect(renderOnServer()).toContain("disabled");
    expect(renderOnServer()).toContain("RadioButton label");
  });
});
