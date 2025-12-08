---
"@cambly/syntax-core": major
---

Change the behavior of "roomy" for the Card component without changing the default behavior

Changes the behavior of the `roomy` prop to give a Card a padding of 24px rather than 16px. Note that the default behavior has not changed; the default continues to be a padding of 16px (now called `medium`).

We would like our cards to have a padding of 24px going forward so we have changed the meaning of `roomy` to now mean 24px. There are no cards that actually use the `roomy` prop in any Cambly codebases so this change should not actually change the look of any cards. Existing cards with a padding of 16px just used the default, and since the default is still 16px (now called `medium`), those cards will keep that padding.

How consumers should update their code:
Per the above, no updates should be necessary to existing components, because no existing cards have the `roomy` prop explicitly set. However, if a card is used with a `roomy` prop now, it will have a 24px padding rather than a 16px padding. Therefore, if a 24px padding is desired, the `roomy` prop should be used. If a 16px padding is desired, the default Card will still achieve that, or the `medium` prop can be used. If an 8px padding is desired, the `compact` prop can be used as before.