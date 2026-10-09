import { transform } from "@svgr/core";
import { readFile } from "node:fs/promises";
import path from "node:path";
import iconTemplate from "./iconTemplate";

// Mirrors the options generateIcons.ts passes, so these tests exercise the
// template through the same svgo + jsx pipeline the script uses.
const SVGR_OPTIONS = {
  plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
  icon: true,
  typescript: true,
  template: iconTemplate,
} as const;

function generate(svg: string, componentName: string): Promise<string> {
  return transform(svg, SVGR_OPTIONS, { componentName });
}

const wrap = (body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${body}</svg>`;

// Leads with `fill`, like privacy.svg does. Reading attributes positionally
// picked up the color instead of the path data.
const LEADING_FILL = wrap(
  `<path fill="#fff" d="M1 11a4 4 0 0 1 4-4h10v10H5a4 4 0 0 1-4-4v-2Z"/>`,
);

describe("iconTemplate", () => {
  it("reads the path data by name when `fill` comes first", async () => {
    const output = await generate(LEADING_FILL, "Checkmark");

    expect(output).toMatch(/const path = "M1 11a4/);
    expect(output).not.toContain("#fff");
  });

  it("adds rtlMirror to directional icons", async () => {
    const output = await generate(LEADING_FILL, "ArrowLeft");

    expect(output).toContain("rtlMirror");
  });

  it("leaves rtlMirror off non-directional icons", async () => {
    const output = await generate(LEADING_FILL, "Checkmark");

    expect(output).not.toContain("rtlMirror");
  });

  it("rejects an icon whose shapes svgo cannot merge into one path", async () => {
    // svgo merges same-styled paths before the template runs, so only a
    // genuinely multicolor icon reaches this guard. privacy.svg is one.
    const privacy = await readFile(
      path.resolve(__dirname, "../../svgs/privacy.svg"),
      "utf8",
    );

    await expect(generate(privacy, "Privacy")).rejects.toThrow(
      /Privacy: expected exactly one element inside <svg>, found 4/,
    );
  });

  it("rejects an icon with no <path>", async () => {
    await expect(
      generate(wrap(`<circle cx="12" cy="12" r="10"/>`), "Circle"),
    ).rejects.toThrow(/Circle: could not find a <path d="\.\.\."> in the SVG/);
  });
});

describe("hand-authored icons", () => {
  it("keeps Privacy out of the generated single-path shape", async () => {
    const source = await readFile(
      path.resolve(__dirname, "../icons/Privacy.tsx"),
      "utf8",
    );

    // Regenerating Privacy would flatten it to one tinted path and lose the
    // check and cross, so it must stay excluded via MULTICOLOR_ICONS.
    expect(source).not.toMatch(/const path = /);
    expect(source).toContain(`fill="#fff"`);
    expect(source).toContain(`fill="#06F"`);
  });
});
