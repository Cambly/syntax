---
"@cambly/syntax-core": major
---

WHAT the breaking change is
Card's "size" prop now defaults to undefined instead of 352px when it's not specified.

WHY the change was made
Card cannot be used if you want to render it with a width larger than 744px (size="lg").

HOW a consumer should update their code
If you haven't specified a prop size, explicitly update to use size="sm" unless you would like to stretch it to the width of the container.
