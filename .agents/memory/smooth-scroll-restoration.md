---
name: Smooth-scroll restoration
description: Prevent stale Lenis animations from undoing native fragment navigation
---

Cancel existing scroll easing before rebasing to a browser's native fragment or history position.

**Why:** Lenis resizing updates its target to the actual browser position without cancelling a running animation. A subsequent equal-target scroll request returns early, allowing the older animation to pull the page back. This was only apparent when fragment navigation happened before the previous animation fully settled.

**How to apply:** Treat native fragment restoration separately from animated navigation clicks: cancel the old easing, use the actual browser offset for position calculations, and preserve the restored position immediately. Verify rapid successive fragment navigation, not only links opened after all motion has finished.
