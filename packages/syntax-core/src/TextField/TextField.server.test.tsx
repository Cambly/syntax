/**
 * @vitest-environment node
 */
import TextField from "./TextField";
import { renderToString } from "react-dom/server";

describe("textField - server", () => {
  it("renders on the server without any errors & is disabled before hydration", () => {
    const renderOnServer = () =>
      renderToString(
        <TextField
          label="Email"
          value="arthur@gmail.com"
          onChange={() => {
            /* empty */
          }}
        ></TextField>,
      );

    expect(renderOnServer).not.toThrow();
    expect(renderOnServer()).toContain("disabled");
    expect(renderOnServer()).toContain("Email");
    expect(renderOnServer()).toContain("arthur@gmail.com");
  });
});
