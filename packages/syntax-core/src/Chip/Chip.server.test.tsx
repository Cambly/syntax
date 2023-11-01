/**
 * @vitest-environment node
 */
import { vi } from "vitest";
import Chip from "./Chip";
import { renderToString } from "react-dom/server";

describe("chip - server", () => {
  it("renders on the server without any errors & is disabled before hydration", () => {
    const renderOnServer = () =>
      renderToString(<Chip onChange={vi.fn()} text="Text on chip" />);

    expect(renderOnServer).not.toThrow();
    expect(renderOnServer()).toContain("disabled");
    expect(renderOnServer()).toContain("Text on chip");
  });
});
