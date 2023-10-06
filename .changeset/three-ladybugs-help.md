---
"@cambly/syntax-core": major
---

WHAT the breaking change is
Card's "size" prop is being replaced by the maxWidth prop.

WHY the change was made
Card cannot be used if you want to render it with a width larger than 744px (size="lg"). In general, it's not as flexible as it could be.

HOW a consumer should update their code
Those using size="sm" should replace it with maxWidth="352px", those using size="lg" should replace it with maxWidth="744px".
