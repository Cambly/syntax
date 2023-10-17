/**
 * @vitest-environment node
 */
import IconButton from "./IconButton";
import { renderToString } from "react-dom/server";
import Star from "@mui/icons-material/Star";

describe("iconButton - server", () => {
  it("renders on the server without any errors & is disabled before hydration", () => {
    const renderOnServer = () =>
      renderToString(
        <IconButton
          icon={Star}
          accessibilityLabel="Continue to the next step"
        ></IconButton>,
      );

    expect(renderOnServer).not.toThrow();
    expect(renderOnServer()).toContain("disabled");
    expect(renderOnServer()).toContain("Continue to the next step");
  });
});
