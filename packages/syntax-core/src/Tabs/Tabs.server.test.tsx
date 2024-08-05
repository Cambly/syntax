/**
 * @vitest-environment node
 */
import { renderToString } from "react-dom/server";
import Tabs from "./Tabs";
import TabButton from "../TabButton/TabButton";
import TabLink from "../TabLink/TabLink";

describe("button tabs - server", () => {
  it("renders on the server without any errors & is disabled before hydration", () => {
    const renderOnServer = () =>
      renderToString(
        <Tabs accessibilityLabel="My custom tabs">
          <TabButton text="tab 1" selected onClick={() => null} />
          <TabButton text="tab 2" selected={false} onClick={() => null} />
          <TabButton text="tab 3" selected={false} onClick={() => null} />
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
          <TabLink
            text="tab 1"
            href="https://www.google.com"
            selected
            onClick={() => null}
          />
          <TabLink
            text="tab 2"
            href="https://www.facebook.com"
            selected={false}
            onClick={() => null}
          />
          <TabLink
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
