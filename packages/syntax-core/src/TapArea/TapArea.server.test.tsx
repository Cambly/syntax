/**
 * @vitest-environment node
 */
import TapArea from "./TapArea";
import { renderToString } from "react-dom/server";

describe("tapArea - server", () => {
  it("renders on the server without any errors & is disabled before hydration", () => {
    const renderOnServer = () =>
      renderToString(
        <TapArea
          onClick={() => {
            /* empty */
          }}
        >
          <div>TapArea children</div>
        </TapArea>,
      );

    expect(renderOnServer).not.toThrow();
    expect(renderOnServer()).toContain("disabled");
    expect(renderOnServer()).toContain("TapArea children");
  });
});
