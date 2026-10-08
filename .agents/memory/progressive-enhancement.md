---
name: Progressive enhancement
description: Why pre-rendered landing-page content still needs independent stylesheet delivery and identical asset URLs
---

Preserve standalone stylesheet links in the public landing-page HTML, even when the JavaScript entry also imports those styles.

**Why:** The user requires readable, usable content if JavaScript is disabled or fails to load. Pre-rendering text alone is insufficient when styles arrive only through JavaScript. The duplicate-looking stylesheet references deliberately cover that failure case.

**How to apply:** After changing stylesheet loading or build configuration, verify both disabled JavaScript and an aborted application bundle against the built page. Check styling and native navigation, not just the presence of text.

Keep pre-rendered and hydrated asset URLs identical.

**Why:** The server renderer and browser build must refer to the same emitted image URLs; source-only paths versus hashed build paths can break hydration or static images.

**How to apply:** When changing asset handling or pre-rendering, check image responses and hydration errors in the production build before removing or consolidating renderer build steps.
