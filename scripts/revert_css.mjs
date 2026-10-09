import fs from 'fs';

const html = fs.readFileSync('website-version/index.html', 'utf8');
const match = html.match(/<style>([\s\S]*?)<\/style>/);
let css = match[1];

css = css.substring(css.indexOf('.ph>*{'));

const lines = css.split('\n');
const fixed = lines.map(line => {
  if (line.trim() && line.match(/^[a-zA-Z.*#\[]/) && !line.startsWith('.ph') && !line.includes('@media')) {
    let sels = line.substring(0, line.indexOf('{')).split(',');
    let body = line.substring(line.indexOf('{'));
    let newSels = sels.map(s => {
      s = s.trim();
      if(s.startsWith('.ph')) return s;
      return '.ph ' + s;
    });
    return newSels.join(', ') + body;
  }
  return line;
}).join('\n');

const prepend = `/* phone mockup scoped styles */\n`;
fs.writeFileSync('src/phone-mockup.css', prepend + fixed);
console.log('Reverted phone-mockup.css to exact original website-version layout constants natively.');
