---
"@cambly/syntax-core": minor
---

Typography: add an optional `lineHeight` prop (`"default" | "paragraph"`). `"paragraph"` applies a 150% line-height to any element, not just `as="p"` — combined with `size={400}` and `weight="medium"` this is the new `400-medium-paragraph` text style from Figma, for 25px text used as multi-line prose where the default 115% heading line-height is too tight. The mobile and desktop Figma styles are identical, so no breakpoint rule is needed. `"default"` is the existing behaviour, unchanged. To make this work for serif headings, the `:lang(…) .serif` rule now reads its line-height through a `--syntax-typography-line-height` custom property (defaulting to the previous `1.15em`), since that selector outranks a single-class rule.
