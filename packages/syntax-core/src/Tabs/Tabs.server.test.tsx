/**
 * @vitest-environment node
 */
import { renderToString } from "react-dom/server";
import Tabs from "./Tabs";

describe("button tabs - server", () => {
  it("renders on the server without any errors & is disabled before hydration", () => {
    const renderOnServer = () =>
      renderToString(
        <Tabs accessibilityLabel="My custom tabs">
          <Tabs.Button text="tab 1" selected onClick={() => null} />
          <Tabs.Button text="tab 2" selected={false} onClick={() => null} />
          <Tabs.Button text="tab 3" selected={false} onClick={() => null} />
        </Tabs>,
      );

    expect(renderOnServer).not.toThrow();
  });
});

describe("link tabs - server", () => {
  it("renders on the server without any errors & is disabled before hydration", () => {
    const renderOnServer = () =>
      renderToString(
        <Tabs accessibilityLabel="My custom tabs">
          <Tabs.Link
            text="tab 1"
            href="https://www.google.com"
            selected
            onClick={() => null}
          />
          <Tabs.Link
            text="tab 2"
            href="https://www.facebook.com"
            selected={false}
            onClick={() => null}
          />
          <Tabs.Link
            text="tab 3"
            href="https://www.twitter.com"
            selected={false}
            onClick={() => null}
          />
        </Tabs>,
      );

    expect(renderOnServer).not.toThrow();
  });
});
