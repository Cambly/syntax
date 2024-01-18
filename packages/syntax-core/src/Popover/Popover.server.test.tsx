/**
 * @vitest-environment node
 */
import Popover from "./Popover";
import { renderToString } from "react-dom/server";

describe("chip - server", () => {
  it.each([
    <button key="button-trigger">My trigger</button>,
    <span key="span trigger">My trigger</span>,
    "My trigger",
  ])("renders on the server without any errors", (children) => {
    const renderOnServer = () =>
      renderToString(
        <Popover content={<span>My popover</span>}>{children}</Popover>,
      );

    expect(renderOnServer).not.toThrow();
    expect(renderOnServer()).toContain("My trigger");
    expect(renderOnServer()).not.toContain("My popover");
  });
});
