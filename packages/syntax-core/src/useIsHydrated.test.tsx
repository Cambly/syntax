import { render } from "@testing-library/react";
import useIsHydrated from "./useIsHydrated";
import { vi } from "vitest";
import { screen } from "@testing-library/react";

describe("useIsHydrated", () => {
  it("correctly sets the hydration", () => {
    const callback = vi.fn();

    function MyComponent() {
      const isMounted = useIsHydrated();
      callback(isMounted);
      return (
        <div data-testid="hydration-test-element" data-is-hydrated={true}>
          Hey
        </div>
      );
    }

    render(<MyComponent />);
    expect(callback.mock.calls).toStrictEqual([
      // Not hydrated yet
      [false],
      // Hydrated after the useEffect fires
      [true],
    ]);
    expect(screen.getByTestId("hydration-test-element")).toHaveAttribute(
      "data-is-hydrated",
      "true",
    );
  });
});
