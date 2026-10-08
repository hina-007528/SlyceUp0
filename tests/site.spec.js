import { test, expect } from '@playwright/test';

const sizes = [
  [360,800], [393,852], [430,932], [768,523], [820,1180],
  [1024,697], [1280,720], [1366,768], [1440,747], [1536,864],
  [1600,900], [1920,1080], [2560,1440],
];

test('responsive layout, typography, assets and step states', async ({ page }) => {
  const failures = [];
  page.on('pageerror', error => failures.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') failures.push(message.text());
  });
  page.on('response', response => {
    if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`);
  });
  await page.goto('/');
  for (const [width,height] of sizes) {
    await page.setViewportSize({width,height});
    await page.evaluate(() => document.fonts.ready);
    for (let step=0;step<3;step++) {
      await page.locator('.step').nth(step).click();
      await expect(page.locator('.step').nth(step)).toHaveAttribute('aria-pressed','true');
      const layout = await page.evaluate(() => {
        const available=document.documentElement.clientWidth;
        const header=document.querySelector('header').getBoundingClientRect();
        const center=(header.top+header.bottom)/2;
        const visible=el=>{
          const s=getComputedStyle(el);
          return s.display!=='none'&&s.visibility!=='hidden'&&el.getBoundingClientRect().height>0;
        };
        return {
          overflow:document.documentElement.scrollWidth>available+1,
          clipped:[...document.querySelectorAll('h1,h2,.hero-copy,.philo-copy,.form,.node b,.node p')]
            .filter(visible).filter(el=>{
              const r=el.getBoundingClientRect();
              return r.left< -1||r.right>available+1||el.scrollWidth>el.clientWidth+2;
            }).map(el=>el.className||el.tagName),
          centered:[...document.querySelectorAll('.logo img,.nav .pill,.burger,.nav ul a')]
            .filter(visible).every(el=>{
              const r=el.getBoundingClientRect();
              return Math.abs((r.top+r.bottom)/2-center)<=1;
            }),
          mobileCopy:innerWidth>760||(
            document.querySelector('.philo-copy').getBoundingClientRect().top>=document.querySelector('.stage').getBoundingClientRect().bottom&&
            document.querySelector('.philo-copy').innerText.includes('SAME FOOD. A DEEPER UNDERSTANDING.')
          ),
        };
      });
      expect(layout, `${width}×${height}, step ${step}`).toEqual({
        overflow:false, clipped:[], centered:true, mobileCopy:true,
      });
    }
    for (const id of ['early','philosophy','how']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.evaluate(() => Promise.all([...document.images]
        .filter(img=>img.getBoundingClientRect().top<innerHeight&&img.getBoundingClientRect().bottom>0)
        .map(img=>img.decode())));
    }
    expect(await page.evaluate(() => [...document.images].filter(img=>!img.complete||!img.naturalWidth).map(img=>img.currentSrc))).toEqual([]);
  }
  for (const family of ['Newsreader','Inter','Manrope']) {
    expect(await page.evaluate(family=>[...document.fonts].some(f=>f.family.includes(family)&&f.status==='loaded'),family)).toBe(true);
  }
  expect(failures).toEqual([]);
});

test('keyboard menu, navigation and honest email validation', async ({ page }) => {
  await page.setViewportSize({width:393,height:852});
  await page.goto('/');
  const menu=page.getByRole('button',{name:/navigation menu$/});
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded','true');
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded','false');
  await expect(menu).toBeFocused();
  await menu.click();
  await page.getByRole('link',{name:'How it works'}).click();
  await expect(menu).toHaveAttribute('aria-expanded','false');
  await expect(page).toHaveURL(/#how$/);
  const email=page.getByRole('textbox',{name:'Email address'});
  await email.fill('invalid');
  await page.locator('form button').click();
  await expect(email).toHaveAttribute('aria-invalid','true');
  await expect(email).toBeFocused();
  await expect(page.locator('#hint')).toContainText('valid email');
  await email.fill('browser-check@example.com');
  await page.locator('form button').click();
  await expect(email).toHaveAttribute('aria-invalid','false');
  await expect(page.locator('#hint')).toContainText("isn't connected");
});

test('smooth anchors, flat backgrounds, static hero and compact sticky navigation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion:'no-preference' });
  await page.setViewportSize({ width:1280, height:720 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('html')).toHaveClass(/lenis/);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  const target=await page.locator('#how').evaluate(el=>el.getBoundingClientRect().top+scrollY);
  const positions=await page.evaluate(() => new Promise(resolve=>{
    const samples=[];
    const start=performance.now();
    document.querySelector('.nav a[href="#how"]').click();
    const sample=()=>{
      samples.push(scrollY);
      if (performance.now()-start<1000) requestAnimationFrame(sample);
      else resolve(samples);
    };
    requestAnimationFrame(sample);
  }));
  expect(positions.some(y=>y>2&&y<target-2),'Scrolling should animate through intermediate positions').toBe(true);
  await expect.poll(()=>page.evaluate(target=>Math.abs(scrollY-target),target)).toBeLessThanOrEqual(2);
  await expect(page.locator('header')).toHaveClass(/stuck/);
  for (const width of [393,1440]) {
    await page.setViewportSize({width,height:852});
    await expect(page.locator('.leafsh, .glass, .plant, .rays, .napkin, .stripe, .cloth-prop, .cast, .stick')).toHaveCount(0);
    expect(await page.locator('html, body, header, .hero, .philo, .how').evaluateAll(elements =>
      elements.map(el => ({
        color:getComputedStyle(el).backgroundColor,
        image:getComputedStyle(el).backgroundImage,
      })))).toEqual(Array(6).fill({color:'rgb(243, 232, 221)',image:'none'}));
    expect(await page.locator('.hero .bowl, .hero .phone').evaluateAll(elements =>
      elements.map(el=>getComputedStyle(el).animationName))).toEqual(['none','none']);
    expect(await page.locator('header').evaluate(el=>({
      height:el.getBoundingClientRect().height,
      top:el.getBoundingClientRect().top,
      position:getComputedStyle(el).position,
    }))).toEqual({height:64,top:0,position:'sticky'});
    expect(await page.locator('.stage').evaluate(el=>[
      getComputedStyle(el,'::before').content,
      getComputedStyle(el,'::after').content,
    ])).toEqual(['none','none']);
  }
  await expect(page.locator('#early .glass')).toHaveCount(0);
  await page.emulateMedia({ reducedMotion:'reduce' });
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});

test('desktop bowl reduction and sharp Insight frame keep mobile and tablet layout', async ({ page }) => {
  await page.goto('/');
  for (const width of [393,820,1440]) {
    await page.setViewportSize({width,height:852});
    await expect.poll(()=>page.locator('.stage').evaluate(el =>
      getComputedStyle(el).getPropertyValue('--bw').trim())).toBe(
      width <= 760 ? '53%' : width <= 900 ? '57.5%' : '52.3%');
    await page.locator('.step').nth(2).click();
    const insight=page.locator('.main-phone img');
    await insight.evaluate(img=>img.decode());
    expect(await insight.evaluate(img=>({
      width:img.naturalWidth,height:img.naturalHeight,
      correctSource:img.currentSrc.includes('insights-phone'),
    }))).toEqual({width:852,height:1791,correctSource:true});
    await expect(insight).toHaveAttribute('alt',/insights screen/);
  }
});

test('direct section links settle at the requested section', async ({ page }) => {
  await page.emulateMedia({ reducedMotion:'no-preference' });
  for (const id of ['philosophy','how']) {
    await page.goto(`/#${id}`);
    await page.evaluate(() => document.fonts.ready);
    await expect.poll(()=>page.locator(`#${id}`).evaluate(el=>Math.abs(el.getBoundingClientRect().top)))
      .toBeLessThanOrEqual(2);
  }
});

test('full-page wheel easing, scroll limits and reduced-motion switching', async ({ page }) => {
  await page.emulateMedia({ reducedMotion:'no-preference' });
  await page.setViewportSize({width:1280,height:720});
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/lenis/);
  await page.mouse.move(700,350);
  await page.evaluate(() => {
    window.wheelTrace = [];
    const started = performance.now();
    const sample = () => {
      window.wheelTrace.push(scrollY);
      if (performance.now() - started < 1000) requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  await page.mouse.wheel(0,650);
  await expect.poll(()=>page.evaluate(()=>Math.abs(scrollY-650))).toBeLessThanOrEqual(2);
  const trace = await page.evaluate(()=>window.wheelTrace);
  expect(new Set(trace.filter(y=>y>2&&y<648)).size).toBeGreaterThan(8);
  await page.mouse.wheel(0,-200);
  await expect.poll(()=>page.evaluate(()=>Math.abs(scrollY-450))).toBeLessThanOrEqual(2);
  await page.mouse.wheel(0,10000);
  await expect.poll(()=>page.evaluate(()=>Math.abs(
    document.documentElement.scrollHeight-innerHeight-scrollY))).toBeLessThanOrEqual(2);
  await page.mouse.wheel(0,-10000);
  await expect.poll(()=>page.evaluate(()=>scrollY)).toBeLessThanOrEqual(2);
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.locator('html')).not.toHaveClass(/lenis/);
  await page.mouse.wheel(0,300);
  await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(250);
  await page.emulateMedia({reducedMotion:'no-preference'});
  await expect(page.locator('html')).toHaveClass(/lenis/);
});

test('tablet hero keeps desktop alignment and phone keeps a right margin', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  for (const gutter of ['auto','stable']) {
    await page.evaluate(gutter => {
      document.documentElement.style.scrollbarGutter = gutter;
    }, gutter);
    for (const width of [360,393,430,768,820,900,901,1024,1050,1051,1280,1350,1351,1366,1440,1441,1920]) {
      await page.setViewportSize({width,height:747});
      // Container-query layout can settle on the next render after a resize.
      await page.evaluate(() => new Promise(resolve =>
        requestAnimationFrame(() => requestAnimationFrame(resolve))));
      const minimumGap = width >= 901 ? 32 : width > 760 ? 20 : 16;
      await expect.poll(()=>page.evaluate(() =>
        document.documentElement.clientWidth -
        document.querySelector('.art .phone').getBoundingClientRect().right),
      {message:`${width}px settled phone margin, gutter ${gutter}`})
        .toBeGreaterThanOrEqual(minimumGap);
      const layout = await page.evaluate(() => {
        const available = document.documentElement.clientWidth;
        const heading = document.querySelector('.hero h1');
        const phone = document.querySelector('.art .phone').getBoundingClientRect();
        const copy = document.querySelector('.hero-copy').getBoundingClientRect();
        const form = document.querySelector('.form').getBoundingClientRect();
        return {
          gap: available - phone.right,
          phoneLeft: phone.left,
          copyRight: copy.right,
          lines: Math.round(heading.getBoundingClientRect().height / parseFloat(getComputedStyle(heading).lineHeight)),
          formBottom: form.bottom,
          overflow: document.documentElement.scrollWidth > available + 1,
        };
      });
      expect(layout.overflow, `${width}px, gutter ${gutter}`).toBe(false);
      expect(layout.gap, `${width}px phone margin, gutter ${gutter}`).toBeGreaterThanOrEqual(minimumGap);
      if (width >= 768 && width <= 900) {
        expect(layout.lines, `${width}px tablet heading, gutter ${gutter}`).toBe(2);
        expect(layout.copyRight).toBeLessThan(layout.phoneLeft);
        expect(layout.formBottom).toBeLessThan(523);
      }
    }
  }
});
