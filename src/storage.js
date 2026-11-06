import { initialState, serviceById, stages, technicians, paymentMethods, validLocation } from './domain.js';
export const STORAGE_KEY = 'pressly-demo-v1';
export function validateState(data) {
  if (data?.version !== 1 || !Number.isInteger(data.revision) || !data.customer || data.customer.id !== 'demo-customer' || !Array.isArray(data.customer.locations) || !Array.isArray(data.orders) || !Array.isArray(data.inquiries)) throw Error('Saved demo data is invalid.');
  if (data.orders.length > 100 || new Set(data.orders.map(order => order.id)).size !== data.orders.length) throw Error('Saved orders are invalid.');
  const string = (value, max = 3000) => typeof value === 'string' && value.length <= max;
  const timestamp = value => typeof value === 'string' && Number.isFinite(Date.parse(value));
  if (!['name', 'email', 'phone'].every(key => string(data.customer[key], 254)) || data.customer.locations.length > 5 || !data.customer.locations.every(value => string(value, 200)) || !serviceById(data.customer.preferredService)?.available || data.inquiries.length > 30) throw Error('Saved profile data is invalid.');
  for (const order of data.orders) {
    const service = serviceById(order.serviceId);
    if (!string(order.id, 100) || !service?.available || ![...stages, 'cancelled'].includes(order.status) || !Array.isArray(order.events) || !Array.isArray(order.garments) || !Array.isArray(order.declinedBy) || !order.customer || !Number.isFinite(order.pricing?.total) || !timestamp(order.timing?.startAt)) throw Error('A saved order is damaged.');
    validLocation(order.location);
    if (!['name', 'email', 'phone'].every(key => string(order.customer[key], 254)) || !paymentMethods.includes(order.paymentMethod) || !string(order.paymentStatus, 200) || !timestamp(order.createdAt) || !timestamp(order.updatedAt) || !timestamp(order.timing.arrivalAt) || !(order.timing.completionAt === null || timestamp(order.timing.completionAt))) throw Error('Saved order details are invalid.');
    if (order.technicianId !== null && !technicians.some(tech => tech.id === order.technicianId)) throw Error('Saved technician is invalid.');
    if (['assigned', 'en-route', 'arrived', 'in-progress', 'completed'].includes(order.status) && !order.technicianId) throw Error('Saved assignment is invalid.');
    if (!order.garments.length || order.garments.length > 4 || !order.garments.every(item => service.garments.includes(item.type) && Number.isInteger(item.quantity) && item.quantity >= 1 && item.quantity <= 6)) throw Error('Saved garments are invalid.');
    const quantity = order.garments.reduce((sum, item) => sum + item.quantity, 0);
    if (quantity > 6 || quantity !== order.pricing.quantity || !['subtotal', 'serviceFee', 'total'].every(key => Number.isFinite(order.pricing[key]) && order.pricing[key] >= 0) || Math.abs(order.pricing.subtotal + order.pricing.serviceFee - order.pricing.total) > .001) throw Error('Saved price is invalid.');
    if (!order.events.length || !order.events.every(item => string(item.type, 50) && timestamp(item.at) && string(item.actor, 100) && string(item.note, 500))) throw Error('Saved event history is invalid.');
    if (order.feedback !== null && (!Number.isInteger(order.feedback?.rating) || order.feedback.rating < 1 || order.feedback.rating > 5 || !string(order.feedback.message, 1000) || !timestamp(order.feedback.at))) throw Error('Saved feedback is invalid.');
  }
  for (const inquiry of data.inquiries) if (!['id', 'name', 'email', 'message'].every(key => string(inquiry[key])) || !timestamp(inquiry.at)) throw Error('Saved inquiry is invalid.');
  return data;
}
export function loadState(storage) {
  try { const raw = storage.getItem(STORAGE_KEY); return { state: raw ? validateState(JSON.parse(raw)) : initialState(), error: '' }; }
  catch { return { state: initialState(), error: 'Saved demo data could not be read. Stored data has not been overwritten. Use Clear demo data in My account to reset, or enable browser storage.' }; }
}
export function persistState(storage, next, expectedRevision) {
  try {
    const raw = storage.getItem(STORAGE_KEY), previous = raw ? validateState(JSON.parse(raw)) : initialState();
    if (previous.revision !== expectedRevision) throw Error('Another tab updated the demo. Reload this page before retrying.');
    const saved = validateState({ ...next, revision: expectedRevision + 1 }); storage.setItem(STORAGE_KEY, JSON.stringify(saved)); return saved;
  } catch (error) {
    if (error.message.includes('Another tab')) throw error;
    throw Error('Unable to save demo data. Enable browser storage or clear damaged demo data from My account. Your action was not saved.');
  }
}
