import { writeFile } from 'node:fs/promises';
import { openBrowser } from './browser-utils.mjs';

const base = `https://${process.env.REPLIT_DEV_DOMAIN}`;
const browser = await openBrowser(base);
const specs = [
  ['Frame_11_1791363797840.png', [165, 85, 280, 576], 'figma-step-capture', 40, 1024],
  ['Frame_12_1791363787106.png', [165, 85, 280, 576], 'figma-step-understand', 40, 1024],
  ['Frame_13_1791363787105.png', [165, 85, 280, 576], 'figma-step-learn', 40, 1024],
  ['Background_and_phones_1791363879084.png', [116, 321, 166, 312], 'mobile-capture', 27],
  ['Scaled_composition_1791363865049.png', [124, 321, 165, 312], 'mobile-understand', 27],
  ['Scaled_composition2_1791363831527.png', [114, 295, 180, 320], 'mobile-learn', 27],
  ['Desktop_1791363893969.png', [795, 97, 212, 453], 'figma-hero-phone', 33, 1024],
];

try {
  for (const [file, [x, y, width, height], name, radius, referenceWidth = 393] of specs) {
    const imageData = await browser.evaluate(`(async () => {
      const image = new Image();
      image.src = ${JSON.stringify(`/attached_assets/${file}`)};
      await image.decode();
      // Preview tools can resize an export. Crop against its original pixels.
      const scale = image.naturalWidth / ${referenceWidth};
      const width = Math.round(${width} * scale), height = Math.round(${height} * scale);
      const canvas = document.createElement('canvas');
      canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ${radius === 'ellipse'
        ? 'ctx.ellipse(width/2,height/2,width/2,height/2,0,0,Math.PI*2);'
        : `ctx.roundRect(0,0,width,height,${radius}*scale);`}
      ctx.clip();
      ctx.drawImage(image, Math.round(${x}*scale),Math.round(${y}*scale),width,height,0,0,width,height);
      return canvas.toDataURL('image/webp',0.96).split(',')[1];
    })()`);
    await writeFile(`src/assets/img/${name}.webp`, Buffer.from(imageData, 'base64'));
    console.log(`Extracted individual product object: ${name}`);
  }
} finally {
  await browser.close();
}
