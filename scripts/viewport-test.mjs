import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const widths = [320, 360, 375, 390, 414, 430, 600, 768, 1024, 1440, 1920];

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto('http://localhost:5001', { waitUntil: 'networkidle0' });

  const results = {};
  
  for (const w of widths) {
    const isMobile = w <= 768;
    
    // PORTRAIT
    await page.setViewport({ width: w, height: isMobile ? 800 : 900 });
    await new Promise(r => setTimeout(r, 600)); // allow fluid css transitions to settle
    
    let out = await page.evaluate(() => {
      const phs = [...document.querySelectorAll('.ph')];
      if(phs.length === 0) return { error: "No .ph found" };
      return {
        cqw: CSS.supports('width','1cqw'),
        viewport: innerWidth,
        sideScroll: document.documentElement.scrollWidth > innerWidth,
        phones: phs.map((p,i)=>{
          const r=p.getBoundingClientRect();
          const pr=p.parentElement.getBoundingClientRect();
          return { 
            i:i+1, 
            width:Math.round(r.width), 
            height:Math.round(r.height),
            ratio:+(r.height/r.width).toFixed(3), 
            parentWidth:Math.round(pr.width),
            container:getComputedStyle(p).containerType,
            overflowRight: Math.round(r.right - innerWidth) 
          };
        })
      };
    });
    
    results[`${w}_portrait`] = out;
    
    if(w === 360 || w === 390) {
      await page.screenshot({ path: `viewport_${w}_portrait.png`, fullPage: false });
    }

    // LANDSCAPE (only for mobile sizes)
    if (isMobile) {
      await page.setViewport({ width: 800, height: w });
      await new Promise(r => setTimeout(r, 600)); 
      let outLand = await page.evaluate(() => {
        const phs = [...document.querySelectorAll('.ph')];
        return {
          cqw: CSS.supports('width','1cqw'),
          viewport: innerWidth,
          sideScroll: document.documentElement.scrollWidth > innerWidth,
          phones: phs.map((p,i)=>{
            const r=p.getBoundingClientRect();
            const pr=p.parentElement.getBoundingClientRect();
            return { 
              i:i+1, width:Math.round(r.width), height:Math.round(r.height),
              ratio:+(r.height/r.width).toFixed(3), parentWidth:Math.round(pr.width),
              container:getComputedStyle(p).containerType,
              overflowRight: Math.round(r.right - innerWidth) 
            };
          })
        };
      });
      results[`${w}_landscape`] = outLand;
    }
  }
  
  fs.writeFileSync('layout_metrics.json', JSON.stringify(results, null, 2));
  console.log("Analysis Complete. Metrics saved.");
  
  await browser.close();
})();
