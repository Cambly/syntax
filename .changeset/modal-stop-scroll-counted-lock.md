---
"@cambly/syntax-core": patch
---

Modal StopScroll: lock body scroll with a shared counter so that only the last open `Modal` restores `document.body.style.overflow`. When two Modals unmounted in the same React commit (for example, a parent closing a nested confirm modal and itself in one event), the inner one restored the `"hidden"` value it saw on mount and left the page unable to scroll until refresh. The lock now saves the body's inline overflow on the first lock and restores it when the count returns to zero, so stylesheet rules apply again.
