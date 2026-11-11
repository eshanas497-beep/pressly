import assert from 'node:assert/strict';
import { preview } from 'vite';
const server = await preview({ preview: { host: '127.0.0.1', port: 4174, strictPort: true, open: false } });
try {
  const origin = 'http://127.0.0.1:4174';
  const response = await fetch(origin);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.ok(html.includes('id="root"'));
  const links = [...html.matchAll(/(?:src|href)="([^"#]+\.(?:js|css|svg))"/g)].map(match => match[1]);
  for (const path of links) { const asset = await fetch(new URL(path, origin)); assert.equal(asset.status, 200, path); assert.ok((await asset.arrayBuffer()).byteLength > 0); }
  for (const path of ['images/wardrobe-editorial.jpg', 'images/steam-care.jpg', 'images/spot-care.jpg', 'images/folded-care.jpg', 'images/regular-laundry-reference.jpg', 'design-specification.md', ...['01-company-overview', '02-planning', '03-analysis', '04-design', '05-development-testing', '06-presentation'].map(name => `assessment/${name}.md`)]) {
    const asset = await fetch(`${origin}/${path}`); assert.equal(asset.status, 200, path); assert.ok((await asset.arrayBuffer()).byteLength > 0);
  }
  console.log('PASS production HTTP smoke check: index, built JS/CSS/favicon, five images and seven documentation downloads. This is not browser interaction testing.');
} finally { await new Promise(resolve => server.httpServer.close(resolve)); }
