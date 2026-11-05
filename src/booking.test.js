import assert from 'node:assert/strict';
import { bookingTotal, bookingWindow, timerText, paymentMethods, paymentMessage } from './booking.js';
import { services, mockDataInfo, faqs } from './data/mockData.js';
assert.deepEqual([1, 2, 3, 4, 5, 6].map(count => bookingTotal('refresh', count)), [18, 36, 45, 63, 81, 90]);
assert.equal(bookingTotal('stain', 4), 96);
assert.equal(bookingTotal('wash', 1), 32);
assert.equal(bookingTotal('wash', 6), 192);
for (const count of [0, 7, 1.5, NaN]) assert.throws(() => bookingTotal('wash', count), RangeError);
assert.throws(() => bookingTotal('unknown', 1), RangeError);
assert.equal(bookingWindow('refresh'), 1800);
assert.equal(bookingWindow('stain'), 1800);
assert.equal(bookingWindow('wash'), 14400);
assert.throws(() => bookingWindow('unknown'), RangeError);
assert.equal(timerText(14400), '240:00');
assert.equal(timerText(1800), '30:00');
assert.equal(timerText(61), '01:01');
assert.equal(timerText(-1), '00:00');
assert.equal(mockDataInfo.currency, 'AED');
assert.ok(services.every(service => service.currency === 'AED' && service.available));
assert.ok(faqs.find(item => item.id === 'rapid-wash').answer.includes('AED 32'));
console.log('All service prices, Rapid Wash timing, quantity limits and AED currency checks passed.');

assert.deepEqual(paymentMethods.map(method => method.id), ['card', 'cash', 'apple-pay']);
for (const method of ['card', 'apple-pay']) {
  assert.ok(paymentMessage(method, 'active').includes('payment is held'));
  assert.ok(paymentMessage(method, 'completed').includes('released'));
  assert.ok(paymentMessage(method, 'refunded').includes('returned'));
}
assert.ok(paymentMessage('cash', 'active').includes('No payment is held'));
assert.ok(paymentMessage('cash', 'completed').includes('Cash payment is recorded'));
assert.ok(paymentMessage('cash', 'refunded').includes('No cash was collected'));
assert.throws(() => paymentMessage('unknown', 'active'), RangeError);
console.log('Cash, card and Apple Pay demo payment outcomes passed.');
