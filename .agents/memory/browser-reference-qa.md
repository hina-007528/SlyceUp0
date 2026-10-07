---
name: Browser reference QA
description: Avoid false dimension failures from Linux Chromium scrollbar behavior
---

For exact mobile Figma comparisons, account for the actual CSS layout viewport, not only the emulated screen width.

**Why:** Linux headless Chromium can reserve 15 pixels for a desktop-style vertical scrollbar during mobile-width emulation, unlike a phone's overlay scrollbar. This produced a false form-width mismatch despite the mobile screenshot matching.

**How to apply:** Use a browser configuration with phone-like overlay scrollbar behavior for reference-dimension tests; separately keep overflow checks and never hide user-facing scrollbars through site CSS to make tests pass.
