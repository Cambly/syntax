---
"@cambly/syntax-core": major
---

WHAT the breaking change is
Card's "size" prop is being deprecated.

WHY the change was made
Card cannot be used if you want to render it with a width larger than 744px (size="lg"). We should just have the width stretch to its parent's container.

HOW a consumer should update their code
Those using a Card with size="sm" should wrap it with a Box of maxWidth={352}, those using a card with size="lg" should wrap it with a Box of maxWidth{744}.
