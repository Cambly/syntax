/**
 * @vitest-environment node
 */
import Tooltip from "./Tooltip";
import { renderToString } from "react-dom/server";

describe("tooltip - server", () => {
  it.each([
    <button key="button-trigger">My trigger</button>,
    <span key="span-trigger">My trigger</span>,
    "My trigger",
  ])("renders on the server without any errors", (children) => {
    const renderOnServer = () =>
      renderToString(
        <Tooltip content={<span>My tooltip</span>}>{children}</Tooltip>,
      );

    expect(renderOnServer).not.toThrow();
    expect(renderOnServer()).toContain("My trigger");
    expect(renderOnServer()).not.toContain("My tooltip");
  });
});
