---
name: SlyceUp design constraints
description: User's requirement for coded, responsive background compositions
---

Check original image dimensions before extracting individual objects. The image viewer may display a resized reference, so visible preview coordinates are not necessarily source-pixel coordinates.

**Why:** Preview-coordinate crops produced incorrect hero and desktop product assets until scaled against the source image dimensions.

**How to apply:** Inspect the original dimensions and scale reference coordinates before cropping; visually verify the resulting asset itself, not only its file size or successful load.

Treat the latest desktop and mobile screenshots as the primary visual source of truth, including when a supplied individual phone asset shows a different screen variant.

**Why:** The user explicitly states that the latest Figma reference wins over conflicting implementation details.

**How to apply:** Compare each screen variant to its corresponding desktop or mobile reference; do not assume that all uploaded phone cutouts are interchangeable.

Mobile philosophy must keep the bowl and four nodes first, followed by the entire desktop “Food is a relationship” philosophy text, like the hero’s image-first/text-below order.

**Why:** The user explicitly requested the full copy below the diagram even though the supplied mobile image itself shows only the diagram.

**How to apply:** Do not hide the philosophy copy on mobile to match an image-only reference; preserve all paragraphs, the divider, and the closing statement beneath the scene.

Preserve the Philosophy annotation arrangement when correcting tablet spacing or compacting the sections.

**Why:** The user approved the desktop diagram arrangement and scoped the earlier tablet correction to the right-side Preparation and You nodes. They subsequently requested slightly smaller overall second and third sections, not a new diagram arrangement.

**How to apply:** For tablet annotation corrections, adjust the right columns and connectors within tablet-specific rules. For overall section sizing requests, preserve the diagram relationships and mobile image-first flow while compacting the layout.

Center the navbar logo, navigation text, CTA, and menu toggle vertically within the whole header at every screen size.

**Why:** The user explicitly requested equal space above and below the navbar content, superseding the earlier reference’s bottom-heavy positioning.

**How to apply:** Keep the content vertically centered when making the header more compact; do not restore the older desktop/mobile top offsets when matching earlier screenshots. The current background and hero-motion direction is recorded in replit.md and supersedes decorative scene references.

At 768px, keep the Hero's desktop-style side-by-side alignment and two-line headline. The desktop Hero phone mockup must leave a clearly visible strip of background beyond its right edge at 100% browser zoom, not appear flush with the screen.

**Why:** The user requested desktop-like tablet alignment and repeatedly clarified that the desktop phone needs visible right-side background space without reducing browser zoom.

**How to apply:** Preserve the mobile image-first layout, and check phone clearance around responsive breakpoints with both overlay and reserved-space scrollbars.
