// BUS201 demonstration fixtures. Prices, scanner results, and competitor
// comparisons are illustrative assumptions, not verified commercial claims.
export const mockDataInfo = {
  isMock: true,
  currency: 'AED',
  scannerDisclaimer: 'Simulated guidance only. Check the care label and obtain a technician assessment before treatment.',
  competitorDisclaimer: 'Illustrative classroom comparison; actual services, availability, and turnaround vary by location.',
};

export { services } from '../domain.js';

export const fabrics = [
  { id: 'cotton', name: 'Cotton', care: 'Check colourfastness and care label.', scannerConfidence: 0.96 },
  { id: 'linen', name: 'Linen', care: 'Check finishes and colourfastness; avoid overworking fibres.', scannerConfidence: 0.91 },
  { id: 'polyester', name: 'Polyester', care: 'Use care-label temperature limits; avoid excess heat.', scannerConfidence: 0.94 },
  { id: 'denim', name: 'Denim', care: 'Check for dye transfer before spot treatment.', scannerConfidence: 0.93 },
  { id: 'wool', name: 'Wool', care: 'Technician review required; avoid agitation and excess moisture.', scannerConfidence: 0.87 },
  { id: 'silk', name: 'Silk', care: 'Specialist assessment required; no automated treatment recommendation.', scannerConfidence: 0.84 },
  { id: 'viscose', name: 'Viscose', care: 'Specialist assessment required because wet treatment may distort fibres.', scannerConfidence: 0.82 },
  { id: 'leather', name: 'Leather / Suede', care: 'Refer to a leather-care specialist.', scannerConfidence: 0.89 },
];

export const stains = [
  { id: 'coffee', name: 'Coffee / Tea', category: 'tannin', scannerConfidence: 0.94 },
  { id: 'wine', name: 'Red Wine', category: 'tannin', scannerConfidence: 0.91 },
  { id: 'oil', name: 'Oil / Grease', category: 'oil', scannerConfidence: 0.88 },
  { id: 'ink', name: 'Ink', category: 'dye', scannerConfidence: 0.83 },
  { id: 'sweat', name: 'Perspiration', category: 'mixed', scannerConfidence: 0.9 },
  { id: 'mud', name: 'Mud', category: 'particulate', scannerConfidence: 0.95 },
];

// Every fabric row covers every stain ID. Values are routing decisions, not
// removal probabilities: assess = inspect first; specialist = decline on-site treatment.
export const fabricStainMatrix = {
  cotton: { coffee: 'assess', wine: 'assess', oil: 'assess', ink: 'specialist', sweat: 'assess', mud: 'assess' },
  linen: { coffee: 'assess', wine: 'assess', oil: 'assess', ink: 'specialist', sweat: 'assess', mud: 'assess' },
  polyester: { coffee: 'assess', wine: 'assess', oil: 'assess', ink: 'specialist', sweat: 'assess', mud: 'assess' },
  denim: { coffee: 'assess', wine: 'assess', oil: 'assess', ink: 'specialist', sweat: 'assess', mud: 'assess' },
  wool: { coffee: 'specialist', wine: 'specialist', oil: 'specialist', ink: 'specialist', sweat: 'specialist', mud: 'specialist' },
  silk: { coffee: 'specialist', wine: 'specialist', oil: 'specialist', ink: 'specialist', sweat: 'specialist', mud: 'specialist' },
  viscose: { coffee: 'specialist', wine: 'specialist', oil: 'specialist', ink: 'specialist', sweat: 'specialist', mud: 'specialist' },
  leather: { coffee: 'specialist', wine: 'specialist', oil: 'specialist', ink: 'specialist', sweat: 'specialist', mud: 'specialist' },
};

export const scannerOutcomes = {
  assess: { label: 'Technician assessment', serviceId: 'stain', message: 'Confirm the care label, stain history, and spot-test result before proceeding.' },
  specialist: { label: 'Specialist care required', serviceId: null, message: 'Refer this combination for specialist inspection before treatment.' },
  unknown: { label: 'Unable to identify', serviceId: null, message: 'Request manual inspection; do not infer suitability from an unclear photo.' },
};

export const competitors = [
  { id: 'pressly', name: 'PRESSLY', isMock: true, model: 'Mobile on-site garment care', turnaround: 'Target: arrival within 30 minutes', onSiteCare: true, appBooking: true, escrow: 'No live payment integration', sustainability: 'Proposed e-bike dispatch and targeted garment care', strength: 'Urgent refresh without garment collection', limitation: 'Pilot coverage and limited treatment scope' },
  { id: 'laundryheap', name: 'Laundryheap', isMock: true, model: 'Illustrative collection-and-delivery model', turnaround: 'Scheduled collection and return', onSiteCare: false, appBooking: true, escrow: 'Not assessed', sustainability: 'Not assessed', strength: 'Convenient outsourced laundry', limitation: 'Collection and return required in this scenario' },
  { id: 'rinse', name: 'Rinse', isMock: true, model: 'Illustrative scheduled garment-care model', turnaround: 'Scheduled collection and return', onSiteCare: false, appBooking: true, escrow: 'Not assessed', sustainability: 'Not assessed', strength: 'Recurring garment-care convenience', limitation: 'Scheduling required in this scenario' },
  { id: 'local-cleaners', name: 'Local Cleaners', isMock: true, model: 'Illustrative neighbourhood shop', turnaround: 'Varies by shop and treatment', onSiteCare: false, appBooking: null, escrow: 'Not assessed', sustainability: 'Varies by shop', strength: 'Specialist inspection and local relationships', limitation: 'Travel or collection arrangements may be needed' },
];

export const portersFiveForces = [
  { id: 'new-entrants', name: 'Threat of New Entrants', intensity: 'Medium', rationale: 'Mobile equipment is accessible, but training, trust, and route density take time to establish.', response: 'Build technician standards and dense pilot service zones.' },
  { id: 'suppliers', name: 'Bargaining Power of Suppliers', intensity: 'Low', rationale: 'Several vendors can supply standard equipment; technician availability remains a constraint.', response: 'Qualify alternative suppliers and maintain spare equipment.' },
  { id: 'buyers', name: 'Bargaining Power of Buyers', intensity: 'Medium', rationale: 'Customers can switch easily and compare price against doing the task themselves.', response: 'Offer clear pricing, reliable arrival estimates, and convenient on-site care.' },
  { id: 'substitutes', name: 'Threat of Substitutes', intensity: 'High', rationale: 'Home washing, ironing, steamers, and traditional cleaners serve related needs.', response: 'Focus on urgent on-site convenience and transparent treatment limits.' },
  { id: 'rivalry', name: 'Competitive Rivalry', intensity: 'Medium', rationale: 'Laundry platforms and local cleaners compete for the same garment-care budget.', response: 'Differentiate through on-site refresh, service quality, and a focused pilot area.' },
];

export const businessModelCanvas = [
  { id: 'key-partners', title: 'Key Partners', items: ['Trained garment-care technicians', 'Equipment and e-bike suppliers', 'Hotel and office pilot partners', 'Payment providers for a future production service'] },
  { id: 'key-activities', title: 'Key Activities', items: ['Dispatch and route planning', 'On-site garment assessment and treatment', 'Technician training and quality assurance', 'Platform maintenance and customer support'] },
  { id: 'key-resources', title: 'Key Resources', items: ['Booking and dispatch prototype', 'Technician network', 'Portable equipment and transport', 'Care protocols and customer trust'] },
  { id: 'value-propositions', title: 'Value Propositions', items: ['Convenient on-site garment refresh', 'Targeted stain assessment', '30-minute arrival target within pilot coverage', 'Transparent pricing and browser-local status history'] },
  { id: 'customer-relationships', title: 'Customer Relationships', items: ['Self-service booking', 'Booking status updates', 'Human support and treatment consent', 'Post-service feedback and repeat bookings'] },
  { id: 'channels', title: 'Channels', items: ['Responsive web application', 'Hotel concierge referrals', 'Office and residential partnerships', 'Social media and word of mouth'] },
  { id: 'customer-segments', title: 'Customer Segments', items: ['Time-constrained professionals', 'Hotel guests and business travellers', 'Residents needing urgent garment refresh', 'Hotels and offices seeking pilot partnerships'] },
  { id: 'cost-structure', title: 'Cost Structure', items: ['Technician compensation', 'Equipment purchase and maintenance', 'Transport and consumables', 'Hosting, payment processing, support, and insurance'] },
  { id: 'revenue-streams', title: 'Revenue Streams', items: ['Pressing and refresh garment fees', 'Express Stain Treatment spot fees', 'Proposed corporate packages', 'Potential future washing revenue, subject to validation'] },
];

// Customer FAQs are maintained in ContentPages.jsx.
