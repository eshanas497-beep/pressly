// BUS201 demonstration fixtures. Prices, scanner results, and competitor
// comparisons are illustrative assumptions, not verified commercial claims.
export const mockDataInfo = {
  isMock: true,
  currency: 'AED',
  scannerDisclaimer: 'Simulated guidance only. Check the care label and obtain a technician assessment before treatment.',
  competitorDisclaimer: 'Illustrative classroom comparison; actual services, availability, and turnaround vary by location.',
};

export const services = [
  {
    id: 'refresh',
    name: 'Express Refresh',
    description: 'On-site steam refresh for wrinkles and everyday garment odours.',
    price: 18,
    currency: 'AED',
    unit: 'garment',
    durationMinutes: 15,
    arrivalSlaMinutes: 30,
    phase: 1,
    available: true,
    icon: 'Wind',
    features: ['On-site garment assessment', 'Care-label appropriate steaming', 'Wrinkle release', 'Digital completion receipt'],
    bundles: [{ quantity: 3, price: 45 }, { quantity: 6, price: 90 }],
    exclusions: ['Full wash', 'Guaranteed stain removal', 'Garments unsuitable for steaming'],
  },
  {
    id: 'stain',
    name: 'Stain Rescue',
    description: 'Targeted spot assessment and treatment for eligible fabrics and stains.',
    price: 24,
    currency: 'AED',
    unit: 'spot',
    durationMinutes: 25,
    arrivalSlaMinutes: 30,
    phase: 1,
    available: true,
    icon: 'Sparkles',
    features: ['Simulated AI stain scan', 'Technician inspection', 'Colourfastness spot test', 'Targeted treatment'],
    bundles: [],
    exclusions: ['Guaranteed stain removal', 'Unsafe or unidentified chemical contamination', 'Specialist-only fabrics'],
  },
  {
    id: 'wash',
    name: 'Rapid Wash',
    description: 'Wash and fold with scheduled collection and return.',
    price: 32,
    currency: 'AED',
    unit: 'bag',
    durationMinutes: 240,
    arrivalSlaMinutes: null,
    phase: 1,
    available: true,
    icon: 'WashingMachine',
    features: ['Scheduled collection', 'Fabric sorting', 'Wash and dry', 'Folded return'],
    bundles: [],
    exclusions: ['30-minute arrival guarantee', 'Dry-clean-only garments', 'Delicate specialist items'],
  },
];

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

export const teamMembers = [
  { id: 'member-1', name: 'Member 1', role: 'Project Manager', module: 'Planning', moduleNumber: 1, responsibilities: ['Project scope and objectives', 'Schedule and risk register', "Porter’s Five Forces"], deliverables: ['Project charter', 'Feasibility outline', 'Competitive strategy'] },
  { id: 'member-2', name: 'Member 2', role: 'Market Analyst', module: 'Analysis', moduleNumber: 2, responsibilities: ['Customer requirements', 'Competitor comparison', 'Business Model Canvas'], deliverables: ['Requirements specification', 'Market analysis', 'Business Model Canvas'] },
  { id: 'member-3', name: 'Member 3', role: 'UI/UX Designer', module: 'Design', moduleNumber: 3, responsibilities: ['Accessible booking journey', 'Sitemap and wireframes', 'Visual design system'], deliverables: ['Sitemap', 'Wireframes', 'Interactive prototype'] },
  { id: 'member-4', name: 'Member 4', role: 'Full-Stack Developer', module: 'Development', moduleNumber: 4, responsibilities: ['React implementation', 'Escrow and dispatch simulation', 'Scanner mock integration'], deliverables: ['Working prototype', 'Mock data module', 'Build documentation'] },
  { id: 'member-5', name: 'Member 5', role: 'QA & Pitch Lead', module: 'Presentation', moduleNumber: 5, responsibilities: ['User acceptance testing', 'Demo coordination', 'Board evaluation pitch'], deliverables: ['UAT report', '14-slide presentation', 'Demonstration script'] },
];

export const competitors = [
  { id: 'pressly', name: 'PRESSLY', isMock: true, model: 'Mobile on-site garment care', turnaround: 'Target: arrival within 30 minutes', onSiteCare: true, appBooking: true, escrow: 'Simulated', sustainability: 'Proposed e-bike dispatch and targeted garment care', strength: 'Urgent refresh without garment collection', limitation: 'Pilot coverage and limited treatment scope' },
  { id: 'laundryheap', name: 'Laundryheap', isMock: true, model: 'Illustrative collection-and-delivery model', turnaround: 'Scheduled collection and return', onSiteCare: false, appBooking: true, escrow: 'Not assessed', sustainability: 'Not assessed', strength: 'Convenient outsourced laundry', limitation: 'Collection and return required in this scenario' },
  { id: 'rinse', name: 'Rinse', isMock: true, model: 'Illustrative scheduled garment-care model', turnaround: 'Scheduled collection and return', onSiteCare: false, appBooking: true, escrow: 'Not assessed', sustainability: 'Not assessed', strength: 'Recurring garment-care convenience', limitation: 'Scheduling required in this scenario' },
  { id: 'local-cleaners', name: 'Local Cleaners', isMock: true, model: 'Illustrative neighbourhood shop', turnaround: 'Varies by shop and treatment', onSiteCare: false, appBooking: null, escrow: 'Not assessed', sustainability: 'Varies by shop', strength: 'Specialist inspection and local relationships', limitation: 'Travel or collection arrangements may be needed' },
];

export const portersFiveForces = [
  { id: 'new-entrants', name: 'Threat of New Entrants', intensity: 'Medium', rationale: 'Mobile equipment is accessible, but training, trust, and route density take time to establish.', response: 'Build technician standards and dense pilot service zones.' },
  { id: 'suppliers', name: 'Bargaining Power of Suppliers', intensity: 'Low', rationale: 'Several vendors can supply standard equipment; technician availability remains a constraint.', response: 'Qualify alternative suppliers and maintain spare equipment.' },
  { id: 'buyers', name: 'Bargaining Power of Buyers', intensity: 'Medium', rationale: 'Customers can switch easily and compare price against doing the task themselves.', response: 'Offer clear pricing, reliable arrival estimates, and convenient bundles.' },
  { id: 'substitutes', name: 'Threat of Substitutes', intensity: 'High', rationale: 'Home washing, ironing, steamers, and traditional cleaners serve related needs.', response: 'Focus on urgent on-site convenience and transparent treatment limits.' },
  { id: 'rivalry', name: 'Competitive Rivalry', intensity: 'Medium', rationale: 'Laundry platforms and local cleaners compete for the same garment-care budget.', response: 'Differentiate through on-site refresh, service quality, and a focused pilot area.' },
];

export const businessModelCanvas = [
  { id: 'key-partners', title: 'Key Partners', items: ['Trained garment-care technicians', 'Equipment and e-bike suppliers', 'Hotel and office pilot partners', 'Payment providers for a future production service'] },
  { id: 'key-activities', title: 'Key Activities', items: ['Dispatch and route planning', 'On-site garment assessment and treatment', 'Technician training and quality assurance', 'Platform maintenance and customer support'] },
  { id: 'key-resources', title: 'Key Resources', items: ['Booking and dispatch prototype', 'Technician network', 'Portable equipment and transport', 'Care protocols and customer trust'] },
  { id: 'value-propositions', title: 'Value Propositions', items: ['Convenient on-site garment refresh', 'Targeted stain assessment', '30-minute arrival target within pilot coverage', 'Transparent pricing and simulated escrow visibility'] },
  { id: 'customer-relationships', title: 'Customer Relationships', items: ['Self-service booking', 'Booking status updates', 'Human support and treatment consent', 'Post-service feedback and repeat bookings'] },
  { id: 'channels', title: 'Channels', items: ['Responsive web application', 'Hotel concierge referrals', 'Office and residential partnerships', 'Social media and word of mouth'] },
  { id: 'customer-segments', title: 'Customer Segments', items: ['Time-constrained professionals', 'Hotel guests and business travellers', 'Residents needing urgent garment refresh', 'Hotels and offices seeking pilot partnerships'] },
  { id: 'cost-structure', title: 'Cost Structure', items: ['Technician compensation', 'Equipment purchase and maintenance', 'Transport and consumables', 'Hosting, payment processing, support, and insurance'] },
  { id: 'revenue-streams', title: 'Revenue Streams', items: ['Express Refresh garment fees', 'Stain Rescue spot fees', 'Multi-garment bundles', 'Proposed corporate packages', 'Rapid Wash bag fees'] },
];

export const faqs = [
  { id: 'payment-methods', category: 'Payments', question: 'Which payment methods can I choose?', answer: 'Choose cash, credit or debit card, or Apple Pay at checkout. All options are simulated. Cash is payable after service; digital payment holds and refunds are demonstrations only. No card details are collected and no wallet is connected.' },
  { id: 'prototype', category: 'General', question: 'Is PRESSLY a live commercial service?', answer: 'This BUS201 assessment prototype uses mock bookings, scanner outputs, dispatch, and payments. It does not send a technician or charge money.' },
  { id: 'arrival', category: 'Booking', question: 'What does the 30-minute promise cover?', answer: 'The prototype models technician arrival within 30 minutes in a pilot service zone. Treatment time is additional; Rapid Wash is excluded.' },
  { id: 'coverage', category: 'Booking', question: 'Where is the pilot service available?', answer: 'The demonstration assumes a 3 km dispatch zone. Coverage is fictional and must be confirmed before a real launch.' },
  { id: 'refresh', category: 'Services', question: 'Does Express Refresh replace washing?', answer: 'Express Refresh targets wrinkles and everyday odours. Garments requiring full cleaning should use a suitable laundry or specialist service.' },
  { id: 'stains', category: 'Services', question: 'Can every stain be removed?', answer: 'No. Fabric, dye stability, stain age, and previous treatment affect suitability. A technician must inspect the garment and obtain consent before treatment.' },
  { id: 'scanner', category: 'AI Scanner', question: 'How accurate is the AI scanner?', answer: 'The scanner uses fixed mock fabric and stain results. Confidence values are illustrative and do not represent a trained or validated model.' },
  { id: 'delicates', category: 'AI Scanner', question: 'Can I book silk, wool, or leather treatment?', answer: 'The mock matrix routes these materials to specialist assessment. Follow the garment care label and avoid automated treatment decisions.' },
  { id: 'pricing', category: 'Pricing', question: 'What are the demonstration prices?', answer: 'Express Refresh is AED 18 per garment, with 3 for AED 45 or 6 for AED 90. Stain Rescue is AED 24 per spot. Rapid Wash is AED 32 per bag.' },
  { id: 'escrow', category: 'Payments', question: 'How does Web 3.0 escrow work here?', answer: 'The interface simulates holding payment until service completion. It does not connect to a blockchain, deploy a smart contract, or transfer funds.' },
  { id: 'wallet', category: 'Payments', question: 'Do I need a crypto wallet?', answer: 'No wallet or real payment details are needed to use the assessment prototype.' },
  { id: 'cancellation', category: 'Booking', question: 'Can I cancel a booking?', answer: 'Demo bookings create no real commitments or charges. Cancellation windows and refund rules would need to be defined for a commercial launch.' },
  { id: 'rapid-wash', category: 'Services', question: 'When can I use Rapid Wash?', answer: 'You can book Rapid Wash in the demo for AED 32 per bag. Scheduled collection and a four-hour return target are simulated; the 30-minute arrival promise does not apply.' },
  { id: 'sustainability', category: 'Sustainability', question: 'How does PRESSLY approach sustainability?', answer: 'The concept proposes e-bike dispatch and targeted garment care. Any water, emissions, or energy savings would need measurement before being presented as verified results.' },
  { id: 'contact', category: 'Support', question: 'How can I share assessment feedback?', answer: 'Use the Contact module for board evaluation, pilot partnership, or technical feedback. Submission is simulated in this prototype.' },
];
