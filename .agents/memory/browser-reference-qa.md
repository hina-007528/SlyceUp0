---
name: Browser reference QA
description: Avoid false dimension failures from Linux Chromium scrollbar behavior
---

For exact mobile Figma comparisons, account for the actual CSS layout viewport, not only the emulated screen width.

**Why:** Linux headless Chromium can reserve 15 pixels for a desktop-style vertical scrollbar during mobile-width emulation, unlike a phone's overlay scrollbar. This produced a false form-width mismatch despite the mobile screenshot matching.

**How to apply:** Use a browser configuration with phone-like overlay scrollbar behavior for reference-dimension tests; separately keep overflow checks and never hide user-facing scrollbars through site CSS to make tests pass.

Wait for external font stylesheets before waiting for font readiness in visual checks.

**Why:** Font readiness can resolve before a stylesheet has introduced its font faces, leaving an early measurement in a fallback font even though the page has mounted.

**How to apply:** Ensure font stylesheets have loaded, then await document font readiness before measuring typography or capturing reference screenshots.

Allow rendered layout to settle after changing viewport dimensions before measuring container-query-based spacing.

**Why:** Chromium returned the previous tablet frame's artwork bounds immediately after resizing across the desktop breakpoint, even though the settled desktop layout was correct.

**How to apply:** Poll for settled geometry after resizing; rendering frames alone can still return stale bounds. Use fresh browser contexts at each viewport to confirm suspected failures before changing the production layout.
