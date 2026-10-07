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

test('smooth anchor scrolling and glass-free section backgrounds', async ({ page }) => {
  await page.emulateMedia({ reducedMotion:'no-preference' });
  await page.setViewportSize({ width:1280, height:720 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('smooth');
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
    await expect(page.locator('#philosophy .glass, #how .glass')).toHaveCount(0);
    expect(await page.locator('.stage').evaluate(el=>[
      getComputedStyle(el,'::before').content,
      getComputedStyle(el,'::after').content,
    ])).toEqual(['none','none']);
  }
  await expect(page.locator('#early .glass')).toHaveCount(1);
  await page.emulateMedia({ reducedMotion:'reduce' });
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
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
