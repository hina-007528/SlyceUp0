import { test, expect } from '@playwright/test';

const widths = [280,320,360,390,414,600,768,820,1024,1280,1440,1920,2560];
const inspectLayout = () => {
  const width = document.documentElement.clientWidth;
  const visible = el => {
    const css = getComputedStyle(el);
    return css.display !== 'none' && css.visibility !== 'hidden' && el.getBoundingClientRect().height > 0;
  };
  const text = [...document.querySelectorAll('h1,h2,.hero-copy,.philo-copy,.form,.node b,.node p,.feature-text,.caption-text')].filter(visible);
  const controls = [...document.querySelectorAll('button,.nav a,.form input')].filter(visible);
  const clipped = text.filter(el => {
    const r = el.getBoundingClientRect();
    return r.left < -1 || r.right > width+1 || el.scrollWidth > el.clientWidth+2;
  }).map(el => el.className || el.tagName);
  const small = controls.filter(el => {
    const r = el.getBoundingClientRect();
    return r.width < 43.9 || r.height < 43.9;
  }).map(el => `${el.className}: ${el.getBoundingClientRect().width}×${el.getBoundingClientRect().height}`);
  const stepBounds = [...document.querySelectorAll('.step')].map(el => el.getBoundingClientRect());
  const overlap = stepBounds.slice(1).some((r,i) => r.left < stepBounds[i].right-1);
  return { overflow: document.documentElement.scrollWidth > width+1, clipped, small, overlap };
};

test('requested widths in portrait and landscape retain readable content and 44px controls', async ({page}) => {
  test.setTimeout(120000);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if(message.type()==='error') errors.push(message.text()); });
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/js/);
  await page.evaluate(() => document.fonts.ready);
  for (const width of widths) {
    for (const orientation of ['portrait','landscape']) {
      const height = orientation === 'portrait' ? Math.ceil(width*1.4) : Math.floor(width*.625);
      await page.setViewportSize({width,height});
      for(let step=0; step<3; step++) {
        await page.locator('.step').nth(step).evaluate(el=>el.click());
        await expect(page.locator('.step').nth(step)).toHaveAttribute('aria-pressed','true');
        await expect.poll(() => page.evaluate(inspectLayout), {message:`${width}×${height} ${orientation}, step ${step}`})
          .toEqual({overflow:false,clipped:[],small:[],overlap:false});
      }
      if(width <= 900) {
        await page.locator('.burger').click();
        await expect(page.locator('.nav ul')).toHaveClass('open');
        await expect.poll(() => page.evaluate(inspectLayout)).toEqual({overflow:false,clipped:[],small:[],overlap:false});
        await page.keyboard.press('Escape');
      }
    }
  }
  expect(errors).toEqual([]);
});

test('200 percent zoom equivalent reflow preserves content and controls', async ({browser}) => {
  // Browser page zoom halves the CSS viewport and doubles effective pixel density.
  // Pinch zoom/pageScaleFactor is not equivalent: it would leave layout width unchanged.
  const context = await browser.newContext({deviceScaleFactor:2,reducedMotion:'reduce'});
  const page = await context.newPage();
  try {
    await page.goto('/');
    for(const physicalWidth of [600,768,1024,1280,1440,1920,2560]) {
      await page.setViewportSize({width:physicalWidth/2,height:500});
      await page.evaluate(() => document.fonts.ready);
      await expect.poll(() => page.evaluate(inspectLayout), {message:`200% reflow at ${physicalWidth}px`})
        .toEqual({overflow:false,clipped:[],small:[],overlap:false});
    }
  } finally { await context.close(); }
});

test('hero features have the requested content, columns and sizes', async ({page}) => {
  await page.setViewportSize({width:1440,height:900});
  await page.goto('/');
  await expect(page.locator('.feature-text')).toHaveText([
    'Real meals, real context','Understand patterns over time','Insights for a more balanced you',
  ]);
  await expect(page.locator('.caption-text')).toHaveText('MEALS MEAN MORE WITH CONTEXT');
  expect(await page.locator('.feature-item').evaluateAll(elements => elements.map(el => {
    const c = getComputedStyle(el);
    const icon = el.querySelector('.feature-icon').getBoundingClientRect();
    const svg = el.querySelector('svg').getBoundingClientRect();
    const text = getComputedStyle(el.querySelector('.feature-text'));
    return {direction:c.flexDirection,gap:c.gap,icon:[icon.width,icon.height],svg:[svg.width,svg.height],font:text.fontSize,line:text.lineHeight};
  }))).toEqual(Array(3).fill({direction:'column',gap:'18px',icon:[48,48],svg:[32,32],font:'16px',line:'22px'}));
  expect(await page.evaluate(() => {
    const inner = document.querySelector('.hero-inner').getBoundingClientRect();
    const strip = document.querySelector('.benefits').getBoundingClientRect();
    return strip.top >= inner.bottom;
  })).toBe(true);
});

test('header shrinks smoothly, restores at top and never moves section layout', async ({page}) => {
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('/');
  await expect(page.locator('header')).not.toHaveClass(/stuck/);
  await expect.poll(() => page.locator('header').evaluate(el=>el.getBoundingClientRect().height)).toBe(64);
  const positions = () => [...document.querySelectorAll('.hero-inner,.philo-inner,.how-inner')]
    .map(el=>Math.round((el.getBoundingClientRect().top+scrollY)*100)/100);
  const before = await page.evaluate(positions);
  expect(await page.locator('header').evaluate(el=>getComputedStyle(el).transitionDuration)).toContain('0.4s');
  await page.evaluate(() => window.scrollTo(0,350));
  await expect(page.locator('header')).toHaveClass(/stuck/);
  await expect.poll(() => page.locator('header').evaluate(el=>el.getBoundingClientRect().height)).toBe(56);
  expect(await page.locator('.header-slot').evaluate(el=>el.getBoundingClientRect().height)).toBe(64);
  expect(await page.evaluate(positions)).toEqual(before);
  expect(await page.locator('header').evaluate(el=>getComputedStyle(el).backgroundColor)).toBe('rgb(247, 242, 230)');
  await page.evaluate(() => window.scrollTo(0,0));
  await expect.poll(() => page.locator('header').evaluate(el=>el.getBoundingClientRect().height)).toBe(64);
  expect(await page.evaluate(positions)).toEqual(before);
});

test('text fades in both directions, remains unchanged at top and respects reduced motion', async ({page}) => {
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.setViewportSize({width:1440,height:900});
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/lenis/);
  await expect(page.locator('html')).not.toHaveAttribute('data-scroll-fx');
  expect(await page.locator('h1').evaluate(el=>[getComputedStyle(el).opacity,getComputedStyle(el).transform])).toEqual(['1','none']);
  const heading = page.locator('#ph-h2');
  const centerScroll = await heading.evaluate(el=>scrollY+el.getBoundingClientRect().top+el.getBoundingClientRect().height/2-innerHeight/2);
  await page.evaluate(y=>scrollTo(0,y),centerScroll);
  await expect.poll(() => heading.evaluate(el=>Number(getComputedStyle(el).opacity))).toBeGreaterThan(.99);
  await page.evaluate(y=>scrollTo(0,y+350),centerScroll);
  await expect.poll(() => heading.evaluate(el=>Number(getComputedStyle(el).opacity))).toBeLessThan(.7);
  expect(await heading.evaluate(el=>parseFloat(el.style.getPropertyValue('--fx-shift')))).toBeLessThan(0);
  await page.evaluate(y=>scrollTo(0,y),centerScroll);
  await expect.poll(() => heading.evaluate(el=>Number(getComputedStyle(el).opacity))).toBeGreaterThan(.99);
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.locator('html')).not.toHaveClass(/lenis/);
  await expect(page.locator('html')).not.toHaveAttribute('data-scroll-fx');
  expect(await heading.evaluate(el=>[getComputedStyle(el).opacity,getComputedStyle(el).transform])).toEqual(['1','none']);
  expect(await page.locator('header').evaluate(el=>getComputedStyle(el).transitionDuration)).toBe('0s');
});

test('native scrolling and text effects work if Lenis cannot initialize', async ({page}) => {
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.addInitScript(() => {
    window.ResizeObserver = class { constructor(){throw new Error('Simulated ResizeObserver failure');} };
  });
  const warnings = [];
  page.on('console', message => { if(message.type()==='warning') warnings.push(message.text()); });
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/js/);
  await expect(page.locator('html')).not.toHaveClass(/lenis/);
  expect(warnings.some(text=>text.includes('using native scrolling'))).toBe(true);
  await page.locator('.nav a[href="#philosophy"]').click();
  await expect(page).toHaveURL(/#philosophy$/);
  await expect(page.locator('html')).toHaveAttribute('data-scroll-fx');
  await expect(page.locator('#ph-h2')).toBeVisible();
});

test('text remains fully visible if the fade update fails', async ({page}) => {
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/js/);
  await page.evaluate(() => {
    const original = window.getComputedStyle;
    window.getComputedStyle = (element,...args) => {
      if(element.matches('main .fx')) {
        window.getComputedStyle = original;
        throw new Error('Simulated text-effect failure');
      }
      return original(element,...args);
    };
    scrollTo(0,350);
  });
  await expect(page.locator('header')).toHaveClass(/stuck/);
  await expect.poll(() => page.locator('.fx').evaluateAll(elements=>elements.every(el=>
    getComputedStyle(el).opacity==='1'&&getComputedStyle(el).transform==='none'))).toBe(true);
  await expect(page.locator('html')).not.toHaveAttribute('data-scroll-fx');
});

test('data-lenis-prevent keeps inner scroll containers native', async ({page}) => {
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/lenis/);
  await page.evaluate(() => {
    const panel = document.createElement('div');
    panel.id = 'native-scroll-test';
    panel.setAttribute('data-lenis-prevent','');
    panel.style.cssText = 'position:fixed;left:100px;top:100px;width:300px;height:180px;overflow:auto;z-index:999;';
    const content = document.createElement('div');
    content.style.height = '900px';
    content.textContent = 'Native scroll container';
    panel.append(content);
    document.body.append(panel);
  });
  await page.mouse.move(220,180);
  await page.mouse.wheel(0,250);
  await expect.poll(() => page.locator('#native-scroll-test').evaluate(el=>el.scrollTop)).toBeGreaterThan(200);
  expect(await page.evaluate(() => scrollY)).toBe(0);
});

for (const failure of ['disabled','blocked']) {
  test(`content, styles and navigation survive JavaScript ${failure}`, async ({browser}) => {
    const context = await browser.newContext({javaScriptEnabled:failure!=='disabled',viewport:{width:280,height:900}});
    const page = await context.newPage();
    try {
      if(failure==='blocked') await page.route('**/assets/*.js',route=>route.abort());
      await page.goto('/');
      await expect(page.locator('h1')).toContainText('See what your');
      await expect(page.locator('.no-js-note')).toBeVisible();
      await expect(page.locator('.nav a[href="#philosophy"]')).toBeVisible();
      await expect(page.locator('.form button')).toBeDisabled();
      expect(await page.locator('.fx').evaluateAll(elements=>elements.every(el=>getComputedStyle(el).opacity==='1'&&getComputedStyle(el).transform==='none'))).toBe(true);
      await page.locator('.nav a[href="#philosophy"]').click();
      await expect(page).toHaveURL(/#philosophy$/);
      expect(await page.evaluate(inspectLayout)).toEqual({overflow:false,clipped:[],small:[],overlap:false});
      for(const width of [393,1280]) {
        await page.setViewportSize({width,height:900});
        expect(await page.evaluate(inspectLayout)).toEqual({overflow:false,clipped:[],small:[],overlap:false});
      }
    } finally { await context.close(); }
  });
}
