import { chromium, devices } from '@playwright/test';
import fs from 'fs';

const widths = [280, 320, 360, 375, 390, 414, 430, 600, 768, 820, 912, 1024, 1180, 1280, 1366, 1440, 1536, 1920, 2560];

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const results = [];
  
  try {
    await page.goto('http://localhost:5000', { waitUntil: 'networkidle' });
  } catch(e) {
    console.log("Failed to load localhost:5000", e);
    process.exit(1);
  }

  for (const w of widths) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.waitForTimeout(200); // let layout settle
    
    // Evaluate geometry
    const data = await page.evaluate(() => {
      const iw = window.innerWidth;
      const sw = document.documentElement.scrollWidth;
      const overflows = [];
      const els = document.querySelectorAll('*');
      for (const el of els) {
        if (el.tagName === 'BODY' || el.tagName === 'HTML' || el.tagName === 'SCRIPT' || el.tagName === 'STYLE') continue;
        const rect = el.getBoundingClientRect();
        // Ignore pseudo elements and hidden
        if (rect.width === 0 && rect.height === 0) continue;
        
        let isOverflow = false;
        let reasons = [];
        if (rect.right > iw) { isOverflow = true; reasons.push('right:'+Math.round(rect.right)); }
        if (rect.left < 0) { isOverflow = true; reasons.push('left:'+Math.round(rect.left)); }
        
        if (isOverflow) {
          // generate rough selector
          let sel = el.tagName.toLowerCase();
          if (el.id) sel += '#' + el.id;
          if (el.className && typeof el.className === 'string') sel += '.' + el.className.split(' ').join('.');
          overflows.push({ sel, reasons });
        }
      }
      return { iw, sw, overflows };
    });
    
    results.push(data);
  }
  
  await browser.close();
  fs.writeFileSync('audit-report.json', JSON.stringify(results, null, 2));
  console.log("Audit complete. Written to audit-report.json");
}

run().catch(console.error);
