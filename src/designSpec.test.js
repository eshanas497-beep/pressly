import assert from 'node:assert/strict';
import { screenDesigns, businessRules } from './data/designSpec.js';
assert.deepEqual(screenDesigns.map(screen => screen.id), ['home', 'services', 'booking', 'about', 'contact']);
for (const screen of screenDesigns) {
  for (const key of ['purpose', 'content', 'action', 'mobile', 'states']) assert.ok(screen[key]?.length > 20, `${screen.id} documents ${key}`);
  assert.ok(screen.rows.length >= 3 && screen.rows.every(row => row.length > 0), `${screen.id} has a block composition`);
}
assert.equal(new Set(businessRules.map(([id]) => id)).size, 10);
console.log('Five screen specifications and ten business rules verified.');
