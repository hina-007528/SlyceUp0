---
name: SlyceUp design constraints
description: Clean backgrounds, responsive section sizing, and preserving complete product content
---

Use plain backgrounds with no decorative leaves, glass, fabric, lighting, textures, or artificial shadows. Keep the bowl and phone product assets; never place a full Figma frame or screenshot as a page background.

**Why:** On 2026-10-08 the user explicitly requested removal of all background decoration, superseding the earlier layered-background reconstruction.

**How to apply:** Keep meaningful diagram annotations and product imagery independently responsive. Do not restore removed decorations from older visual references. Imagery inside a phone screen is product content, not background decoration.

Check original image dimensions before extracting individual objects. The image viewer may display a resized reference, so visible preview coordinates are not necessarily source-pixel coordinates.

**Why:** Preview-coordinate crops produced incorrect hero and desktop product assets until scaled against the source image dimensions.

**How to apply:** Inspect the original dimensions and scale reference coordinates before cropping; visually verify the resulting asset itself, not only its file size or successful load.

Use Figma references for structure and typography, and the latest supplied full-resolution individual assets for product screens. Preserve each bowl and phone's identity.

**Why:** The user repeatedly requested keeping the bowl and mobile frames the same while removing their surroundings, and supplied full-resolution replacements for the blurry Insights screen.

**How to apply:** Keep the Hero and Philosophy bowls distinct. Use the appropriate Capture, Understand, and Insights cutouts on both desktop and mobile; never revert the new Insights image to a smaller extraction from an older reference.

Mobile philosophy must keep the bowl and four nodes first, followed by the entire desktop “Food is a relationship” philosophy text, like the hero’s image-first/text-below order.

**Why:** The user explicitly requested the full copy below the diagram even though the supplied mobile image itself shows only the diagram.

**How to apply:** Do not hide the philosophy copy on mobile to match an image-only reference; preserve all paragraphs, the divider, and the closing statement beneath the scene.

Keep the philosophy bowl proportionate rather than oversized, while retaining the complete copy and four annotations.

**Why:** On 2026-10-08 the user said the second section image was too huge, superseding the previous approval of its desktop proportions.

**How to apply:** Balance the diagram against the text at each viewport. Preserve the full mobile philosophy text below the diagram rather than hiding it to fit a frame.

Center the navbar logo, navigation text, CTA, and menu toggle vertically within the whole header at every screen size.

**Why:** The user explicitly requested equal space above and below the navbar content, superseding the earlier reference’s bottom-heavy positioning.

**How to apply:** The user requested a smaller sticky navbar on 2026-10-08. Reduce its dimensions while preserving vertical centering and mobile navigation.

Remove all glass decorations, including the Hero glass.

**Why:** The 2026-10-08 request extends removal to all background decorations across the page.

**How to apply:** Do not restore decorative glass or shadows from older screenshots or mobile pseudo-elements.

At 768px, keep the Hero's desktop-style side-by-side alignment and two-line headline. The desktop Hero phone mockup must leave a clearly visible strip of background beyond its right edge at 100% browser zoom, not appear flush with the screen.

**Why:** The user requested desktop-like tablet alignment and repeatedly clarified that the desktop phone needs visible right-side background space without reducing browser zoom.

**How to apply:** Preserve the mobile image-first layout, and check phone clearance around responsive breakpoints with both overlay and reserved-space scrollbars.

Keep the hero bowl and phone stationary, retain Lenis scrolling, and size each section to fit one screen at normal viewport sizes.

**Why:** The user explicitly requested these behaviors on 2026-10-08.

**How to apply:** Do not reintroduce hero floating/parallax animations. Use available viewport height to scale imagery and spacing while preserving legibility and complete content; do not force fitting by clipping content or hiding text.

Screen-fit verification must include visible content, not only section height.

**Why:** Absolutely positioned diagram labels can extend beyond an otherwise correctly sized section without increasing its measured height.

**How to apply:** Check the full bounds of text, diagram annotations, forms, and product frames against their section at short tablet sizes as well as normal phone and desktop sizes.
