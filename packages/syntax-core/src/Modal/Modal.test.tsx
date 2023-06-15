import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";
import Modal from "./Modal";

describe("modal", () => {
  it("should render successfully", () => {
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

  it("should render children successfully", async () => {
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
    const text = await screen.findAllByText("text");
    expect(text).toHaveLength(1);
  });

  it("should fire onDismiss when X is clicked", async () => {
    const handleOnDismiss = vi.fn();

    const { baseElement } = render(
      <Modal header="title" onDismiss={handleOnDismiss}>
        <p>text</p>
      </Modal>,
    );

    // disabling because closeButton can't be accessed by react-testing-lib methods
    // eslint-disable-next-line testing-library/no-node-access
    const closeButton = baseElement.querySelector("button") as Element;
    // eslint-disable-next-line testing-library/no-await-sync-events
    await userEvent.click(closeButton);
    expect(handleOnDismiss).toHaveBeenCalledOnce();
  });

  it("should render header text successfully", async () => {
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
    const header = await screen.findAllByText("title");
    expect(header).toHaveLength(1);
  });

  it("should render footer buttons successfully", async () => {
    render(
      <Modal
        header="title"
        onDismiss={() => {
          /* empty */
        }}
        footer={<button>confirm</button>}
      >
        <p>text</p>
      </Modal>,
    );
    const button = await screen.findAllByText("confirm");
    expect(button).toHaveLength(1);
  });

  it("should render image successfully", async () => {
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

  it("should render Layer succesfully", async () => {
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
    // screen.debug();
    const layer = await screen.findAllByTestId("layer");
    expect(layer).toHaveLength(1);
  });

  it("should render StopScroll succesfully", () => {
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

  it("should render FocusTrap succesfully", async () => {
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
    const image = await screen.findAllByTestId("trap-focus");
    expect(image).toHaveLength(1);
  });
});
