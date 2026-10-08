# Warm backgrounds, desktop fit and navbar spacing

## Scope and safeguards

Work is on `warm-layout-update`. The `warm-layout-before` branch records the
tracked site immediately before this update. Existing work was clean when
that backup was made; uploaded reference files were not included or deleted.

No existing styling rules were rewritten. The new stylesheet is loaded after
the previous styles in both the JavaScript entry and HTML, preserving styled,
readable content when JavaScript is disabled or blocked.

The logo, font families, copy, section order, image files, text colors, accents,
button colors and sizes, mobile image-first layout, three-column mobile feature
row, and Lenis behavior are unchanged.

## Every changed file

- `src/warm-layout.css`: new additive visual and desktop-fit overrides.
- `src/main.jsx`: import the new stylesheet after the existing styles.
- `index.html`: load the same stylesheet independently of JavaScript.
- `tests/site.spec.js`: expect the approved warm backgrounds and padded header.
- `tests/upgrades.spec.js`: new padding/tint/typography checks, updated header
  measurements, and the 1366px portrait/landscape case.
- `replit.md`: record the latest approved background and sizing constraints.
- `README.md`: keep the public implementation notes accurate.
- `docs/warm-layout-update.md`: this change list, contrast report and undo guide.
- `.agents/memory/browser-reference-qa.md` and `.agents/memory/MEMORY.md`:
  clarify the existing lesson about delayed viewport/font measurements; no UI changes.

## All overridden values

The new file's full declarations are the source of truth. These are the
previous values replaced by it:

| Target | Previous | New |
|---|---|---|
| Desktop navbar, top / scrolled | 56 / 48px | 76 / 68px |
| Tablet/mobile navbar, top / scrolled | 64 / 56px | 72 / 64px |
| Reserved sticky slot | 56px desktop / 64px mobile | 76px desktop / 72px mobile |
| Body base background | `#f7f2e6` | unchanged |
| Header background | `#f7f2e6` | unchanged |
| Hero background | flat base | base with one very soft, large top radial light |
| Philosophy background | flat base | soft tint through the middle, blending to base at both edges |
| How It Works background | flat base | mostly base, softly reaching deep tint at the bottom |
| Form background | existing translucent cream | `#fbf8f0` |
| Form border color | existing cream hairline | `rgba(60,50,30,0.10)`; existing 1px width and radius retained |
| Form shadow | existing shadow | `0 1px 2px rgba(60,50,30,.06), 0 8px 24px rgba(60,50,30,.05)` |
| Desktop hero container cap | 1280px | 1216px, with responsive viewport gutters |
| Desktop Philosophy / How container caps | 1440px | 1368px, with responsive viewport gutters |
| Wide desktop hero heading | 86px / 83px line-height | 81.7px / 78.85px |
| Wide desktop hero subheading | 28px / 34px | 26.6px / 32.3px |
| 901–1350px hero heading | `clamp(64px,6vw,80px)` | `clamp(60.8px,5.7vw,76px)` |
| 901–1350px hero subheading | `clamp(22px,2vw,27px)` | `clamp(20.9px,1.9vw,25.65px)` |
| 901–1050px hero heading | `clamp(58px,6vw,68px)` | `clamp(55.1px,5.7vw,64.6px)` |
| 901–1050px hero subheading | 22px | 20.9px |
| Wide Philosophy heading | 68px | 64.6px |
| Wide Philosophy body / translation | 22px / 20px | 20.9px / 19px |
| 901–1350px Philosophy heading | `clamp(48px,4.85vw,65px)` | `clamp(45.6px,4.6vw,61.75px)` |
| 901–1350px Philosophy body / translation | 19px / 18px | 18.05px / 17.1px |
| 901–1050px Philosophy heading | 43px | 40.85px |
| 901–1350px diagram paragraphs | 11px | 10.45px |
| Desktop How main phone | existing fluid clamp | same clamp multiplied by .95 |
| Wide How heading | 61px / 58px line-height | 57.95px / 55.1px |
| 901–1050px How heading | 52px | 49.4px |
| Desktop How lead | 19px / 29px | 18.05px / 27.55px |
| Desktop preview phone cap | 164px | 156px |
| Desktop preview height | `clamp(193px,24.8vw,276px)` | `clamp(184px,23.56vw,262px)` |

New palette variables are `--bg`, `--bg-soft`, `--bg-deep`, and `--bg-line`.
The requested fluid spacing tokens `--space-1` through `--space-7` are defined;
the largest two control the tint transition bands. Local fluid gutter tokens
cap desktop content without modifying established mobile spacing.

At 1440px and 2560px, measured hero bowl/phone and Philosophy scene widths are
95% of their prior sizes. At 1024px, these image widths are also approximately
95%. At 393px, approved heading sizes remain 48 / 44 / 26px.
Header height remains independent of the hero artwork's original offset.

## Contrast findings — colors deliberately unchanged

WCAG AA requires 4.5:1 for normal text and 3:1 for large text. The following
existing colors fail AA on at least one approved tint. Ratios are for resting,
fully visible HTML text, with translucent text composited over each tint.
No failing foreground or accent color was changed.

| Existing text | Base | Soft | Deep | Required |
|---|---:|---:|---:|---:|
| Signup hint, `rgba(65,69,70,.72)` | 4.13 | 4.24 | 3.93 | 4.5 |
| Hero caption, `#717880` | 4.00 | 4.21 | 3.66 | 4.5 |
| Philosophy closing line, `#8a9483` | 2.83 | 2.98 | 2.59 | 4.5 |
| Diagram paragraphs, `#77776e` | 4.04 | 4.26 | 3.70 | 4.5 |
| How lead, `#6f747a` | 4.22 | 4.44 | 3.86 | 4.5 |
| Active step, `#ff614c` | 2.66 | 2.80 | 2.43 | 4.5 |
| Input placeholder, `#7d838a` | 3.43 | 3.61 | 3.14 | 4.5 |
| Navigation hover, `#d85b4f` | 3.40 | 3.58 | 3.11 | 4.5 |

Cream button text `#fff8ee` over the existing coral `#ff685a` measures **2.70:1**
against a required **4.5:1**. The form's actual surface uses the soft tint, so
its placeholder measures **3.61:1** there.

The columns compare the foreground colors across the palette; they do not
mean each element actually appears on all three tints. The existing scroll
fades further reduce text contrast near viewport edges. Text baked into phone
images was not audited as live HTML. The page therefore cannot be claimed to
meet AA for all text without separately approved foreground/motion changes.

## Verification scope

Build and lint pass. Chromium checks cover the 14 requested widths, portrait/
landscape, all three step screens, 200% zoom-equivalent reflow, controls and
overflow, sticky padding/restoration, typography, image gutters, background
palette, reduced motion, Lenis easing/failure, and blocked/disabled JavaScript.
Zoom-equivalent reflow is not a physical-device pinch or browser toolbar test.

Chrome, Edge and Samsung Internet share Chromium, but those specific browsers
and physical devices were not separately exercised. Safari/WebKit requires
the existing Ubuntu CI workflow; it was not verified locally. Native Firefox
140.0.4 passed its existing viewport, three-step, menu, focus and validation
smoke checks on this update. That script is not the full Playwright matrix and
does not verify every requested CSS viewport or Firefox motion/failure state.

## How to undo just this update

The safest user-facing option is the Replit checkpoint from before this update.
No update was pushed or published.

For Git, first save any newer work. To restore only the changed tracked files
from the backup branch:

```sh
git restore --source warm-layout-before -- \
  src/main.jsx index.html tests/site.spec.js tests/upgrades.spec.js \
  replit.md README.md \
  .agents/memory/browser-reference-qa.md .agents/memory/MEMORY.md
```

Then delete the newly added `src/warm-layout.css` and this document **only if
neither contains newer work**, rebuild, and restart the app. Removing the imports
before deleting the stylesheet avoids missing-file errors.

Once this update has its own commit, `git revert <that-commit>` is another
non-destructive option. Deleting the working branch alone does not undo
uncommitted edits; do not use `git reset --hard` or `git clean` to discard unrelated
work or uploaded assets.
