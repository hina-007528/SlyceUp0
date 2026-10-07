import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { writeFile } from 'node:fs/promises';

const url = process.argv[2];
if (!url) throw new Error('Pass the running site URL.');
const server=createServer();
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const port=server.address().port;
await new Promise(resolve=>server.close(resolve));
const driver=spawn('geckodriver',['--host','127.0.0.1','--port',String(port)],{stdio:['ignore','ignore','pipe']});
let logs='';
driver.stderr.on('data',data=>{logs=(logs+data).slice(-4000);});
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const request=async (path,body,method=body?'POST':'GET')=>{
  const response=await fetch(`http://127.0.0.1:${port}${path}`,{
    method,headers:{'Content-Type':'application/json'},
    ...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(30000),
  });
  const result=await response.json();
  if (!response.ok) throw new Error(JSON.stringify(result.value));
  return result.value;
};
let session;
try {
  for (let i=0;i<100;i++) {
    try {await request('/status');break;} catch {await sleep(100);}
  }
  const created=await request('/session',{capabilities:{alwaysMatch:{
    browserName:'firefox','moz:firefoxOptions':{args:['-headless']},
  }}});
  session=created.sessionId;
  const command=(path,body,method)=>request(`/session/${session}${path}`,body,method);
  const evaluate=script=>command('/execute/sync',{script,args:[]});
  await command('/url',{url});
  for (let i=0;i<100;i++) {
    if (await evaluate('return !!document.querySelector("h1")')) break;
    await sleep(100);
  }
  await command('/execute/async',{script:'const done=arguments[arguments.length-1];document.fonts.ready.then(()=>done(true));',args:[]});
  for (const [width,height] of [[393,852],[768,523],[820,1180],[1024,697],[1051,800],[1100,850],[1280,720],[1350,800],[1366,768],[1440,747],[1536,864],[1600,900],[1920,1080]]) {
    await command('/window/rect',{width,height});
    await sleep(100);
    for (let step=0;step<3;step++) {
      await evaluate(`document.querySelectorAll(".step")[${step}].click();return true;`);
      const result=await evaluate(`const available=document.documentElement.clientWidth;
        const h=document.querySelector("header").getBoundingClientRect(),center=(h.top+h.bottom)/2;
        const visible=el=>{const s=getComputedStyle(el);return s.display!=="none"&&s.visibility!=="hidden"&&el.getBoundingClientRect().height>0;};
        return {
          overflow:document.documentElement.scrollWidth>available+1,
          clipped:[...document.querySelectorAll("h1,h2,.hero-copy,.philo-copy,.form,.node b,.node p")].filter(visible).filter(el=>{const r=el.getBoundingClientRect();return r.left< -1||r.right>available+1||el.scrollWidth>el.clientWidth+2;}).map(el=>el.className||el.tagName),
          centered:[...document.querySelectorAll(".logo img,.nav .pill,.burger,.nav ul a")].filter(visible).every(el=>{const r=el.getBoundingClientRect();return Math.abs((r.top+r.bottom)/2-center)<=1;})
        };`);
      if (result.clipped.length) {
        console.log(await evaluate(`return {
          width:innerWidth,
          heading:[...document.querySelectorAll(".philo-copy,.philo h2")].map(el=>({
            width:el.clientWidth,scrollWidth:el.scrollWidth,font:getComputedStyle(el).font,
            letterSpacing:getComputedStyle(el).letterSpacing
          })),
          fonts:[...document.fonts].map(font=>({family:font.family,status:font.status}))
        };`));
      }
      assert.deepEqual(result,{overflow:false,clipped:[],centered:true},`Firefox ${width}×${height}, step ${step}`);
    }
    console.log(`PASS Firefox ${width}×${height}: all three step layouts and centered navbar`);
  }
  await command('/window/rect',{width:393,height:852});
  await evaluate('document.querySelector(".burger").click();return true;');
  assert.equal(await evaluate('return document.querySelector(".burger").getAttribute("aria-expanded")'),'true');
  await evaluate('document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true}));return true;');
  assert.equal(await evaluate('return document.activeElement.className'),'burger');
  await evaluate('document.querySelector("#email").value="invalid";document.querySelector("form").requestSubmit();return true;');
  assert.equal(await evaluate('return document.querySelector("#email").getAttribute("aria-invalid")'),'true');
  await evaluate('document.querySelector("#email").value="firefox-check@example.com";document.querySelector("form").requestSubmit();return true;');
  assert.match(await evaluate('return document.querySelector("#hint").textContent'),/isn't connected/);
  await command('/window/rect',{width:1366,height:768});
  await evaluate('document.getElementById("philosophy").scrollIntoView({behavior:"instant"});return true;');
  await writeFile('/tmp/slyceup-firefox-laptop.png',Buffer.from(await command('/screenshot'),'base64'));
  console.log(`PASS Firefox ${created.capabilities.browserVersion}: menu, focus, validation and screenshot`);
} catch (error) {
  console.error(logs);
  throw error;
} finally {
  if (session) await request(`/session/${session}`,undefined,'DELETE').catch(()=>{});
  driver.kill();
}
