/**
 * @vitest-environment node
 */
import TextArea from "./TextArea";
import { renderToString } from "react-dom/server";

describe("textArea - server", () => {
  it("renders on the server without any errors & is disabled before hydration", () => {
    const renderOnServer = () =>
      renderToString(
        <TextArea
          label="Email"
          value="arthur@gmail.com"
          onChange={() => {
            /* empty */
          }}
        ></TextArea>,
      );

    expect(renderOnServer).not.toThrow();
    expect(renderOnServer()).toContain("disabled");
    expect(renderOnServer()).toContain("Email");
    expect(renderOnServer()).toContain("arthur@gmail.com");
  });
});
