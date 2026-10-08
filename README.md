# SlyceUp

Responsive React/Vite landing page. Use Node.js 24 and npm.

## Local development

```sh
npm ci
npm run dev
```

## Verification

Development and production both serve pre-rendered landing-page HTML, which
React hydrates when JavaScript runs. Content, fonts, images and native navigation
remain available if JavaScript is disabled or the app bundle fails to load.
Interactive step controls and the form are enabled only after hydration; the
early-access form still explicitly reports that sign-up is not connected.

```sh
npm run lint
npm run build
npx playwright install --with-deps chromium firefox webkit
npm run test:browsers
```

The browser suite checks Chromium, Firefox, and WebKit against the production build at mobile, tablet, and laptop/desktop sizes. GitHub Actions runs it on Ubuntu for pushes to `main` and pull requests. WebKit checks cover that engine, not every macOS/iOS Safari version; Chromium coverage does not replace testing every Chrome or Edge release.

On Replit, the system Chromium is used automatically. Downloaded Playwright Firefox/WebKit binaries may require Linux libraries unavailable in the Nix environment; CI provides these dependencies. Native Firefox can also be checked locally when Firefox and geckodriver are installed:

```sh
node scripts/check-firefox.mjs https://your-running-development-site
node scripts/check-responsive.mjs https://your-running-development-site --screenshots
```

The upgrade tests cover every requested width from 280–2560px in portrait and
landscape, all three step states, 44px controls, 200% zoom-equivalent reflow,
header size restoration without section movement, bidirectional text fades,
reduced motion, native inner scrolling, and JavaScript/Lenis/effect failures.
Zoom-equivalent reflow is not a substitute for testing real browser toolbar zoom
or every physical device.

## Approved scroll upgrade

The original top-of-page desktop scene, fonts, copy and images remain unchanged.
The background is `#f7f2e6`; the bowl and hero phone remain static. A three-column
feature strip and caption sit beneath the hero scene. The existing header shrinks
from 64px to 56px within a reserved sticky slot, restoring its size at the top.

New layout and motion rules are isolated in `src/scroll-upgrade.css`. The only
existing styling-rule changes for this upgrade are removing competing native
smooth scrolling and restricting the existing hover effects to hover-capable
devices. Additive overrides adjust narrow-screen type/spacing, safe-area padding
and minimum touch targets only where needed.

Lenis uses one active instance with `lerp: 0.08` and native touch scrolling.
`useTextFade` progressively enhances `.fx` text without affecting header, forms
or images. The top-of-page appearance stays unchanged; reduced motion or effect
failure restores fully visible, untransformed text. Native scrolling handles a
Lenis initialization failure.

## Vercel

Import `hina-007528/SlyceUp0` into Vercel and select the `main` production branch.

- Framework: Vite
- Root directory: repository root
- Install: `npm ci`
- Build: `npm run build`
- Output: `dist`
- Node.js: 24.x

These settings are included in `vercel.json`. Vercel publishes the static output; no Replit server or secret is required for this version. Subsequent pushes can trigger automatic Vercel deployments once the repository is connected. GitHub Actions validates the code but does not itself publish to Vercel.

## Docker

The production image builds the Vite app with Node.js 24 and serves only the
compiled static files through non-root Nginx. No Replit secrets are needed.
The Docker build context excludes secrets, local dependencies, and uploaded
reference images.

On a machine with Docker and Docker Compose installed:

```sh
docker compose up --build -d
```

Open `http://localhost:8080`. Check container health and stop it with:

```sh
docker compose ps
curl http://localhost:8080/health
docker compose down
```

Alternatively, without Compose:

```sh
docker build -t slyceup .
docker run --rm -p 8080:8080 --cap-drop ALL --security-opt no-new-privileges slyceup
```

Hashed assets are cached long-term; HTML is revalidated. Missing assets return
404 rather than the SPA shell. GitHub Actions builds and smoke-tests the image
when these files are pushed. Run Docker on your own machine or a Docker-capable
host; Docker is not installed in this workspace.

## Current limitations

Early-access signup is not connected to a waitlist. The form explicitly reports this rather than claiming submissions were saved.

Some glass, linen, lighting, and shadows remain coded approximations rather than a verified pixel-identical Figma reconstruction. Background objects remain independent responsive layers, not flattened screenshots.
