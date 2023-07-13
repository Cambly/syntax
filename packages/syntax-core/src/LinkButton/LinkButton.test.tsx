import { screen, render } from "@testing-library/react";
import LinkButton from "./LinkButton";

describe("linkbutton", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <a href="https://www.google.com">
        <LinkButton text="button" />,
      </a>,
    );
    expect(baseElement).toBeTruthy();
  });
  it("renders the text", async () => {
    render(
      <a href="https://www.google.com">
        <LinkButton text="button" />
      </a>,
    );
    const linkButton = await screen.findAllByText("button");
    expect(linkButton).toHaveLength(1);
  });
  it("has the correct href", async () => {
    render(
      <a href="https://www.google.com" data-testid="a-test-id">
        <LinkButton text="button" />
      </a>,
    );
    const linkButton = await screen.findByTestId("a-test-id");
    expect(linkButton).toHaveAttribute("href", "https://www.google.com");
  });
  it("sets the correct data-testid", async () => {
    render(
      <a href="https://www.google.com">
        <LinkButton text="button" data-testid="linkButton-test-id" />
      </a>,
    );
    const linkButton = await screen.findByTestId("linkButton-test-id");
    expect(linkButton).toBeInTheDocument();
  });
});
