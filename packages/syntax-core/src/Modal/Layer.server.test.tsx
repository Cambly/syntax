/**
 * @vitest-environment node
 */
import Layer from "./Layer";
import { renderToString } from "react-dom/server";

describe("layer - server", () => {
  it("renders on the server without any errors", () => {
    const renderOnServer = () =>
      renderToString(
        <Layer>
          <div data-testid="child">Content</div>
        </Layer>,
      );

    expect(renderOnServer).not.toThrow();
    expect(renderOnServer()).toStrictEqual("");
  });
});
