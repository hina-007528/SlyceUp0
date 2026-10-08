import { readFile, writeFile } from 'node:fs/promises';
import { render } from '../.local/prerender/entry-server.js';

const path = new URL('../dist/index.html', import.meta.url);
const template = await readFile(path, 'utf8');
const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) throw new Error('Missing prerender root placeholder.');
await writeFile(path, template.replace(placeholder, () => `<div id="root">${render()}</div>`));
console.log('Pre-rendered landing page: content and navigation work without JavaScript.');
