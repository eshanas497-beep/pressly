/** @typedef {{id:string,name:string,email:string,phone:string,locations:string[],preferredService:string}} Customer */
/** @typedef {{id:string,name:string,available:boolean,capabilities:string[]}} Technician */
/** @typedef {{type:string,quantity:number}} Garment */
/** @typedef {{area:string,address:string,building:string,instructions:string}} ServiceLocation */
/** @typedef {{quantity:number,subtotal:number,serviceFee:number,total:number,currency:string}} Pricing */
/** @typedef {{slot:string,startAt:string,arrivalAt:string,completionAt:string|null}} Timing */
/** @typedef {{type:string,at:string,actor:string,note:string}} StatusEvent */
/** @typedef {{id:string,name:string,price:number,unit:string,duration:string,available:boolean,completionMinutes:number|null,image:string,garments:string[],description:string,features:string[]}} Service */
/** @typedef {{id:string,customerId:string,customer:{name:string,email:string,phone:string},serviceId:string,garments:Garment[],location:ServiceLocation,technicianId:string|null,declinedBy:string[],status:string,pricing:Pricing,timing:Timing,events:StatusEvent[],createdAt:string,updatedAt:string,guaranteeEligible:boolean,feeWaived:boolean,paymentMethod:string,paymentStatus:string,feedback:null|{rating:number,message:string,at:string}}} Booking */
/** @type {Service[]} */
const legacyServices = [
  { id: 'pressing', name: 'Express Pressing', price: 10, unit: 'garment', duration: '15–30 minutes after inspection', available: true, archived: true, completionMinutes: 60, image: 'folded-care', garments: ['Shirt', 'Trousers', 'Suitable dress', 'Selected jacket'], description: 'Wrinkle removal and finishing at your door, subject to the care label.', features: ['Shirts and trousers', 'Selected dresses and jackets', 'Priced per garment'] },
  { id: 'refresh', name: 'Steam Refresh', price: 5, unit: 'garment', duration: '15–30 minutes after inspection', available: true, archived: true, completionMinutes: 60, image: 'steam-care', garments: ['Shirt', 'Trousers', 'Suitable dress', 'Selected jacket'], description: 'Gentle steam for travel creases and certain mild odours. Not a substitute for washing.', features: ['Travel-related wrinkles', 'Care-label suitable garments', 'Priced per garment'] },
  { id: 'stain', name: 'Express Stain Treatment', price: 20, unit: 'spot', duration: 'Assessment required; typically 20–40 minutes for eligible treatment', available: true, archived: true, completionMinutes: null, image: 'spot-care', garments: ['Spot on shirt', 'Spot on trousers', 'Spot on suitable dress'], description: 'Assessment and targeted treatment of eligible light stains. Removal is not guaranteed.', features: ['Fabric and colourfastness assessment', 'Treatment consent required', 'Specialist referral where needed'] },
  { id: 'wash', name: 'Rapid Wash', price: 32, unit: 'bag', duration: 'Validation pending', available: false, completionMinutes: null, image: 'folded-care', garments: [], description: 'A proposed portable washing concept. Equipment, fabric safety and practical timings still require independent testing.', features: ['Coming soon', 'Not available to book', 'Indicative future price only'] },
];
// Retain old service IDs so existing saved orders keep their prices and remain readable.
export const services = [
  { id: 'express-refresh', name: 'Express Refresh', price: 39, unit: 'package', baseGarments: 2, duration: 'Care-label assessment on arrival', available: true, completionMinutes: 60, image: 'steam-care', garments: ['One top + one bottom', 'Additional garment'], description: 'One top + one bottom, refreshed and finished at your location.', features: ['Steam and wrinkle removal', 'Lint, dust and surface-hair removal', 'Collar, cuffs and neckline finishing', 'Trouser crease restoration', 'Fabric brushing and final presentation'] },
  { id: 'formalwear-two', name: 'Formalwear Rescue - 2-piece', price: 59, unit: 'package', baseGarments: 2, duration: 'Care-label assessment on arrival', available: true, completionMinutes: 60, image: 'wardrobe-editorial', garments: ['Jacket + trousers', 'Additional garment'], description: 'A complete two-piece suit: jacket + trousers.', features: ['Professional steaming and wrinkle removal', 'Lint and surface-dust removal', 'Jacket lapel, collar and sleeve finishing', 'Trouser crease restoration', 'Final garment presentation'] },
  { id: 'formalwear-three', name: 'Formalwear Rescue - 3-piece', price: 69, unit: 'package', baseGarments: 3, duration: 'Care-label assessment on arrival', available: true, completionMinutes: 60, image: 'folded-care', garments: ['Jacket + waistcoat + trousers', 'Additional garment'], description: 'A complete three-piece suit: jacket + waistcoat + trousers.', features: ['Professional steaming and wrinkle removal', 'Lint and surface-dust removal', 'Jacket lapel, collar and sleeve finishing', 'Trouser crease restoration', 'Waistcoat finishing', 'Final garment presentation'] },
  { id: 'stain-rescue', name: 'Stain Rescue', price: 49, unit: 'garment', baseGarments: 1, duration: 'Assessment required; no fixed completion deadline', available: true, completionMinutes: null, image: 'spot-care', garments: ['One garment'], description: 'Targeted stain treatment for one garment. Results cannot be guaranteed.', features: ['Fabric and stain assessment', 'Targeted spot treatment', 'Appropriate cleaning and drying', 'Final garment finishing'] },
  ...legacyServices,
];
export const regularServices = [
  { id: 'wash-fold', name: 'Wash & Fold', price: 'AED 49', detail: 'Up to 5 kg', photo: 'wash-fold' },
  { id: 'clean-press', name: 'Clean & Press', price: 'From AED 15', detail: 'Per garment', photo: 'clean-press' },
  { id: 'press-only', name: 'Press Only', price: 'From AED 8', detail: 'Per garment', photo: 'press-only' },
  { id: 'bed-bath', name: 'Bed & Bath', price: 'AED 69', detail: 'Up to 10 items', photo: 'bed-bath' },
];
export const technicians = [
  { id: 'tech-a', name: 'Demo technician A', available: true, capabilities: ['pressing', 'refresh', 'stain', 'express-refresh', 'formalwear-two', 'formalwear-three', 'stain-rescue'] },
  { id: 'tech-b', name: 'Demo technician B', available: true, capabilities: ['pressing', 'refresh', 'express-refresh', 'formalwear-two', 'formalwear-three'] },
];
export const stages = ['confirmed', 'assigned', 'en-route', 'arrived', 'in-progress', 'completed'];
export const statusNames = { confirmed: 'Booking Confirmed', assigned: 'Technician Assigned', 'en-route': 'Technician En Route', arrived: 'Technician Arrived', 'in-progress': 'Service In Progress', completed: 'Service Completed', cancelled: 'Cancelled' };
export const paymentMethods = ['card', 'cash', 'apple-pay'];
export const paymentNames = { card: 'Credit / debit card', cash: 'Cash', 'apple-pay': 'Apple Pay' };
export const areas = ['Dubai — demonstration pilot zone', 'Abu Dhabi — demonstration pilot zone'];
export const money = value => `AED ${Number(value).toFixed(2)}`;
export const serviceById = id => services.find(service => service.id === id);
/** @param {string} serviceId @param {Garment[]} garments @returns {Pricing} */
export function priceOrder(serviceId, garments) {
  const service = serviceById(serviceId);
  if (!service?.available || service.archived || !Array.isArray(garments) || garments.length < 1 || garments.length > service.garments.length) throw Error('Choose an available service and garments.');
  if (new Set(garments.map(item => item.type)).size !== garments.length) throw Error('Combine duplicate garment types.');
  for (const item of garments) if (!service.garments.includes(item.type) || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 6) throw Error('Choose suitable garments and whole quantities from one to six.');
  const quantity = garments.reduce((sum, item) => sum + item.quantity, 0);
  if (quantity > 6) throw Error('Choose a maximum of six garments or spots per booking.');
  const base = garments.find(item => item.type === service.garments[0]);
  if (base?.quantity !== 1) throw Error('Choose exactly one package or one stain-treatment garment per visit.');
  const extras = garments.find(item => item.type === 'Additional garment')?.quantity || 0;
  const garmentCount = service.baseGarments + extras;
  if (garmentCount > 6) throw Error('Choose a maximum of six garments per visit.');
  const subtotal = service.price + extras * 15;
  return { quantity, garmentCount, subtotal, serviceFee: 5, total: subtotal + 5, currency: 'AED' };
}
function text(value, min, max, label) {
  if (typeof value !== 'string' || value.trim().length < min || value.trim().length > max) throw Error(`${label} must contain ${min}–${max} characters.`);
  return value.trim();
}
export function validProfile(input) {
  const name = text(input.name, 2, 100, 'Name'), email = text(input.email, 3, 254, 'Email'), phone = text(input.phone, 7, 30, 'Phone');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw Error('Enter a valid email address.');
  if (!/^[+\d\s()-]+$/.test(phone)) throw Error('Enter a valid contact phone number.');
  return { ...input, name, email, phone };
}
export function validLocation(input) {
  if (!areas.includes(input.area)) throw Error('Choose an eligible demonstration service zone.');
  return { area: input.area, address: text(input.address, 5, 200, 'Address'), building: text(input.building, 2, 100, 'Building and unit'), instructions: text(input.instructions || '', 0, 500, 'Instructions') };
}
export function initialState() {
  return { version: 1, revision: 0, customer: { id: 'demo-customer', name: '', email: '', phone: '', locations: [], preferredService: 'express-refresh' }, orders: [], inquiries: [] };
}
function event(type, at, actor, note = '') { return { type, at, actor, note }; }
export function createOrder(state, input, now = Date.now(), id = globalThis.crypto.randomUUID()) {
  if (state.orders.length >= 100) throw Error('Demo order limit reached. Clear demo data from My account to continue.');
  if (state.orders.some(order => order.id === id)) throw Error('Order ID already exists. Try again.');
  const pricing = priceOrder(input.serviceId, input.garments), customer = validProfile(input.customer), location = validLocation(input.location);
  if (input.consent !== true) throw Error('Please accept the prototype and garment-care consent.');
  if (!paymentMethods.includes(input.paymentMethod)) throw Error('Choose a supported demo payment method.');
  if (!['earliest', 'scheduled'].includes(input.slot)) throw Error('Choose a demonstration slot.');
  const start = input.slot === 'earliest' ? now : Date.parse(input.scheduledAt);
  if (!Number.isFinite(start) || (input.slot === 'scheduled' && (start < now + 30 * 60000 || start > now + 7 * 86400000))) throw Error('Schedule at least 30 minutes ahead and within seven days.');
  const service = serviceById(input.serviceId), at = new Date(now).toISOString();
  const order = { id, customerId: state.customer.id, customer: { name: customer.name, email: customer.email, phone: customer.phone }, serviceId: service.id,
    garments: input.garments.map(item => ({ ...item })), location, technicianId: null, declinedBy: [], status: 'confirmed', pricing,
    paymentMethod: input.paymentMethod, paymentStatus: input.paymentMethod === 'cash' ? 'Due after service (demo)' : 'Simulated authorisation; no charge',
    timing: { slot: input.slot, startAt: new Date(start).toISOString(), arrivalAt: new Date(start + 30 * 60000).toISOString(), completionAt: service.completionMinutes ? new Date(start + service.completionMinutes * 60000).toISOString() : null },
    guaranteeEligible: service.completionMinutes === 60 && pricing.garmentCount <= 3 && input.slot === 'earliest', feeWaived: false,
    createdAt: at, updatedAt: at, events: [event('confirmed', at, 'customer', 'Demo checkout confirmed. No real charge or dispatch.')], feedback: null };
  return { ...state, customer: { ...state.customer, ...customer, id: state.customer.id, preferredService: service.id, locations: [...new Set([location.address, ...state.customer.locations])].slice(0, 5) }, orders: [order, ...state.orders] };
}
export function eligibleTechnician(state, technicianId, order) {
  const tech = technicians.find(item => item.id === technicianId);
  return Boolean(tech?.available && tech.capabilities.includes(order.serviceId) && !order.declinedBy.includes(tech.id) && !state.orders.some(item => item.technicianId === tech.id && !['completed', 'cancelled'].includes(item.status)));
}
export function updateOrder(state, id, action, actor, now = Date.now()) {
  const current = state.orders.find(order => order.id === id);
  if (!current) throw Error('Order not found.');
  if (['completed', 'cancelled'].includes(current.status)) throw Error('This order is closed.');
  if (now < Date.parse(current.updatedAt)) throw Error('Your device clock moved backwards. Correct it and retry.');
  const at = new Date(now).toISOString(), order = { ...current, events: [...current.events] };
  if (action === 'cancel') {
    if (actor !== 'customer' || !['confirmed', 'assigned'].includes(order.status)) throw Error('Cancellation is available only before the technician is en route.');
    order.status = 'cancelled'; order.paymentStatus = 'Demo order cancelled; no payment collected';
  } else if (action === 'decline') {
    if (order.status !== 'confirmed' || !eligibleTechnician(state, actor, order)) throw Error('This request cannot be declined by this technician.');
    order.declinedBy = [...order.declinedBy, actor]; order.events.push(event('declined', at, actor, 'Request remains open to another eligible technician.'));
  } else if (action === 'accept') {
    if (order.status !== 'confirmed' || !eligibleTechnician(state, actor, order)) throw Error('This job is unavailable or outside your capabilities.');
    order.technicianId = actor; order.status = 'assigned';
  } else {
    const next = stages[stages.indexOf(order.status) + 1];
    if (order.status === 'confirmed' || !next || action !== next || !order.technicianId || actor !== order.technicianId) throw Error('Invalid status change or unassigned technician.');
    if (now < Date.parse(order.timing.startAt)) throw Error('This scheduled job cannot start before its selected slot.');
    order.status = action;
    if (action === 'completed') {
      order.feeWaived = order.guaranteeEligible && now > Date.parse(order.timing.completionAt); order.completedAt = at;
      order.paymentStatus = order.paymentMethod === 'cash' ? 'Demo cash recorded after service' : 'Simulated payment completed; no money moved';
    }
  }
  if (action !== 'decline') order.events.push(event(order.status, at, actor, order.feeWaived ? 'Eligible promotional service fee waived: AED 5.' : ''));
  order.updatedAt = at;
  return { ...state, orders: state.orders.map(item => item.id === id ? order : item) };
}
export function addFeedback(state, id, rating, message, now = Date.now()) {
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) throw Error('Choose a rating from one to five.');
  const comment = text(message, 0, 1000, 'Feedback'), order = state.orders.find(item => item.id === id);
  if (!order || order.status !== 'completed' || order.feedback) throw Error('Feedback is available once per completed order.');
  return { ...state, orders: state.orders.map(item => item.id === id ? { ...item, feedback: { rating, message: comment, at: new Date(now).toISOString() } } : item) };
}
export function addInquiry(state, input, now = Date.now(), id = globalThis.crypto.randomUUID()) {
  const name = text(input.name, 2, 100, 'Name'), email = text(input.email, 3, 254, 'Email'), message = text(input.message, 5, 3000, 'Message');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw Error('Enter a valid email address.');
  return { ...state, inquiries: [{ id, name, email, message, at: new Date(now).toISOString() }, ...state.inquiries].slice(0, 30) };
}
