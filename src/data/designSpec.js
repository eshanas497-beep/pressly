export const screenDesigns = [
  {
    id: 'home', title: 'Home', purpose: 'Introduce the garment-care service and give visitors a direct route to booking.',
    content: 'Service proposition, editorial garment image, starting price in AED, three service choices, three-step process and arrival-target explanation.',
    action: 'Book a service opens the booking page with Express Refresh selected. Each service card opens booking with its own service selected.',
    rows: [['Service headline + booking action', 'Wardrobe editorial image'], ['Express Refresh', 'Stain Rescue', 'Rapid Wash'], ['Three-step service process', 'Steam-care editorial image'], ['Arrival target + booking demo link']],
    mobile: 'Headline, description and full-width booking button come first, followed by the hero image. Service cards and process blocks stack vertically.',
    states: 'All three services are available. Home has no payment fields or account requirement.',
  },
  {
    id: 'services', title: 'Services', purpose: 'Explain prices, treatment limits and fabric suitability before a booking.',
    content: 'Express Refresh at AED 18 per garment, Stain Rescue at AED 24 per spot, Rapid Wash at AED 32 per bag, refresh bundle prices, fabric and stain selectors and assessment outcome.',
    action: 'Book a service card, or choose a fabric and stain to see either a technician-assessment route or a specialist-care referral.',
    rows: [['Services heading + AED pricing introduction'], ['Express Refresh + price', 'Stain Rescue + price', 'Rapid Wash + price'], ['Fabric-care explanation', 'Fabric selector + stain selector + result']],
    mobile: 'Service cards stack in one column. Fabric-care explanation precedes the selectors, with each field on its own row.',
    states: 'Eight fabrics and six stains produce 48 fixed routing combinations. Specialist outcomes do not offer an on-site stain booking action. The guide is not a trained AI model.',
  },
  {
    id: 'booking', title: 'Booking', purpose: 'Configure an order, confirm a location and payment preference, and demonstrate service outcomes.',
    content: 'Three-step progress, service selection, quantity controls, selected location, cash/card/Apple Pay choices, consent, AED total, service countdown and outcome controls.',
    action: 'Choose care → location and payment → confirm demo booking → simulate arrival or laundry return → approve service, or demonstrate a missed target.',
    rows: [['Booking heading + simulation disclosure'], ['01 Choose care → 02 Location & payment → 03 Track service'], ['Active booking form / countdown', 'Service + quantity + payment + AED summary']],
    mobile: 'Progress remains visible above the form. The form and order summary stack, primary actions become full width and fields retain readable text.',
    states: 'Step 1 shows services and quantities. Step 2 shows location, payment and required consent. Step 3 shows active, arrived/returned, completed or missed-target states. Cash never displays a payment hold or refund.',
  },
  {
    id: 'about', title: 'The project', purpose: 'Document the venture and provide the design specification needed to understand and reproduce the solution.',
    content: 'Mission and values, sitemap, five screen compositions, content analysis, layout analysis, business rules, process and data-flow diagrams, implementation boundaries, feasibility, competitive analysis and Business Model Canvas.',
    action: 'Read or expand the design sections, follow sitemap links to the five pages, or download the Markdown specification.',
    rows: [['Project heading + garment editorial'], ['Mission', 'Vision and values'], ['Design specification + sitemap + screen blocks'], ['Rules + process diagrams + implementation documentation'], ['Feasibility + competitive analysis + Business Model Canvas']],
    mobile: 'Documentation stays in one reading column. Screen wireframes include separate desktop and mobile compositions. Wide comparison tables scroll within their own region.',
    states: 'Documentation uses native expandable sections. No team-member allocation or UI/UX staff-role content is displayed.',
  },
  {
    id: 'contact', title: 'Contact', purpose: 'Provide UAE phone contact and a validated feedback-form demonstration.',
    content: 'Phone links +971 56 456 8769 and +971 58 987 6757, name, email, category, message, submission explanation and service FAQs.',
    action: 'Tap a phone number to open the device dialler, or validate a demo inquiry. A valid form shows a local confirmation that no message was sent or saved.',
    rows: [['Contact heading + introduction'], ['UAE phone numbers + contact explanation', 'Name + email + category + message + preview action'], ['Frequently asked questions']],
    mobile: 'Telephone links appear before the form. Name and email stack; FAQs remain keyboard-accessible disclosure rows.',
    states: 'Name, valid email and message are required. Name is limited to 100 characters, email to 254 and message to 3,000. Editing after a preview clears the confirmation. Phone calls are initiated by the visitor.',
  },
];

export const businessRules = [
  ['BR01', 'Pricing and currency', 'All displayed prices use AED. Refresh costs 18 per garment, stain care 24 per spot and wash 32 per bag. No exchange-rate conversion, tax or delivery surcharge is calculated.'],
  ['BR02', 'Quantity and bundles', 'A booking contains one service and an integer quantity from one to six. Refresh total = floor(quantity ÷ 3) × 45 + (quantity mod 3) × 18. Four garments cost AED 63; five cost AED 81; six cost AED 90. Other services use unit price × quantity.'],
  ['BR03', 'Service targets', 'Refresh and Stain Rescue model arrival within 30 minutes; treatment time is additional. Rapid Wash models scheduled collection and return within four hours from confirmation. It is excluded from the 30-minute arrival promise.'],
  ['BR04', 'Location and consent', 'The visitor chooses one of three fictional pilot locations. Confirmation requires the simulation and fabric-suitability consent checkbox. No GPS or live coverage check runs.'],
  ['BR05', 'Payment selection', 'Credit/debit card is the default. Cash and Apple Pay are alternate demo choices. The summary reflects the selection. The site collects no card numbers, wallet credentials or real payments.'],
  ['BR06', 'Cash and digital outcomes', 'Card and Apple Pay simulate a hold, release on approval and return on a missed target. Cash is due after service; approval records a demo cash payment. A missed target records no cash collected, not a refund.'],
  ['BR07', 'Countdown and completion', 'The deadline is calculated from confirmation time. Arrival or laundry return stops the countdown; approval completes the service. Expiry or the late-outcome control produces the missed-target state. A new booking resets the service flow and defaults payment to card.'],
  ['BR08', 'Fabric routing', 'Every combination of eight fabrics and six stains has a fixed outcome. Sensitive materials and ink are referred for specialist inspection; eligible combinations require a technician assessment. No guaranteed removal claim is made.'],
  ['BR09', 'Contact validation', 'Name, syntactically valid email and message are required, with 100, 254 and 3,000 character limits. The form validates in the browser and never sends, stores or logs the inquiry.'],
  ['BR10', 'Navigation and persistence', 'Five hash routes identify the screens. Unknown routes fall back to Home. In-page navigation resets scroll and directs focus to the heading. Browser back/forward changes routes. Booking state is in memory and resets on reload.'],
];

export const layoutAnalysis = [
  ['Visual hierarchy', 'Navy and cream provide the primary contrast, with sage for selected states. Georgia display headings distinguish the service brand from Arial interface text. Each screen has one main heading, plain labels and an obvious primary action.'],
  ['Block compositing', 'Each page combines reusable header, content modules and footer. Desktop hero and process modules use two columns, service modules use three, and booking pairs the active form with a summary. These blocks are shown in the five compositions below.'],
  ['Responsive layouts', 'The content container has equal side margins and a 1,280 px maximum width. Layout rules adapt at 1,100, 850 and 639 px. Under 850 px navigation becomes a menu; under 639 px main splits and cards become one column.'],
  ['Forms and interaction', 'Visible labels identify every field. Native radio groups provide service and payment choices, the quantity control is bounded, consent is required, and selections update the order summary before confirmation.'],
  ['Accessibility', 'The implementation includes a skip link, heading structure, visible keyboard focus, current-page markers, alt text, named icon controls, status announcements and reduced-motion rules. These are implemented features, not a claim of certified accessibility.'],
  ['Images and performance', 'Four local JPEG editorial images have explicit dimensions. The hero image is prioritised and lower-page images load lazily. No external image or font request is required. All photography is generated concept imagery.'],
];

export const documentation = [
  ['Implementation', 'React renders five route-selected pages; Vite builds a static dist directory. App.jsx owns navigation, form and countdown state. booking.js owns pricing, service windows and payment messages. mockData.js supplies service, fabric, FAQ and business data.'],
  ['Data inputs', 'The booking accepts a service ID, integer quantity, one predefined location, a payment-method ID and consent. The assessment guide accepts fabric/stain IDs. Contact accepts name, email, category and message.'],
  ['Derived outputs', 'The browser derives an AED order total, an assessment route, a confirmation deadline, remaining time and a simulated payment/service outcome. No order database, technician API or payment gateway is connected.'],
  ['State and privacy', 'Choices and countdown state live only in React memory. Reloading clears the order. The contact form neither sends nor persists its contents. Native telephone links hand control to the device dialler.'],
  ['Production boundary', 'Real dispatch, address validation, persistence, messaging, cash receipts, card processing and Apple Pay authorisation would require separate server integrations. Demo outcomes must not be interpreted as commercial guarantees.'],
  ['Verification', 'Automated checks cover service prices, quantities, bundles, service windows, payment outcomes and all five page renders. Production build and lint run locally. Interactive browser and visual verification remain outstanding because headless browser connections failed.'],
];

export const acceptanceChecks = [
  ['Navigation', 'Each of the five routes displays its named screen; invalid routes open Home.'],
  ['Pricing', 'Refresh quantities 1–6 total AED 18, 36, 45, 63, 81 and 90. Stain ×4 is AED 96; wash ×6 is AED 192.'],
  ['Validation', 'Quantity cannot exceed 1–6. Missing consent blocks confirmation; invalid email or empty required inquiry fields block submission.'],
  ['Service timing', 'Refresh/stain start at 30:00. Rapid Wash starts at 240:00 and describes a four-hour return target.'],
  ['Payment outcomes', 'Card/Apple Pay show simulated holds and releases; cash shows no advance hold and no refund on a missed target.'],
  ['Assessment guide', 'All 48 fabric/stain combinations resolve; specialist outcomes do not expose the stain-booking action.'],
  ['Responsive review', 'Review navigation, wireframes, forms and table scrolling at 1440, 1024, 768 and 390 px. Manual visual checks remain pending.'],
];
