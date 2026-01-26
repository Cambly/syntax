---
"@cambly/syntax-core": minor
---

Allow z-index to be passed into the Toast component

Allows a new `zIndex` prop to be passed to the Toast component. 

We sometimes need to ensure our Toast appears above elements that have a z-index greater than 0. In those cases, we can now specify the z-index of the Toast to make sure it appears above those elements. 

How consumers should update their code:
If the default z-index of zero is fine, no updates need to be made. If the consumer would like to specify a z-index other than zero, they can pass a `zIndex` prop when using the Toast component.
