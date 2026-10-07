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

Full Figma frames must **not** be used as page backgrounds. Tabletop light, texture, glass, linen, chopsticks, foliage and cast shadows are separate CSS/SVG layers. Only individual bowls and product screens are image assets.

The live Figma file required sign-in during implementation. The supplied desktop/mobile exports were used as the visual references. Individual phone objects were extracted from those exports; `scripts/extract-design-assets.mjs` reproduces those extractions from the original files in `attached_assets/`. Bowls use the supplied transparent object assets.

Inter, Newsreader and Manrope are served locally to avoid external font requests.

## Remaining launch dependency

There is no waitlist backend or connected email provider in this imported frontend. The form validates the address and reports that signup is not connected; it must never claim an address was saved. Connect a real signup destination, handle duplicate/error/success responses, and verify persistence before marketing this as a launch-ready signup site.
