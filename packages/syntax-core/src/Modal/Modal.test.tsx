import { createPortal } from "react-dom";
import { screen, render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";
import Modal from "./Modal";

describe("modal", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <Modal
        header="title"
        onDismiss={() => {
          /* empty */
        }}
      >
        <p>text</p>
      </Modal>,
    );
    expect(baseElement).toBeTruthy();
  });

  it("renders children successfully", () => {
    render(
      <Modal
        header="title"
        onDismiss={() => {
          /* empty */
        }}
      >
        <p data-testid="modal-content-text">text</p>
      </Modal>,
    );
    const text = screen.getAllByTestId("modal-content-text");
    expect(text).toHaveLength(1);
  });

  it("fires onDismiss when X is clicked", async () => {
    const handleOnDismiss = vi.fn();

    render(
      <Modal header="title" onDismiss={handleOnDismiss}>
        <p>text</p>
      </Modal>,
    );

    const closeButton = screen.getByLabelText("close modal");
    await userEvent.click(closeButton);
    expect(handleOnDismiss).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "click",
      }),
    );
  });

  it("renders header text successfully", () => {
    render(
      <Modal
        header="title"
        onDismiss={() => {
          /* empty */
        }}
      >
        <p data-testid="modal-content-text">text</p>
      </Modal>,
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "title",
    );
  });

  it("renders footer buttons successfully", async () => {
    render(
      <Modal
        header="title"
        onDismiss={() => {
          /* empty */
        }}
        footer={<button data-testid="modal-confirm-button">confirm</button>}
      >
        <p>text</p>
      </Modal>,
    );
    const button = await screen.findAllByTestId("modal-confirm-button");
    expect(button).toHaveLength(1);
  });

  it("renders image successfully", async () => {
    render(
      <Modal
        header="title"
        image={<img src="https://placehold.co/400x200" alt="placeholder" />}
        onDismiss={() => {
          /* empty */
        }}
      >
        <p>text</p>
      </Modal>,
    );
    const image = await screen.findAllByAltText("placeholder");
    expect(image).toHaveLength(1);
  });

  it("renders Layer succesfully", async () => {
    render(
      <Modal
        header="title"
        onDismiss={() => {
          /* empty */
        }}
      >
        <p>text</p>
      </Modal>,
    );
    const layer = await screen.findAllByTestId("syntax-layer");
    expect(layer).toHaveLength(1);
  });

  it("renders StopScroll succesfully", () => {
    const { baseElement } = render(
      <Modal
        header="title"
        onDismiss={() => {
          /* empty */
        }}
      >
        <p>text</p>
      </Modal>,
    );
    expect(baseElement).toHaveStyle({ overflow: "hidden" });
  });

  it("renders FocusTrap succesfully", async () => {
    render(
      <Modal
        header="title"
        onDismiss={() => {
          /* empty */
        }}
      >
        <p>text</p>
      </Modal>,
    );
    const focusTrap = await screen.findAllByTestId("syntax-focus-trap");
    expect(focusTrap).toHaveLength(1);
  });

  it("focuses within the Modal correctly", async () => {
    render(
      <>
        <Modal
          header="title"
          onDismiss={() => {
            /* empty */
          }}
          accessibilityCloseLabel="close-button"
        >
          <>
            <p>text</p>
            <button data-testid="should-focus" />
          </>
        </Modal>
        ,
      </>,
    );
    await userEvent.tab();
    const button = screen.getByTestId("should-focus");
    expect(button).toHaveFocus();
  });

  it("does not bounce focus out of a react-aria overlay portalled outside the modal", () => {
    // Simulates the DOM react-aria produces for a Popover (e.g. DateRangePicker's
    // calendar): a sibling portal under document.body whose root carries
    // `data-trigger`. Without the FocusTrap escape hatch for `[data-trigger]`,
    // focusing anything inside the portal is bounced back into the Modal, which
    // breaks react-aria's internal FocusScope (e.g. collapses a date range to a
    // single day on first click in a DateRangePicker inside a Modal).
    render(
      <Modal header="title" onDismiss={() => {}}>
        <button type="button" data-testid="modal-first-focusable">
          first focusable
        </button>
      </Modal>,
    );

    const portalHost = document.createElement("div");
    portalHost.setAttribute("data-trigger", "DateRangePicker");
    const overlayButton = document.createElement("button");
    overlayButton.setAttribute("data-testid", "overlay-target");
    portalHost.appendChild(overlayButton);
    document.body.appendChild(portalHost);

    try {
      act(() => {
        overlayButton.focus();
      });
      expect(document.activeElement).toBe(overlayButton);
    } finally {
      portalHost.remove();
    }
  });

  it("does not bounce focus out of a portalled element with role=dialog", () => {
    render(
      <Modal header="title" onDismiss={() => {}}>
        <button type="button">first focusable</button>
      </Modal>,
    );

    const portalHost = document.createElement("div");
    portalHost.setAttribute("role", "dialog");
    const dialogButton = document.createElement("button");
    portalHost.appendChild(dialogButton);
    document.body.appendChild(portalHost);

    try {
      act(() => {
        dialogButton.focus();
      });
      expect(document.activeElement).toBe(dialogButton);
    } finally {
      portalHost.remove();
    }
  });

  it("still bounces focus out of unrelated elements outside the modal", () => {
    render(
      <>
        <Modal
          header="title"
          onDismiss={() => {}}
          accessibilityCloseLabel="close-button"
        >
          <button type="button">first focusable</button>
        </Modal>
        {createPortal(
          <button type="button" data-testid="outside-button">
            outside
          </button>,
          document.body,
        )}
      </>,
    );

    const outside = screen.getByTestId("outside-button");
    act(() => {
      outside.focus();
    });
    expect(document.activeElement).not.toBe(outside);
  });

  it("should not tab outside the Modal", async () => {
    render(
      <>
        <button data-testid="dont-focus" />
        <Modal
          header="title"
          onDismiss={() => {
            /* empty */
          }}
          accessibilityCloseLabel="close-button"
        >
          <p>text</p>
        </Modal>
        ,
      </>,
    );

    const closeButton = screen.getByLabelText("close-button");
    // first tab tabs back to "body", second tab stays inside the modal and doesn't go to the `dont-focus` button
    await userEvent.tab();
    await userEvent.tab();
    expect(closeButton).toHaveFocus();
  });

  it("has the right width for sm", () => {
    render(
      <Modal
        data-testid="modal-sm"
        header="title"
        onDismiss={() => {
          /* empty */
        }}
      >
        <p>text</p>
      </Modal>,
    );
    expect(screen.getByTestId("modal-sm")).toHaveStyle({
      width: "100%",
      maxWidth: "600px",
    });
  });

  it("has the right width for lg", () => {
    render(
      <Modal
        data-testid="modal-lg"
        header="title"
        onDismiss={() => {
          /* empty */
        }}
      >
        <p>text</p>
      </Modal>,
    );
    expect(screen.getByTestId("modal-lg")).toHaveStyle({
      width: "100%",
      maxWidth: "600px",
    });
  });
});
