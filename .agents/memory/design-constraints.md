---
name: SlyceUp design constraints
description: User's requirement for coded, responsive background compositions
---

Recreate the Figma background using independent HTML/CSS/SVG/React layers. Individual product or food assets may be used, but never place a full Figma frame or screenshot as the page background.

**Why:** The user explicitly requires every element to remain independently responsive and animatable, with different mobile and desktop compositions.

**How to apply:** Preserve separate shapes, lighting, shadows, textures and product objects when editing or extending the landing page. Do not replace the scene with a flattened export to simplify future changes.

Check original image dimensions before extracting individual objects. The image viewer may display a resized reference, so visible preview coordinates are not necessarily source-pixel coordinates.

**Why:** Preview-coordinate crops produced incorrect hero and desktop product assets until scaled against the source image dimensions.

**How to apply:** Inspect the original dimensions and scale reference coordinates before cropping; visually verify the resulting asset itself, not only its file size or successful load.

Treat the latest desktop and mobile screenshots as the primary visual source of truth, including when a supplied individual phone asset shows a different screen variant.

**Why:** The user explicitly states that the latest Figma reference wins over conflicting implementation details.

**How to apply:** Compare each screen variant to its corresponding desktop or mobile reference; do not assume that all uploaded phone cutouts are interchangeable.

Mobile philosophy must keep the bowl and four nodes first, followed by the entire desktop “Food is a relationship” philosophy text, like the hero’s image-first/text-below order.

**Why:** The user explicitly requested the full copy below the diagram even though the supplied mobile image itself shows only the diagram.

**How to apply:** Do not hide the philosophy copy on mobile to match an image-only reference; preserve all paragraphs, the divider, and the closing statement beneath the scene.
