import { priceOrder, serviceById } from './domain.js';
export function bookingTotal(serviceId, quantity) {
  const service = serviceById(serviceId);
  return priceOrder(serviceId, [{ type: service?.garments[0], quantity }]).total;
}
export function bookingWindow(serviceId) {
  if (!serviceById(serviceId)?.available) throw Error('Service is not bookable.');
  return 30 * 60;
}
export function timerText(seconds) {
  const value = Math.max(0, Math.floor(seconds));
  return String(Math.floor(value / 60)).padStart(2, '0') + ':' + String(value % 60).padStart(2, '0');
}
