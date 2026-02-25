import { render, screen, waitFor } from "@testing-library/react";
import Toast from "./Toast";
import { expect, vi } from "vitest";

describe("toast", () => {
  it("renders successfully", () => {
    render(<Toast heading="Attention" body="You're doing great :)" />);
    expect(screen).toBeTruthy();
  });
  it("renders text successfully", () => {
    render(<Toast heading="Attention" body="You're doing great :)" />);
    expect(screen.getByText(/Attention/)).toBeInTheDocument();
    expect(screen.getByText(/You're doing great/)).toBeInTheDocument();
  });
  it("sets the data-testid", () => {
    render(
      <Toast
        data-testid="toast-test-id"
        heading="Attention"
        body="You're doing great :)"
      />,
    );
    expect(screen.getByTestId("toast-test-id")).toBeInTheDocument();
  });

  describe("controlled mode", () => {
    it("shows toast when open is true", () => {
      render(
        <Toast heading="Success" body="Operation completed" open={true} />,
      );
      const toast = screen.getByText("Success");
      expect(toast).toBeInTheDocument();
    });

    it("hides toast when open is false", () => {
      render(
        <Toast
          data-testid="controlled-toast"
          heading="Success"
          body="Operation completed"
          open={false}
        />,
      );
      const toast = screen.getByTestId("controlled-toast");
      expect(toast).toHaveStyle({ display: "none" });
    });

    it("calls onDismiss after timeout", async () => {
      const onDismiss = vi.fn();
      render(
        <Toast
          heading="Success"
          body="Operation completed"
          open={true}
          onDismiss={onDismiss}
          timeout={100}
        />,
      );

      expect(onDismiss).not.toHaveBeenCalled();
      await waitFor(
        () => {
          expect(onDismiss).toHaveBeenCalledTimes(1);
        },
        { timeout: 200 },
      );
    });

    it("can be shown multiple times by toggling open prop", async () => {
      const onDismiss = vi.fn();
      const { rerender } = render(
        <Toast
          heading="Success"
          body="First message"
          open={true}
          onDismiss={onDismiss}
          timeout={100}
        />,
      );

      expect(screen.getByText("Success")).toBeInTheDocument();

      // Wait for auto-dismiss
      await waitFor(
        () => {
          expect(onDismiss).toHaveBeenCalledTimes(1);
        },
        { timeout: 200 },
      );

      // Hide the toast
      rerender(
        <Toast
          heading="Success"
          body="Second message"
          open={false}
          onDismiss={onDismiss}
          timeout={100}
        />,
      );

      // Show the toast again
      rerender(
        <Toast
          heading="Success"
          body="Second message"
          open={true}
          onDismiss={onDismiss}
          timeout={100}
        />,
      );

      expect(screen.getByText("Second message")).toBeInTheDocument();

      // Wait for second auto-dismiss
      await waitFor(
        () => {
          expect(onDismiss).toHaveBeenCalledTimes(2);
        },
        { timeout: 200 },
      );
    });

    it("does not start timeout when open is false", async () => {
      const onDismiss = vi.fn();
      render(
        <Toast
          heading="Success"
          body="Operation completed"
          open={false}
          onDismiss={onDismiss}
          timeout={100}
        />,
      );

      // Wait longer than timeout
      await new Promise((resolve) => setTimeout(resolve, 200));

      // onDismiss should not be called because toast is not open
      expect(onDismiss).not.toHaveBeenCalled();
    });
  });

  describe("uncontrolled mode (backward compatibility)", () => {
    it("shows toast initially and hides after timeout", async () => {
      render(
        <Toast
          data-testid="uncontrolled-toast"
          heading="Success"
          body="Operation completed"
          timeout={100}
        />,
      );

      const toast = screen.getByTestId("uncontrolled-toast");
      expect(toast).toHaveStyle({ display: "flex" });

      await waitFor(
        () => {
          expect(toast).toHaveStyle({ display: "none" });
        },
        { timeout: 200 },
      );
    });
  });
});
