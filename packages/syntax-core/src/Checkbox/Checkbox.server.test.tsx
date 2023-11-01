/**
 * @vitest-environment node
 */
import Checkbox from "./Checkbox";
import { renderToString } from "react-dom/server";

describe("checkbox - server", () => {
  it("renders on the server without any errors & is disabled before hydration", () => {
    const renderOnServer = () =>
      renderToString(
        <Checkbox
          checked
          label="Checkbox label"
          onChange={() => {
            /* empty */
          }}
        />,
      );

    expect(renderOnServer).not.toThrow();
    expect(renderOnServer()).toContain("disabled");
    expect(renderOnServer()).toContain("Checkbox label");
  });
});
