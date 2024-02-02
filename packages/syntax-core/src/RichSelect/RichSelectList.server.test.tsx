/**
 * @vitest-environment node
 */
import RichSelectList from "./RichSelectList";
import { renderToString } from "react-dom/server";

const defaultRequiredProps = {
  onChange: () => undefined,
  label: "x",
  primaryButtonText: "Save",
  primaryButtonAccessibilityLabel: "Save",
  secondaryButtonText: "Clear",
  secondaryButtonAccessibilityLabel: "Clear",
};

describe("richselectbox - server", () => {
  it("can render chips", () => {
    const renderOnServer = () =>
      renderToString(
        <RichSelectList {...defaultRequiredProps}>
          <RichSelectList.Chip label="Opt1" value="opt1" />
          <RichSelectList.Chip label="Opt2" value="opt2" />
          <RichSelectList.Chip label="Opt3" value="opt3" />
        </RichSelectList>,
      );
    expect(renderOnServer).not.toThrow();
    // popover is hidden, not in document
    expect(renderOnServer()).not.toContain("Opt1");
    expect(renderOnServer()).not.toContain("Opt2");
    expect(renderOnServer()).not.toContain("Opt3");
  });

  it("can render sections", () => {
    const renderOnServer = () =>
      renderToString(
        <RichSelectList {...defaultRequiredProps}>
          <RichSelectList.Section label="section1">
            <RichSelectList.Chip label="Opt1" value="opt1" />
          </RichSelectList.Section>
          <RichSelectList.Section label="section2">
            <RichSelectList.Chip label="Opt2" value="opt2" />
          </RichSelectList.Section>
          <RichSelectList.Section label="section3">
            <RichSelectList.Chip label="Opt3" value="opt3" />
          </RichSelectList.Section>
        </RichSelectList>,
      );
    expect(renderOnServer).not.toThrow();
    // popover is hidden, not in document
    expect(renderOnServer()).not.toContain("section1");
    expect(renderOnServer()).not.toContain("section2");
    expect(renderOnServer()).not.toContain("section3");
    expect(renderOnServer()).not.toContain("Opt1");
    expect(renderOnServer()).not.toContain("Opt2");
    expect(renderOnServer()).not.toContain("Opt3");
  });

  it("can render RadioButtons", () => {
    const renderOnServer = () =>
      renderToString(
        <RichSelectList {...defaultRequiredProps}>
          <RichSelectList.RadioButton
            label="Opt1"
            value="opt1"
            name="opt1name"
          />
          <RichSelectList.RadioButton
            label="Opt2"
            value="opt2"
            name="opt2name"
          />
          <RichSelectList.RadioButton
            label="Opt3"
            value="opt3"
            name="opt3name"
          />
        </RichSelectList>,
      );
    expect(renderOnServer).not.toThrow();
    // popover is hidden, not in document
    expect(renderOnServer()).not.toContain("Opt1");
    expect(renderOnServer()).not.toContain("Opt2");
    expect(renderOnServer()).not.toContain("Opt3");
  });
});
