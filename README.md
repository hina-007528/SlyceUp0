# SlyceUp

Responsive React/Vite landing page. Use Node.js 24 and npm.

## Local development

```sh
npm ci
npm run dev
```

## Verification

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

## Vercel

Import `hina-007528/SlyceUp0` into Vercel and select the `main` production branch.

- Framework: Vite
- Root directory: repository root
- Install: `npm ci`
- Build: `npm run build`
- Output: `dist`
- Node.js: 24.x

These settings are included in `vercel.json`. Vercel publishes the static output; no Replit server or secret is required for this version. Subsequent pushes can trigger automatic Vercel deployments once the repository is connected. GitHub Actions validates the code but does not itself publish to Vercel.

## Current limitations

Early-access signup is not connected to a waitlist. The form explicitly reports this rather than claiming submissions were saved.

Some glass, linen, lighting, and shadows remain coded approximations rather than a verified pixel-identical Figma reconstruction. Background objects remain independent responsive layers, not flattened screenshots.
