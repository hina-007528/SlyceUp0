import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Uses the system Chromium and Node's WebSocket; no test-only app dependencies.
export async function openBrowser(url) {
  const profile = await mkdtemp(join(tmpdir(), 'slyceup-browser-'));
  const port = 9400 + (process.pid % 500);
  const child = spawn(process.env.CHROMIUM_PATH || '/repl/tools/bin/chromium', [
    '--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu',
    `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
    '--remote-allow-origins=*', 'about:blank',
  ], { stdio: ['ignore', 'ignore', 'pipe'] });
  let startupOutput = '';
  child.stderr.on('data', (data) => { startupOutput = (startupOutput + data.toString()).slice(-4000); });
  let target;
  for (let attempt = 0; attempt < 600; attempt++) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' });
      target = await response.json();
      break;
    } catch { await delay(100); }
  }
  if (!target) {
    child.kill();
    await rm(profile, { recursive: true, force: true });
    throw new Error(`Chromium did not start. Set CHROMIUM_PATH to its executable.\n${startupOutput}`);
  }
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  let sequence = 0;
  const pending = new Map();
  const errors = [];
  socket.addEventListener('message', ({ data }) => {
    const event = JSON.parse(data);
    if (event.method === 'Runtime.exceptionThrown') errors.push(event.params.exceptionDetails.text);
    if (event.id && pending.has(event.id)) {
      const { resolve, reject, timer } = pending.get(event.id);
      clearTimeout(timer);
      pending.delete(event.id);
      if (event.error) reject(new Error(JSON.stringify(event.error)));
      else resolve(event.result);
    }
  });
  const call = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`${method} timed out`));
    }, 20000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async (expression) => {
    const response = await call('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (response.exceptionDetails) throw new Error(JSON.stringify(response.exceptionDetails));
    return response.result.value;
  };
  const close = async () => {
    socket.close();
    child.kill();
    await delay(250);
    await rm(profile, { recursive: true, force: true });
  };
  try {
    await call('Page.enable');
    await call('Runtime.enable');
    await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    await call('Page.navigate', { url });
    for (let attempt = 0; attempt < 100; attempt++) {
      if (await evaluate('document.querySelector("h1") !== null')) break;
      await delay(100);
    }
    await evaluate('document.fonts.ready.then(() => true)');
  } catch (error) {
    await close();
    throw error;
  }
  return { call, evaluate, errors, close };
}
