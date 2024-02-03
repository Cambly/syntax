/**
 * @vitest-environment node
 */
import RichSelectBox from "./RichSelectBox";
import { renderToString } from "react-dom/server";

const defaultRequiredProps = {
  onChange: () => undefined,
  accessibilityLabel: "x",
  primaryButtonText: "Save",
  primaryButtonAccessibilityLabel: "Save",
  secondaryButtonText: "Clear",
  secondaryButtonAccessibilityLabel: "Clear",
};

describe("richselectlist - server", () => {
  it("can render chips", () => {
    const renderOnServer = () =>
      renderToString(
        <RichSelectBox {...defaultRequiredProps}>
          <RichSelectBox.Chip label="Opt1" value="opt1" />
          <RichSelectBox.Chip label="Opt2" value="opt2" />
          <RichSelectBox.Chip label="Opt3" value="opt3" />
        </RichSelectBox>,
      );
    expect(renderOnServer).not.toThrow();
    expect(renderOnServer()).toContain("Opt1");
    expect(renderOnServer()).toContain("Opt2");
    expect(renderOnServer()).toContain("Opt3");
  });

  it("can render sections", () => {
    const renderOnServer = () =>
      renderToString(
        <RichSelectBox {...defaultRequiredProps}>
          <RichSelectBox.Section label="section1">
            <RichSelectBox.Chip label="Opt1" value="opt1" />
          </RichSelectBox.Section>
          <RichSelectBox.Section label="section2">
            <RichSelectBox.Chip label="Opt2" value="opt2" />
          </RichSelectBox.Section>
          <RichSelectBox.Section label="section3">
            <RichSelectBox.Chip label="Opt3" value="opt3" />
          </RichSelectBox.Section>
        </RichSelectBox>,
      );
    expect(renderOnServer).not.toThrow();
    expect(renderOnServer()).toContain("section1");
    expect(renderOnServer()).toContain("section2");
    expect(renderOnServer()).toContain("section3");
    expect(renderOnServer()).toContain("Opt1");
    expect(renderOnServer()).toContain("Opt2");
    expect(renderOnServer()).toContain("Opt3");
  });

  it("can render RadioButtons", () => {
    const renderOnServer = () =>
      renderToString(
        <RichSelectBox {...defaultRequiredProps}>
          <RichSelectBox.RadioButton
            label="Opt1"
            value="opt1"
            name="opt1name"
          />
          <RichSelectBox.RadioButton
            label="Opt2"
            value="opt2"
            name="opt2name"
          />
          <RichSelectBox.RadioButton
            label="Opt3"
            value="opt3"
            name="opt3name"
          />
        </RichSelectBox>,
      );
    expect(renderOnServer).not.toThrow();
    expect(renderOnServer()).toContain("Opt1");
    expect(renderOnServer()).toContain("Opt2");
    expect(renderOnServer()).toContain("Opt3");
  });
});
