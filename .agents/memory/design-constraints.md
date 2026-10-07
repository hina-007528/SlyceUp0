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
