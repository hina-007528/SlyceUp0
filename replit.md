# SlyceUp

Existing React 19 + Vite 8 landing page. Keep this project at the repository root and preserve its stack.

## Run

- Replit workflow: **Start application**, running `npm run dev`.
- Vite listens on `0.0.0.0:5000` and allows Replit's proxied development hosts.
- Production build: `npm run build`; output is `dist/`.
- Preview the build: `npm run preview`.
- Lint: `npm run lint`.
- Responsive/interaction checks: `node scripts/check-responsive.mjs`. This uses system Chromium and the development URL in `REPLIT_DEV_DOMAIN`, or accepts an app URL as its first argument.

## Design implementation

Three sections: meal reading, philosophy, and the Capture / Understand / Learn story. The header is sticky with stable geometry. Desktop, tablet, and mobile use intentionally different layouts within bounded, centered containers.

Keep Philosophy and How It Works slightly compact overall, including typography, imagery, spacing and section heights, while preserving readable mobile copy and the complete content.

Full Figma frames must **not** be used as page backgrounds. The base background remains `#f7f2e6`, with a single subtle hero radial light, `#fbf8f0` through Philosophy, and `#efe8d8` sparingly at the bottom of How It Works. Blend section edges using only these warm tints; no white/black backgrounds, decorative leaves, glass, fabric, textures, noise, glassmorphism or heavy gradients. The header's existing `#f7f2e6` background must not change. Hero bowl and phone remain static. The desktop navbar is 76px at the top and 68px on scroll, inside a reserved 76px sticky slot; mobile/tablet use 72px → 64px. Keep equal vertical breathing room around the unchanged logo and buttons. Wide desktop retains a 1280px nav row, 168×44 logo, 48px logo-to-navigation gap and 32px link gaps. Desktop main content is modestly reduced about 5%, without changing font families, text colors, accents, copy, assets or the mobile image-first layout. Preserve Lenis scrolling with natural touch and reduced-motion support.

The approved scroll upgrade adds the three-feature/caption strip beneath the unchanged hero scene. All three feature points must remain side-by-side on mobile, including folded 280px screens, with responsive icon/text sizing and wrapping inside each column, never stacking or truncating. Scroll-linked `.fx` text effects must leave the top-of-page design unchanged and be disabled for reduced motion. Keep all text visible by default; JavaScript and Lenis failure must preserve readable content and native navigation. Pre-rendered HTML is required in both development and production. Theme the native scrollbar to the cream/forest palette; do not hide it or hijack native thumb dragging.

The live Figma file required sign-in during implementation. The supplied desktop/mobile exports were used as the visual references. Individual phone objects were extracted from those exports; `scripts/extract-design-assets.mjs` reproduces those extractions from the original files in `attached_assets/`. Bowls use the supplied transparent object assets.

Inter, Newsreader and Manrope are served locally to avoid external font requests.
Only background/surface colors may change under the current design scope. Report existing text-contrast failures instead of changing foreground colors. The measured ratios and this update's changed values/undo instructions are in `docs/warm-layout-update.md`.

## Remaining launch dependency

There is no waitlist backend or connected email provider in this imported frontend. The form validates the address and reports that signup is not connected; it must never claim an address was saved. Connect a real signup destination, handle duplicate/error/success responses, and verify persistence before marketing this as a launch-ready signup site.
