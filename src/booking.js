import { services } from './data/mockData.js';

export function bookingTotal(serviceId, quantity) {
  const service = services.find(item => item.id === serviceId && item.available);
  if (!service || !Number.isInteger(quantity) || quantity < 1 || quantity > 6) {
    throw new RangeError('Choose an available service and one to six items.');
  }
  return serviceId === 'refresh'
    ? Math.floor(quantity / 3) * 45 + (quantity % 3) * service.price
    : quantity * service.price;
}

export function bookingWindow(serviceId) {
  const service = services.find(item => item.id === serviceId && item.available);
  if (!service) throw new RangeError('Choose an available service.');
  return (service.arrivalSlaMinutes ?? service.durationMinutes) * 60;
}

export function timerText(seconds) {
  const value = Math.max(0, Math.floor(seconds));
  return `${Math.floor(value / 60).toString().padStart(2, '0')}:${(value % 60).toString().padStart(2, '0')}`;
}

export const paymentMethods = [
  { id: 'card', label: 'Credit / debit card', description: 'Simulated payment hold until you approve the service.' },
  { id: 'cash', label: 'Cash', description: 'Pay after the service. No advance payment or hold.' },
  { id: 'apple-pay', label: 'Apple Pay', description: 'Demo selection only; no wallet connection or charge.' },
];

export function paymentMessage(method, status) {
  if (!paymentMethods.some(item => item.id === method)) throw new RangeError('Choose a supported payment method.');
  if (method === 'cash') {
    if (status === 'completed') return 'You approved the service. Cash payment is recorded for this demo only.';
    if (status === 'refunded') return 'The service target was missed. No cash was collected; there is no payment to refund.';
    return 'Cash is due after the service. No payment is held. Use the controls below to demonstrate each outcome.';
  }
  if (status === 'completed') return 'You approved the service. The simulated payment has been released.';
  if (status === 'refunded') return 'The service target was missed. Your simulated payment has been returned.';
  return 'The simulated payment is held. Use the controls below to demonstrate each outcome.';
}
