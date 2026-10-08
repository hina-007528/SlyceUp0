import { chromium } from 'playwright';
import fs from 'fs';

const viewports = [
  { width: 280, height: 800 },
  { width: 320, height: 800 },
  { width: 360, height: 800 },
  { width: 375, height: 800 },
  { width: 390, height: 800 },
  { width: 414, height: 800 },
  { width: 430, height: 800 },
  { width: 600, height: 800 },
  { width: 768, height: 1024 },
  { width: 820, height: 1024 },
  { width: 912, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1180, height: 800 },
  { width: 1280, height: 800 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1536, height: 864 },
  { width: 1920, height: 1080 },
  { width: 2560, height: 1440 },
  { width: 3440, height: 1440 }
];

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const results = [];
  
  for (const vp of viewports) {
    await page.setViewportSize(vp);
    await page.goto('http://localhost:5000');
    // wait for layout
    await page.waitForTimeout(500);
    
    // Evaluate overflow
    const data = await page.evaluate(() => {
      const issues = [];
      const innerW = window.innerWidth;
      const scrollW = document.documentElement.scrollWidth;
      const isOverflowing = scrollW > innerW;
      
      const allElements = document.querySelectorAll('*');
      for (const el of allElements) {
        if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE' || el.tagName === 'META') continue;
        const rect = el.getBoundingClientRect();
        if (rect.right > innerW || rect.left < 0) {
          const cls = typeof el.className === 'string' && el.className ? '.' + el.className.split(' ').join('.') : '';
          const selector = el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + cls;
          // Filter out irrelevant hidden things
          if (rect.width === 0 && rect.height === 0) continue;
          issues.push({
            selector,
            right: rect.right,
            left: rect.left,
            width: rect.width
          });
        }
      }
      return { scrollW, innerW, isOverflowing, issues };
    });
    
    results.push({ vp, ...data });
    console.log(`Viewport ${vp.width}x${vp.height} -> Overflow: ${data.isOverflowing}`);
  }
  
  fs.writeFileSync('audit-results.json', JSON.stringify(results, null, 2));
  await browser.close();
  console.log('Audit complete. Results written to audit-results.json');
}

run().catch(console.error);
