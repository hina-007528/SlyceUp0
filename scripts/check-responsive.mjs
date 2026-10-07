import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { openBrowser, delay } from './browser-utils.mjs';

const url = process.argv[2] || (process.env.REPLIT_DEV_DOMAIN && `https://${process.env.REPLIT_DEV_DOMAIN}`);
if (!url) throw new Error('Pass the running app URL as the first argument.');
const browser = await openBrowser(url);
const viewports = [[320,800],[360,800],[375,812],[390,844],[393,852],[414,896],[430,932],[480,900],[540,900],[600,900],[768,523],[768,1024],[820,1180],[834,1194],[900,1200],[1024,697],[1024,768],[1100,850],[1280,720],[1366,768],[1440,747],[1440,900],[1536,864],[1600,900],[1920,1080],[2560,1440]];
const captureVisuals = process.argv.includes('--screenshots');
const captures = [];
if (captureVisuals) await mkdir('/tmp/slyceup-qa', { recursive: true });

try {
  for (const [width, height] of viewports) {
    await browser.call('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
    await delay(100);
    for (let step = 0; step < 3; step++) {
    await browser.evaluate(`document.querySelectorAll(".step")[${step}].click()`);
    await delay(50);
    const result = await browser.evaluate(`(() => {
      const overflow = document.documentElement.scrollWidth > innerWidth + 1;
      const clipped = [...document.querySelectorAll('h1,h2,.hero-copy,.philo-copy,.form,.steps,.node b,.node p')]
        .filter(el => {
          const style = getComputedStyle(el), r = el.getBoundingClientRect();
          return style.display !== 'none' && style.visibility !== 'hidden' && r.width > 0 &&
            (r.left < -1 || r.right > innerWidth + 1 || el.scrollWidth > el.clientWidth + 2);
        }).map(el => el.className || el.tagName);
      const croppedPhones = [...document.querySelectorAll('.art .phone,.main-phone')]
        .some(el => { const r=el.getBoundingClientRect(); return r.left < -1 || r.right > innerWidth + 1; });
      return {overflow, clipped, croppedPhones};
    })()`);
    assert.equal(result.overflow, false, `Horizontal overflow at ${width}px`);
    assert.deepEqual(result.clipped, [], `Clipped content at ${width}px: ${result.clipped}`);
    assert.equal(result.croppedPhones, false, `Cropped primary phone at ${width}px`);
    }
    console.log(`PASS all three layouts at ${width}px`);
    if (width >= 761 && width <= 1350) {
      const clearOfBowl = await browser.evaluate(`(() => {
        const bowl=document.querySelector('.bowlp').getBoundingClientRect();
        return ['.n2','.n4'].every(selector=>{
          const node=document.querySelector(selector).getBoundingClientRect();
          return node.left>=bowl.right+8 && node.right<=innerWidth-8+.5;
        });
      })()`);
      assert.equal(clearOfBowl, true, `Right philosophy nodes overlap the bowl or screen edge at ${width}×${height}`);
      console.log(`PASS right philosophy node clearance at ${width}×${height}`);
    }
    if (width <= 760) {
      const philosophy = await browser.evaluate(`(() => {
        const copy=document.querySelector('.philo-copy');
        const r=copy.getBoundingClientRect(),stage=document.querySelector('.stage').getBoundingClientRect();
        return {
          visible:[...copy.querySelectorAll('h2,p')].every(el=>el.getBoundingClientRect().height>0),
          belowDiagram:r.top>=stage.bottom,
          contained:r.bottom<=document.querySelector('.philo').getBoundingClientRect().bottom,
          text:copy.innerText
        };
      })()`);
      assert.equal(philosophy.visible, true, `Mobile philosophy text hidden at ${width}px`);
      assert.equal(philosophy.belowDiagram, true, `Mobile philosophy text must follow the diagram at ${width}px`);
      assert.equal(philosophy.contained, true, `Mobile philosophy text extends beyond its section at ${width}px`);
      for (const phrase of ['Food is a relationship.', 'Ayurveda looks beyond', 'The same meal is shaped', 'SlyceUp translates', 'SAME FOOD. A DEEPER UNDERSTANDING.']) {
        assert.ok(philosophy.text.includes(phrase), `Missing mobile philosophy text: ${phrase}`);
      }
    }
    await browser.evaluate('document.getElementById("how").scrollIntoView({behavior:"instant"})');
    assert.equal(await browser.evaluate('document.querySelector(".steps").getBoundingClientRect().top >= document.querySelector("header").getBoundingClientRect().bottom'), true, `Steps hidden behind sticky header at ${width}px`);
    if (width === 1440 || width === 393) {
      const specs = width === 1440 ? [
        ['.nav .in', { width: '1280px', height: '56px', gap: '48px' }],
        ['.logo img', { width: '168px', height: '44px' }],
        ['.nav ul', { gap: '32px' }],
        ['.nav ul a', { fontSize: '16px', fontWeight: '600', lineHeight: '22px' }],
        ['.hero-copy', { width: '650px' }],
        ['.hero h1', { fontSize: '86px', lineHeight: '83px', fontWeight: '400' }],
        ['.hero .sub', { fontSize: '28px', lineHeight: '34px', width: '610px' }],
        ['.form', { width: '612px', height: '58px', borderRadius: '28px' }],
        ['.form input', { fontSize: '18px', fontWeight: '400' }],
        ['.form .pill', { height: '48px', fontSize: '16px', fontWeight: '700' }],
        ['.hint', { fontSize: '14px', lineHeight: '20px' }],
        ['.how h2', { fontSize: '66px', lineHeight: '62px' }],
        ['.lead', { fontSize: '21px', lineHeight: '31px' }],
        ['.step b', { width: '58px', height: '58px', fontSize: '17px' }],
      ] : [
        ['.logo img', { width: '133px', height: '34px' }],
        ['.burger', { width: '44px', height: '44px' }],
        ['.hero .eyebrow', { fontSize: '15px', fontWeight: '600', letterSpacing: '4.8px' }],
        ['.hero h1', { fontSize: '48px', fontWeight: '400' }],
        ['.hero .sub', { fontSize: '20px', lineHeight: '24px' }],
        ['.form', { width: '345px', height: '44px' }],
        ['.form input', { fontSize: '16px', lineHeight: '16px' }],
        ['.form .pill', { height: '40px', fontSize: '14px', fontWeight: '600' }],
        ['.steps', { width: '290px' }],
        ['.step b', { width: '24px', height: '24px' }],
        ['.step', { fontSize: '10px', lineHeight: '13px' }],
        ['.how h2', { fontSize: '28px', lineHeight: '28px' }],
      ];
      for (const [selector, properties] of specs) {
        const actual = await browser.evaluate(`(() => {
          const s=getComputedStyle(document.querySelector(${JSON.stringify(selector)}));
          return Object.fromEntries(${JSON.stringify(Object.keys(properties))}.map(k=>[k,s[k]]));
        })()`);
        assert.deepEqual(actual, properties, `Figma style mismatch: ${selector} at ${width}px`);
      }
      await browser.evaluate('document.fonts.ready');
      assert.equal(await browser.evaluate('[...document.fonts].some(f=>f.family.includes("Manrope")&&f.weight==="600"&&f.status==="loaded")'), true);
      console.log(`PASS exact Figma dimensions and typography at ${width}px`);
    }
    if (captureVisuals) {
      await browser.evaluate('document.querySelector(".step").click()');
      for (const section of ['early', 'philosophy', 'how']) {
        await browser.evaluate(`document.getElementById("${section}").scrollIntoView({behavior:"instant"})`);
        await delay(150);
        await browser.evaluate(`Promise.all([...document.images].filter(img => img.getBoundingClientRect().top < innerHeight && img.getBoundingClientRect().bottom > 0).map(img => img.decode()))`);
        const { data } = await browser.call('Page.captureScreenshot', { format: 'jpeg', quality: 75 });
        captures.push({ width, height, section, data });
        await writeFile(`/tmp/slyceup-qa/${section}-${width}.jpg`, Buffer.from(data, 'base64'));
      }
    }
  }

  await browser.call('Emulation.setDeviceMetricsOverride', { width: 393, height: 852, deviceScaleFactor: 1, mobile: false });
  await browser.evaluate('document.querySelector(".burger").click()');
  assert.equal(await browser.evaluate('document.querySelector(".burger").getAttribute("aria-expanded")'), 'true');
  await browser.call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
  await browser.call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' });
  assert.equal(await browser.evaluate('document.querySelector(".burger").getAttribute("aria-expanded")'), 'false');
  assert.equal(await browser.evaluate('document.activeElement.classList.contains("burger")'), true);
  await browser.evaluate('document.querySelector(".burger").click(); document.querySelector("#menu a[href=\\"#how\\"]").click()');
  await delay(100);
  assert.equal(await browser.evaluate('document.querySelector(".burger").getAttribute("aria-expanded")'), 'false');
  const originalNavHeight = await browser.evaluate('document.querySelector("header").getBoundingClientRect().height');
  await browser.evaluate('scrollTo(0,document.body.scrollHeight)');
  await delay(100);
  assert.equal(await browser.evaluate('document.querySelector("header").getBoundingClientRect().height'), originalNavHeight);
  assert.equal(await browser.evaluate('document.querySelector("header").getBoundingClientRect().top'), 0);
  console.log('PASS mobile menu, Escape/focus, anchor navigation and stable sticky header');

  for (let index = 0; index < 3; index++) {
    await browser.evaluate(`document.querySelectorAll(".step")[${index}].click()`);
    assert.equal(await browser.evaluate(`document.querySelectorAll(".step")[${index}].getAttribute("aria-pressed")`), 'true');
    const selected = await browser.evaluate('document.querySelector(".step[aria-current=\\"step\\"]").textContent');
    assert.match(selected, [ /Capture/, /Understand/, /Learn/ ][index]);
    assert.equal(await browser.evaluate('document.querySelectorAll(".preview").length'), 2);
  }
  await browser.evaluate('document.querySelector(".preview").click()');
  assert.match(await browser.evaluate('document.querySelector(".step[aria-current=\\"step\\"]").textContent'), /Capture/);
  console.log('PASS all three step states and preview controls');

  await browser.evaluate('document.querySelector("#email").value="invalid"; document.querySelector("form").requestSubmit()');
  assert.match(await browser.evaluate('document.querySelector("#hint").textContent'), /valid email/);
  await browser.evaluate('document.querySelector("#email").value="qa@example.com"; document.querySelector("form").requestSubmit()');
  assert.match(await browser.evaluate('document.querySelector("#hint").textContent'), /not.*connected|isn.t connected/);
  console.log('PASS email validation and honest unconnected-signup state');
  assert.deepEqual(browser.errors, [], 'Browser runtime errors');
  console.log('PASS browser runtime checks');
  if (captureVisuals) {
    for (const [name, group] of [
      ['mobile', captures.filter(x => x.width < 600)],
      ['tablet', captures.filter(x => x.width >= 600 && x.width < 1280)],
      ['desktop', captures.filter(x => x.width >= 1280)],
    ]) {
      const data = await browser.evaluate(`(async () => {
        const entries = ${JSON.stringify(group)};
        const canvas = document.createElement('canvas');
        canvas.width = 1350; canvas.height = (entries.length / 3) * 230;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#eee'; ctx.fillRect(0,0,canvas.width,canvas.height);
        for (let i=0;i<entries.length;i++) {
          const item=entries[i], x=(i%3)*450, y=Math.floor(i/3)*230;
          const image=new Image(); image.src='data:image/jpeg;base64,'+item.data; await image.decode();
          const scale=Math.min(440/item.width,205/item.height);
          const w=item.width*scale,h=item.height*scale;
          ctx.drawImage(image,x+(450-w)/2,y+23,w,h);
          ctx.font='14px sans-serif';ctx.fillStyle='#222';
          ctx.fillText(item.section+' — '+item.width+'×'+item.height,x+12,y+16);
        }
        return canvas.toDataURL('image/jpeg',0.9).split(',')[1];
      })()`);
      await writeFile(`/tmp/slyceup-qa/${name}-overview.jpg`, Buffer.from(data, 'base64'));
    }
    console.log('Saved visual QA captures and contact sheets to /tmp/slyceup-qa/');
  }
} finally {
  await browser.close();
}
