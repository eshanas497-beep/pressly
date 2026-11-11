import assert from 'node:assert/strict';
import { createOrder, initialState, areas } from './domain.js';
import { loadState, persistState, STORAGE_KEY } from './storage.js';
class MemoryStorage { data = new Map(); getItem(key) { return this.data.get(key) ?? null; } setItem(key, value) { this.data.set(key, value); } }
const storage = new MemoryStorage();
assert.deepEqual(loadState(storage).state, initialState());
const next = createOrder(initialState(), { serviceId: 'express-refresh', garments: [{ type: 'One top + one bottom', quantity: 1 }], customer: { name: 'Demo User', email: 'demo@example.test', phone: '+971500000000' }, location: { area: areas[0], address: 'Fictional Demo Street', building: 'Unit 12', instructions: '' }, slot: 'earliest', paymentMethod: 'card', consent: true }, Date.now(), 'saved-order');
const saved = persistState(storage, next, 0);
assert.equal(saved.revision, 1);
const reloaded = loadState(storage);
assert.equal(reloaded.error, '');
assert.deepEqual(reloaded.state, saved);
assert.throws(() => persistState(storage, next, 0), /Another tab/);
const before = storage.getItem(STORAGE_KEY);
assert.throws(() => persistState({ getItem: key => storage.getItem(key), setItem() { throw Error('Quota exceeded'); } }, saved, 1), /Unable to save/);
assert.equal(storage.getItem(STORAGE_KEY), before);
storage.setItem(STORAGE_KEY, '{broken json');
assert.match(loadState(storage).error, /could not be read/);
assert.equal(storage.getItem(STORAGE_KEY), '{broken json');
assert.throws(() => persistState(storage, next, 0), /Unable to save/);
for (const invalid of [{}, { ...initialState(), orders: [{ id: 'bad' }] }, { ...initialState(), version: 99 }]) {
  storage.setItem(STORAGE_KEY, JSON.stringify(invalid)); assert.ok(loadState(storage).error);
}
const unavailable = { getItem() { throw Error('Blocked'); }, setItem() { throw Error('Blocked'); } };
assert.ok(loadState(unavailable).error); assert.throws(() => persistState(unavailable, next, 0));
console.log('PASS storage: reload, revisions, corruption, unavailable storage and quota failure preserve honest save outcomes.');

// Existing orders retain their original service IDs and price snapshots after the package update.
const legacy = structuredClone(saved);
legacy.customer.preferredService = 'pressing';
legacy.orders[0].serviceId = 'pressing';
legacy.orders[0].garments = [{ type: 'Shirt', quantity: 1 }];
legacy.orders[0].pricing = { quantity: 1, subtotal: 10, serviceFee: 5, total: 15, currency: 'AED' };
const legacyStorage = new MemoryStorage();
legacyStorage.setItem(STORAGE_KEY, JSON.stringify(legacy));
assert.deepEqual(loadState(legacyStorage).state, legacy);
assert.equal(loadState(legacyStorage).error, '');
console.log('PASS legacy saved-order compatibility: original prices preserved.');
