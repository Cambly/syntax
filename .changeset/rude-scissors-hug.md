---
"@cambly/syntax-core": minor
---

Allow persistent toast

For some features, we may want the toast to stay on the page. For this, we have added a `persistent` prop which ignores the value of `timeout` and causes an early return before the `setTimeout` that calls `setDisplayToast(false)`. Consumers wanting to use the new prop can set `persistent={true}` on their Toast. If the Toast should disappear from the page as before, no change is needed as the prop defaults to false.
