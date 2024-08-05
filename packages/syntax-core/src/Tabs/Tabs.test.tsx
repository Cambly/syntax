import { screen, render } from "@testing-library/react";
import Tabs from "./Tabs";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";
import { createRef } from "react";
import Badge from "../Badge/Badge";
import TabButton from "../TabButton/TabButton";
import TabLink from "../TabLink/TabLink";

describe("tab bar", () => {
  it("sets an accessibility label", async () => {
    render(
      <Tabs accessibilityLabel="My custom tabs">
        <TabButton text="tab 1" selected onClick={vi.fn()} />
      </Tabs>,
    );
    const tabBar = await screen.findAllByLabelText("My custom tabs");
    expect(tabBar).toHaveLength(1);
  });
});

describe("button tabs", () => {
  it("renders successfully with button children", () => {
    render(
      <Tabs accessibilityLabel="My custom tabs">
        <TabButton text="tab 1" selected onClick={() => null} itemCount={10} />
        <TabButton
          text="tab 2"
          selected={false}
          onClick={() => null}
          endContent={<Badge text="New" />}
        />
        <TabButton text="tab 3" selected={false} onClick={vi.fn()} />
      </Tabs>,
    );
    expect(screen).toBeTruthy();
    expect(screen.getByText("10")).toBeTruthy();
    expect(screen.getByText("New")).toBeTruthy();
    expect(screen.getByText("tab 1")).toBeTruthy();
    expect(screen.getByText("tab 2")).toBeTruthy();
    expect(screen.getByText("tab 3")).toBeTruthy();
  });

  it("fires onChange when clicked", async () => {
    const handleChange = vi.fn();
    render(
      <Tabs accessibilityLabel="My tabs">
        <TabButton
          text="tab 1"
          selected
          onClick={handleChange}
          data-testid="tab-1"
        />
        <TabButton text="tab 2" selected={false} onClick={handleChange} />
        <TabButton text="tab 3" selected={false} onClick={handleChange} />
      </Tabs>,
    );
    const tab = await screen.findByTestId("tab-1");
    await userEvent.click(tab);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});

describe("link tabs", () => {
  it("renders successfully with link children", () => {
    render(
      <Tabs accessibilityLabel="My custom tabs">
        <TabLink
          text="tab 1"
          href=""
          selected
          onClick={vi.fn()}
          itemCount={10}
        />
        <TabLink
          text="tab 2"
          href=""
          selected={false}
          onClick={() => null}
          endContent={<Badge text="New" />}
        />
        <TabLink text="tab 3" href="" selected={false} onClick={vi.fn()} />
      </Tabs>,
    );
    expect(screen).toBeTruthy();
    expect(screen.getByText("10")).toBeTruthy();
    expect(screen.getByText("New")).toBeTruthy();
    expect(screen.getByText("tab 1")).toBeTruthy();
    expect(screen.getByText("tab 2")).toBeTruthy();
    expect(screen.getByText("tab 3")).toBeTruthy();
  });

  it("fires onChange when clicked", async () => {
    const handleChange = vi.fn();
    render(
      <Tabs accessibilityLabel="My custom tabs">
        <TabLink
          text="tab 1"
          href=""
          selected
          onClick={handleChange}
          data-testid="tab-1"
        />
        <TabLink text="tab 2" href="" selected={false} onClick={handleChange} />
        <TabLink text="tab 3" href="" selected={false} onClick={handleChange} />
      </Tabs>,
    );
    const tab = await screen.findByTestId("tab-1");
    await userEvent.click(tab);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("updates your browser's URL when clicked", async () => {
    render(
      <Tabs accessibilityLabel="My custom tabs">
        <TabLink
          text="tab 1"
          href="https://www.google.com"
          selected
          onClick={vi.fn()}
          data-testid="tab-1"
        />
      </Tabs>,
    );
    const tab = await screen.findByTestId("tab-1");
    expect(tab).toHaveAttribute("href", "https://www.google.com");
  });

  it("allows ref to be set", () => {
    const ref = createRef<HTMLAnchorElement>();

    render(
      <Tabs accessibilityLabel="My custom tabs">
        <TabLink
          text="tab 1"
          ref={ref}
          href="https://www.google.com"
          selected
          onClick={vi.fn()}
          data-testid="tab-1"
        />
      </Tabs>,
    );
    expect(ref.current instanceof HTMLAnchorElement).toBeTruthy();
    expect(ref.current?.getAttribute("data-testid")).toStrictEqual("tab-1");
  });
});
