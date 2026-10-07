import { writeFile } from 'node:fs/promises';
import { openBrowser } from './browser-utils.mjs';

const browser = await openBrowser(`https://${process.env.REPLIT_DEV_DOMAIN}`);
const objects = [
  ['19ebc52c9ef49fa3c72efb734b336e073ba2c05f_1791367138557.png', 'uploaded-hero-bowl'],
  ['3b36d2d4ddc2be46702350b6c8b72cf2a23a68ac_1791367138556.png', 'uploaded-hero-phone'],
  ['a42c7048bab48903e166eac01d92a9f4d2d88a48_1791367138556.png', 'uploaded-capture'],
  ['2a6f05da369e425405a0787538ad599de43e8fc2_1791367138555.png', 'uploaded-understand'],
  ['74acdb27f987eb448fbb77c3a9c42ac2075388ca_1791367138555.png', 'uploaded-learn'],
  ['036dd39a28e03ecdfa93a362e3375910c2ec5c65_1791367138554.png', 'uploaded-philosophy-bowl', [363,195,870,745]],
];

try {
  for (const [source, name, crop] of objects) {
    const result = await browser.evaluate(`(async () => {
      const image = new Image();
      image.src = ${JSON.stringify(`/attached_assets/${source}`)};
      await image.decode();
      const c = document.createElement('canvas');
      const crop = ${JSON.stringify(crop || null)};
      c.width = crop ? crop[2] : image.naturalWidth;
      c.height = crop ? crop[3] : image.naturalHeight;
      const ctx = c.getContext('2d', {willReadFrequently:true});
      if(crop) {
        ctx.beginPath();ctx.ellipse(c.width/2,c.height/2,c.width/2-4,c.height/2-4,0,0,Math.PI*2);ctx.clip();
        ctx.drawImage(image,...crop,0,0,c.width,c.height);
      } else ctx.drawImage(image,0,0);
      const pixels = ctx.getImageData(0,0,c.width,c.height);
      const w=c.width,h=c.height,n=w*h;
      const labels=new Int32Array(n),queue=new Int32Array(n);
      let label=0,biggest=0,countMax=0,bounds=[0,0,w-1,h-1];
      // Remove disconnected export specks and trim transparent margins.
      for(let start=0;start<n;start++) {
        if(labels[start] || pixels.data[start*4+3]<64) continue;
        label++;let head=0,tail=1,minX=w,minY=h,maxX=0,maxY=0;
        queue[0]=start;labels[start]=label;
        while(head<tail) {
          const p=queue[head++],x=p%w,y=Math.floor(p/w);
          minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);
          for(const q of [x>0?p-1:-1,x<w-1?p+1:-1,y>0?p-w:-1,y<h-1?p+w:-1]) {
            if(q>=0&&!labels[q]&&pixels.data[q*4+3]>=64) {labels[q]=label;queue[tail++]=q;}
          }
        }
        if(tail>countMax) {countMax=tail;biggest=label;bounds=[minX,minY,maxX,maxY];}
      }
      for(let p=0;p<n;p++) if(labels[p]!==biggest) pixels.data[p*4+3]=0;
      ctx.putImageData(pixels,0,0);
      const [left,top,right,bottom]=bounds,sw=right-left+1,sh=bottom-top+1;
      const ratio=Math.min(1,1400/Math.max(sw,sh));
      const output=document.createElement('canvas');
      output.width=Math.round(sw*ratio);output.height=Math.round(sh*ratio);
      const out=output.getContext('2d');
      out.imageSmoothingQuality='high';
      out.drawImage(c,left,top,sw,sh,0,0,output.width,output.height);
      return {data:output.toDataURL('image/webp',.94).split(',')[1],width:output.width,height:output.height};
    })()`);
    await writeFile(`src/assets/img/${name}.webp`, Buffer.from(result.data, 'base64'));
    console.log(`${name}: ${result.width}×${result.height}`);
  }
  for (const [file, box, name, radius] of [
    ['image_1791366922226.png', [112,57,198,407], 'reference-learn', 27],
    ['image_1791366834161.png', [115,61,198,406], 'reference-understand', 27],
  ]) {
    const data = await browser.evaluate(`(async () => {
      const image = new Image();image.src=${JSON.stringify(`/attached_assets/${file}`)};await image.decode();
      const c=document.createElement('canvas');c.width=${box[2]};c.height=${box[3]};
      const ctx=c.getContext('2d');ctx.beginPath();ctx.roundRect(0,0,c.width,c.height,${radius});ctx.clip();
      ctx.drawImage(image,${box.join(',')},0,0,c.width,c.height);
      return c.toDataURL('image/webp',.96).split(',')[1];
    })()`);
    await writeFile(`src/assets/img/${name}.webp`, Buffer.from(data, 'base64'));
    console.log(`Latest reference object: ${name}`);
  }
  for (const [file, box, name] of [
    ['image_1791366580449.png', [445,17,159,113], 'hero-foliage-desktop'],
    ['image_1791366486906.png', [0,65,110,100], 'hero-foliage-mobile'],
  ]) {
    const data = await browser.evaluate(`(async () => {
      const image=new Image();image.src=${JSON.stringify(`/attached_assets/${file}`)};await image.decode();
      const c=document.createElement('canvas');c.width=${box[2]};c.height=${box[3]};
      const ctx=c.getContext('2d',{willReadFrequently:true});
      ctx.drawImage(image,${box.join(',')},0,0,c.width,c.height);
      const pixels=ctx.getImageData(0,0,c.width,c.height);
      for(let p=0;p<pixels.data.length;p+=4) {
        const [r,g,b]=pixels.data.slice(p,p+3);
        const a=r-g<8?Math.max(0,Math.min(1,(g-b-14)/35)):0;
        pixels.data[p+3]=Math.round(a*255);
        if(a>0) {
          pixels.data[p]=Math.max(0,Math.min(255,(r-245*(1-a))/a));
          pixels.data[p+1]=Math.max(0,Math.min(255,(g-240*(1-a))/a));
          pixels.data[p+2]=Math.max(0,Math.min(255,(b-228*(1-a))/a));
        }
      }
      ctx.putImageData(pixels,0,0);
      return c.toDataURL('image/webp',.96).split(',')[1];
    })()`);
    await writeFile(`src/assets/img/${name}.webp`, Buffer.from(data, 'base64'));
    console.log(`Isolated reference foliage: ${name}`);
  }
} finally {
  await browser.close();
}
