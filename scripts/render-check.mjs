import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { screenDesigns } from '../src/data/designSpec.js';
import { initialState, createOrder, areas } from '../src/domain.js';
import { STORAGE_KEY } from '../src/storage.js';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
const memory = new Map();
globalThis.window = { location: { hash: '#home' }, localStorage: { getItem: key => memory.get(key) ?? null } };
try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  for (const screen of screenDesigns) {
    window.location.hash = `#${screen.id}`;
    const html = renderToStaticMarkup(createElement(App));
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${screen.id}: one h1`);
    assert.ok(html.includes('id="main-content"'));
    assert.ok(html.includes('aria-label="Footer navigation"'));
    for (const [, asset] of html.matchAll(/(?:src|href)="([^"#]+\.(?:jpg|svg|md))"/g)) {
      const clean = asset.replace(/^\.\//, '').replace(/^\//, '');
      assert.ok(fs.existsSync(`public/${clean}`), `${screen.id}: local asset ${asset}`);
    }
    if (screen.id === 'about') { assert.ok(!html.includes('Site map and navigation')); assert.ok(!html.includes('UI/UX Designer')); }
    if (screen.id === 'services') assert.ok(html.includes('Booking unavailable'));
    console.log(`PASS route render: ${screen.id}`);
  }
  const state = createOrder(initialState(), { serviceId: 'pressing', garments: [{ type: 'Shirt', quantity: 1 }], customer: { name: 'Demo User', email: 'demo@example.test', phone: '+971500000000' }, location: { area: areas[0], address: 'Fictional Office Street', building: 'Demo 12' }, slot: 'earliest', paymentMethod: 'card', consent: true }, Date.now(), 'render-order');
  memory.set(STORAGE_KEY, JSON.stringify(state));
  for (const route of ['tracking', 'dashboard', 'technician']) { window.location.hash = `#${route}`; const html = renderToStaticMarkup(createElement(App)); assert.ok(html.includes(route === 'dashboard' ? 'Order history.' : route === 'technician' ? 'Accept demo job' : 'Service event history.')); assert.ok(html.includes('Express Pressing')); }
  window.location.hash = '#unknown'; assert.ok(renderToStaticMarkup(createElement(App)).includes('Express laundry.'));
  memory.set(STORAGE_KEY, '{broken'); window.location.hash = '#dashboard'; assert.ok(renderToStaticMarkup(createElement(App)).includes('Saved demo data could not be read'));
  console.log('PASS populated dashboards, tracking, unknown route fallback and corrupt-storage notice.');
} finally { await server.close(); delete globalThis.window; }
