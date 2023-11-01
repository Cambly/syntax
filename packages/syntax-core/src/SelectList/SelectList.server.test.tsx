/**
 * @vitest-environment node
 */
import { vi } from "vitest";
import SelectList from "./SelectList";
import { renderToString } from "react-dom/server";

describe("selectList - server", () => {
  it("renders on the server without any errors & is disabled before hydration", () => {
    const renderOnServer = () =>
      renderToString(
        <SelectList
          data-testid="syntax-select"
          selectedValue=""
          onChange={vi.fn()}
          helperText="helper text"
          errorText={"error text"}
          label="SelectList label"
        >
          <SelectList.Option
            key={"key"}
            value={"value"}
            label={"SelectList.Option label"}
            data-testid={`syntax-select-label`}
          />
        </SelectList>,
      );

    expect(renderOnServer).not.toThrow();
    expect(renderOnServer()).toContain("disabled");
    expect(renderOnServer()).toContain("SelectList label");
    expect(renderOnServer()).toContain("SelectList.Option label");
  });
});
