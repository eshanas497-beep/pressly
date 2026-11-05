import DesignSpecification from './DesignSpecification.jsx';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Clock3, MapPin, Menu, Minus, Plus, ShieldCheck, Shirt, X } from 'lucide-react';
import { services, fabrics, stains, fabricStainMatrix, scannerOutcomes, competitors, portersFiveForces, businessModelCanvas, faqs, mockDataInfo } from './data/mockData.js';
import { bookingTotal, bookingWindow, timerText, paymentMethods, paymentMessage } from './booking.js';

const serviceImages = { refresh: ['steam-care', 'Concept image of a cotton shirt being steam refreshed'], stain: ['spot-care', 'Concept image of a linen garment being inspected for spot care'], wash: ['folded-care', 'Concept image of neatly folded cotton and linen garments'] };
const currentYear = new Date().getFullYear();
const pages = [['home', 'Home'], ['services', 'Services'], ['booking', 'Book a service'], ['about', 'The project'], ['contact', 'Contact']];
const locations = ['Financial Centre, Zone B', 'Metro Central, Office District', 'Metro Central, Hotel District'];
const workflow = [
  ['Choose your care', 'A shirt before a meeting. A blazer after a flight. Choose the treatment and quantity.'],
  ['Meet your specialist', 'Confirm a pilot location. The demo models arrival within 30 minutes.'],
  ['Get back to your day', 'Your garments stay with you. Inspect the result before releasing the simulated payment.'],
];
const feasibility = [
  ['Operational', 'A proposed 3 km service zone keeps dispatch local. Travel times need validation in the pilot.'],
  ['Technical', 'Portable steam equipment, a booking interface and dispatch tracking form the proposed service.'],
  ['Financial', 'At an AED 18 order value and AED 11 technician cost, AED 7 remains before other operating costs.'],
  ['Human factors', 'A short booking journey and clear treatment limits help customers make informed choices.'],
  ['Legal & environmental', 'A launch requires local permits, insurance, care protocols and measured environmental claims.'],
];

export default function App() {
  const initialPage = window.location.hash.slice(1);
  const [page, setPage] = useState(pages.some(([id]) => id === initialPage) ? initialPage : 'home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceId, setServiceId] = useState('refresh');
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [location, setLocation] = useState(locations[0]);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('idle');
  const [deadline, setDeadline] = useState(null);
  const [remaining, setRemaining] = useState(1800);
  const [fabric, setFabric] = useState('cotton');
  const [stain, setStain] = useState('coffee');
  const [submitted, setSubmitted] = useState(false);
  const headingRef = useRef(null);
  const didNavigate = useRef(false);
  const service = services.find(item => item.id === serviceId);
  const total = bookingTotal(serviceId, quantity);
  const isWash = serviceId === 'wash';
  const isCash = paymentMethod === 'cash';
  const selectedPayment = paymentMethods.find(method => method.id === paymentMethod);
  const diagnostic = scannerOutcomes[fabricStainMatrix[fabric]?.[stain] || 'unknown'];

  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.slice(1);
      setPage(pages.some(([key]) => key === id) ? id : 'home');
      setMenuOpen(false);
      didNavigate.current = true;
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.title = `${pages.find(([id]) => id === page)?.[1]} — PRESSLY`;
    window.scrollTo(0, 0);
    if (didNavigate.current) headingRef.current?.focus();
  }, [page]);

  useEffect(() => {
    if (status !== 'active' || !deadline) return;
    const tick = () => {
      const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining(seconds);
      if (seconds === 0) setStatus('refunded');
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [status, deadline]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = event => { if (event.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [menuOpen]);

  function navigate(id) {
    didNavigate.current = true;
    setMenuOpen(false);
    if (window.location.hash === `#${id}`) {
      window.scrollTo(0, 0);
      headingRef.current?.focus();
    } else window.location.hash = id;
  }

  function book(id = 'refresh') {
    setServiceId(id);
    setPaymentMethod('card');
    setStep(1);
    setStatus('idle');
    setDeadline(null);
    setRemaining(bookingWindow(id));
    navigate('booking');
  }

  function confirmBooking(event) {
    event.preventDefault();
    const seconds = bookingWindow(serviceId);
    setRemaining(seconds);
    setDeadline(Date.now() + seconds * 1000);
    setStatus('active');
    setStep(3);
  }

  function pageHeading(eyebrow, title, description) {
    return <div className="page-heading"><p className="eyebrow">{eyebrow}</p><h1 ref={headingRef} tabIndex={-1}>{title}</h1><p className="lead">{description}</p></div>;
  }

  function quantityControl() {
    return <div className="quantity-control"><button type="button" aria-label="Decrease quantity" disabled={quantity === 1} onClick={() => setQuantity(value => Math.max(1, value - 1))}><Minus size={16} /></button><output aria-live="polite" aria-label="Quantity">{quantity}</output><button type="button" aria-label="Increase quantity" disabled={quantity === 6} onClick={() => setQuantity(value => Math.min(6, value + 1))}><Plus size={16} /></button></div>;
  }

  function serviceCards() {
    return <div className="service-grid">{services.map((item, index) => <article className={`service-card ${!item.available ? 'future-service' : ''}`} key={item.id}>
      <div className="service-image"><img src={`${import.meta.env.BASE_URL}images/${serviceImages[item.id][0]}.jpg`} alt={serviceImages[item.id][1]} width="1536" height="1024" loading="lazy" decoding="async" data-source="illustration" data-subject="garment care" /></div><div className="service-top"><span className="index">0{index + 1}</span><span className="small">{item.available ? item.id === 'wash' ? '4-hour return target' : `${item.durationMinutes} min treatment` : 'Phase two'}</span></div>
      <h3>{item.name}</h3><p>{item.description}</p><div className="price">AED {item.price}<span> / {item.unit}</span></div>
      <ul>{item.features.filter(feature => feature !== 'Simulated AI stain scan').slice(0, 3).map(feature => <li key={feature}><Check size={15} />{feature}</li>)}</ul>
      {item.bundles.length > 0 && <p className="bundle">Three garments for AED 45. Six for AED 90.</p>}
      <button className="btn btn--secondary" disabled={!item.available} onClick={() => book(item.id)}>{item.available ? `Book ${item.name}` : 'Not available yet'}{item.available && <ArrowUpRight size={18} />}</button>
    </article>)}</div>;
  }

  return <div className="site-shell">
    <a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus(); }}>Skip to content</a>
    <header className="site-header"><div className="wrap header-inner">
      <a href="#home" className="wordmark" aria-label="PRESSLY home">pressly</a>
      <nav className="desktop-nav" aria-label="Main navigation">{pages.filter(([id]) => id !== 'booking').map(([id, label]) => <a href={`#${id}`} key={id} aria-current={page === id ? 'page' : undefined}>{label}</a>)}</nav>
      <div className="header-actions"><button className="btn btn--primary" onClick={() => book()}>Book a service <ArrowUpRight size={17} /></button><button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
    </div>
    {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{pages.map(([id, label]) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)} aria-current={page === id ? 'page' : undefined}>{label}<ArrowUpRight size={22} /></a>)}<p>BUS201 concept · No real payments or dispatch.</p></nav>}
    </header>

    <main id="main-content" tabIndex={-1}>
      {page === 'home' && <>
        <section className="hero"><div className="wrap hero-grid">
          <div className="hero-copy"><p className="eyebrow"><span className="status-dot" />Garment care, at your door</p><h1 ref={headingRef} tabIndex={-1}>A fresh shirt.<br />Without the<br /><em>round trip.</em></h1><p className="hero-lead">On-site steam refresh, spot care and wash & fold for your workday wardrobe. You stay put. We take care of the creases.</p><button className="btn btn--primary" onClick={() => book()}>Book a service <ArrowUpRight size={19} /></button><p className="hero-note">From AED 18 per garment · 30-minute arrival target</p></div>
          <div className="hero-visual"><img src={`${import.meta.env.BASE_URL}images/wardrobe-editorial.jpg`} alt="Editorial concept of a freshly pressed blue shirt, linen blazer and navy trousers in warm afternoon light" width="1536" height="1024" fetchPriority="high" decoding="async" data-source="illustration" data-subject="pressed wardrobe" /></div>
          <div className="hero-bottom"><span>For the meeting. The flight. The everyday.</span><a href="#services">Explore our services <ArrowDownIcon /></a></div>
        </div></section>
        <section className="section services-section"><div className="wrap"><div className="section-heading"><div><p className="eyebrow">A little care goes a long way</p><h2>Care for what<br />you wear.</h2></div><p>Just the treatment you need.<br />Clear prices, before you book.</p></div>{serviceCards()}</div></section>
        <section className="section process-section"><div className="wrap"><div className="section-heading"><div><p className="eyebrow">How it works</p><h2>Your clothes.<br />Still in your day.</h2></div><button className="text-link" onClick={() => book()}>Try a booking <ArrowUpRight size={20} /></button></div><div className="process-grid"><div className="workflow">{workflow.map(([title, description], index) => <article key={title}><span className="step-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div><div className="process-image"><img src={`${import.meta.env.BASE_URL}images/steam-care.jpg`} alt="Concept editorial of gentle steam care for a cotton shirt" width="1536" height="1024" loading="lazy" decoding="async" data-source="illustration" data-subject="steam care process" /></div></div><div className="arrival-note"><Clock3 size={28} strokeWidth={1.3} /><div><h3>An arrival promise you can test.</h3><p>For card and wallet options, the demo holds payment and simulates a refund if arrival exceeds 30 minutes. Cash is payable after service. Treatment time is additional. Rapid Wash uses a separate four-hour return target.</p></div><button className="text-link" onClick={() => navigate('booking')}>Explore the demo <ArrowRight size={18} /></button></div></div></section>
      </>}

      {page === 'services' && <section className="page-section"><div className="wrap">{pageHeading('Services & pricing', 'Good care. Clear prices.', 'Choose steam refresh, spot care or Rapid Wash & Fold. All prices are in AED and belong to this assessment prototype.')}{serviceCards()}<div className="diagnostic-section"><div><p className="eyebrow">Before you book</p><h2>A fabric-first<br />approach.</h2><p>Not every fabric or stain is suitable for on-site treatment. Explore the assessment guide before choosing care.</p><p className="small">{mockDataInfo.scannerDisclaimer} This is a fixed lookup, not a live AI scan.</p></div><div className="form-panel"><div className="field-row"><label htmlFor="fabric">Fabric<select id="fabric" value={fabric} onChange={event => setFabric(event.target.value)}>{fabrics.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label><label htmlFor="stain">Stain<select id="stain" value={stain} onChange={event => setStain(event.target.value)}>{stains.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label></div><div className="diagnostic-result" role="status"><ShieldCheck size={25} /><h3>{diagnostic.label}</h3><p>{diagnostic.message}</p></div>{diagnostic.serviceId && <button className="btn btn--dark" onClick={() => book(diagnostic.serviceId)}>Book a stain assessment <ArrowRight size={18} /></button>}</div></div></div></section>}

      {page === 'booking' && <section className="page-section booking-page"><div className="wrap">{pageHeading('Your booking', 'A little wardrobe reset.', 'An interactive booking demo. No money moves, no technician is dispatched, and no location is tracked.')}<ol className="booking-progress" aria-label="Booking progress">{['Choose care', 'Location & payment', 'Track your service'].map((label, index) => <li key={label} className={step === index + 1 ? 'current' : step > index + 1 ? 'complete' : ''} aria-current={step === index + 1 ? 'step' : undefined}><span>{step > index + 1 ? <Check size={14} /> : `0${index + 1}`}</span>{label}</li>)}</ol>
        <div className="booking-layout"><div className="form-panel booking-form">
          {step === 1 && <><h2>Choose your care</h2><p>Select a service, then add up to six items.</p><fieldset className="service-options"><legend className="sr-only">Service</legend>{services.filter(item => item.available).map(item => <label className={`service-option ${serviceId === item.id ? 'selected' : ''}`} key={item.id}><input type="radio" name="service" value={item.id} checked={serviceId === item.id} onChange={() => setServiceId(item.id)} /><span><strong>{item.name}</strong><span className="small">{item.id === 'wash' ? '4-hour return target' : `${item.durationMinutes} min treatment`} · per {item.unit}</span></span><strong>AED {item.price}</strong></label>)}</fieldset><div className="ticket-line"><div><strong>{isWash ? 'Number of bags' : serviceId === 'stain' ? 'Number of spots' : 'Number of garments'}</strong><span className="small">Maximum six per demo booking</span></div>{quantityControl()}</div><button className="btn btn--dark" onClick={() => setStep(2)}>Choose a location <ArrowRight size={18} /></button></>}
          {step === 2 && <form onSubmit={confirmBooking}><h2>Where shall we meet?</h2><p>Choose one of the fictional pilot locations.</p><label htmlFor="location">Pilot location<select id="location" value={location} onChange={event => setLocation(event.target.value)}>{locations.map(item => <option key={item}>{item}</option>)}</select></label><div className="location-note"><MapPin size={24} /><div><strong>{location}</strong><p>{isWash ? 'Scheduled collection within the proposed pilot zone. Return target: four hours after confirmation.' : 'Within the proposed 3 km pilot zone. Arrival target: 30 minutes after confirmation.'}</p></div></div><fieldset className="payment-methods"><legend>Payment method</legend><p className="small" id="payment-demo-note">Demo options only. No card details are collected and no payment app opens.</p>{paymentMethods.map(method => <label className={paymentMethod === method.id ? 'payment-option selected' : 'payment-option'} key={method.id}><input type="radio" name="payment-method" value={method.id} checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id)} aria-describedby="payment-demo-note" required /><span><strong>{method.label}</strong><span className="small">{method.description}</span></span>{paymentMethod === method.id && <Check size={18} aria-hidden="true" />}</label>)}</fieldset><label className="consent"><input type="checkbox" required /> <span>I understand this is a simulation. Fabric suitability must be checked before real treatment.</span></label><div className="button-row"><button className="btn btn--secondary" type="button" onClick={() => setStep(1)}>Back</button><button className="btn btn--dark" type="submit">Confirm demo booking <ArrowRight size={18} /></button></div></form>}
          {step === 3 && <><p className="eyebrow">Demo booking confirmed</p><h2>{status === 'active' ? (isWash ? 'Your wash & fold countdown.' : 'Your arrival countdown.') : status === 'arrived' ? (isWash ? 'Your laundry has returned.' : 'Arrival confirmed.') : status === 'completed' ? 'Your service is complete.' : (isCash ? 'Service target missed.' : 'Demo payment refunded.')}</h2><p role="status">{status === 'active' ? paymentMessage(paymentMethod, status) : status === 'arrived' ? (isWash ? 'Your washed and folded garments have returned. Inspect them before approving completion.' : 'The technician has arrived. Inspect the treatment before approving completion.') : status === 'completed' ? paymentMessage(paymentMethod, status) : paymentMessage(paymentMethod, status)}</p><div className="countdown" aria-label={`${timerText(remaining)} remaining`}>{status === 'active' ? timerText(remaining) : status === 'refunded' ? '00:00' : <Check size={65} strokeWidth={1} />}</div><div className="tracking-line"><span className="status-dot" />{status === 'active' ? `${isCash ? 'Cash due' : 'Payment held'} · ${isWash ? 'Wash & fold in progress' : 'Awaiting arrival'}` : status === 'arrived' ? (isWash ? 'Returned · Awaiting your approval' : 'Arrived · Awaiting your approval') : status === 'completed' ? (isCash ? 'Service completed · Cash payment recorded' : 'Service completed · Payment released') : (isCash ? 'Target missed · No cash collected' : 'Target missed · Payment returned')}</div>{status === 'active' && <div className="button-row"><button className="btn btn--dark" onClick={() => setStatus('arrived')}>{isWash ? 'Simulate laundry return' : 'Simulate arrival'} <Check size={18} /></button><button className="btn btn--secondary" onClick={() => { setRemaining(0); setStatus('refunded'); }}>{isWash ? 'Simulate late return' : 'Simulate late arrival'}</button></div>}{status === 'arrived' && <button className="btn btn--dark" onClick={() => setStatus('completed')}>{isCash ? 'Approve & record cash payment' : 'Approve & release demo payment'} <ArrowRight size={18} /></button>}{status !== 'active' && <button className="text-link restart-booking" onClick={() => book(serviceId)}>Start another booking <ArrowUpRight size={18} /></button>}</>}
        </div><aside className="order-summary"><p className="eyebrow">Your care, at a glance</p><Shirt size={40} strokeWidth={1} /><h3>{service.name}</h3><dl><div><dt>{isWash ? 'Bags' : serviceId === 'stain' ? 'Spots' : 'Garments'}</dt><dd>{quantity}</dd></div><div><dt>{isWash ? 'Return target' : 'Treatment time'}</dt><dd>{isWash ? 'Within 4 hours' : `Approx. ${service.durationMinutes} min`}</dd></div><div><dt>{isWash ? 'Collection' : 'Arrival target'}</dt><dd>{isWash ? 'Scheduled pickup' : 'Within 30 min'}</dd></div>{step > 1 && <div><dt>Location</dt><dd>{location}</dd></div>}<div><dt>Payment method</dt><dd>{selectedPayment.label}</dd></div></dl>{serviceId === 'refresh' && quantity >= 3 && <p className="bundle">Bundle pricing applied.</p>}<div className="ticket-total"><span>Demo total</span><strong>AED {total}</strong></div><p className="small">No card details or wallet needed. Payment and arrival are simulated.</p></aside></div></div></section>}

      {page === 'about' && <section className="page-section"><div className="wrap">{pageHeading('BUS201 / Assessment 2', 'The thinking behind PRESSLY.', 'A fictional mobile garment-care venture, developed through planning, analysis, design, development and presentation.')}<div className="project-banner"><img src={`${import.meta.env.BASE_URL}images/folded-care.jpg`} alt="Concept editorial of carefully folded garments" width="1536" height="1024" loading="lazy" decoding="async" /></div><div className="project-intro"><h2>Less running around.<br />More care, on site.</h2><div><h3>Our mission</h3><p>Bring targeted garment care to professionals, travellers and residents who need a refresh without a collection-and-return cycle.</p><h3>Our vision & values</h3><p>Explore dependable local garment care, built around clear prices, responsible treatment, customer consent and accountable service.</p></div></div><DesignSpecification /><section className="project-block"><h2>Five dimensions of feasibility</h2><div className="feasibility-grid">{feasibility.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section><section className="project-block"><h2>Porter’s Five Forces</h2><div className="forces-list">{portersFiveForces.map(item => <article key={item.id}><div><h3>{item.name}</h3><span className="tag">{item.intensity}</span></div><p>{item.rationale}</p><p><strong>Response:</strong> {item.response}</p></article>)}</div></section><section className="project-block"><h2>The competitor landscape</h2><p className="small">{mockDataInfo.competitorDisclaimer}</p><div className="table-scroll" role="region" aria-label="Competitor comparison, scroll horizontally" tabIndex={0}><table><caption className="sr-only">Illustrative competitor comparison</caption><thead><tr>{['Company', 'Service model', 'Turnaround', 'On-site care', 'App booking', 'Escrow', 'Sustainability', 'Strength / limitation'].map(label => <th key={label} scope="col">{label}</th>)}</tr></thead><tbody>{competitors.map(item => <tr key={item.id}><th scope="row">{item.name}</th><td>{item.model}</td><td>{item.turnaround}</td><td>{item.onSiteCare ? 'Yes' : 'No'}</td><td>{item.appBooking === null ? 'Not assessed' : item.appBooking ? 'Yes' : 'No'}</td><td>{item.escrow}</td><td>{item.sustainability}</td><td>{item.strength}<br />{item.limitation}</td></tr>)}</tbody></table></div></section><section className="project-block"><h2>Business Model Canvas</h2><div className="canvas-grid">{businessModelCanvas.map(item => <article key={item.id}><h3>{item.title}</h3><ul>{item.items.map(text => <li key={text}>{text}</li>)}</ul></article>)}</div></section></div></section>}

      {page === 'contact' && <section className="page-section"><div className="wrap">{pageHeading('A conversation starts here', 'Let’s talk garment care.', 'Questions about the concept, a potential partnership or assessment feedback? Explore the demo contact form.')}<div className="contact-layout"><div><h2>A note to<br />the team.</h2><div className="contact-phones"><h3>Call us in the UAE</h3><a href="tel:+971564568769">+971 56 456 8769 <ArrowUpRight size={18} /></a><a href="tel:+971589876757">+971 58 987 6757 <ArrowUpRight size={18} /></a></div><p>This is a classroom prototype. The form validates your details locally; it does not send or store your message.</p></div><form className="form-panel" onChange={() => setSubmitted(false)} onSubmit={event => { event.preventDefault(); setSubmitted(true); }}><div className="field-row"><label htmlFor="name">Your name<input id="name" name="name" autoComplete="name" required maxLength={100} /></label><label htmlFor="email">Email address<input id="email" name="email" type="email" autoComplete="email" required maxLength={254} /></label></div><label htmlFor="category">What’s on your mind?<select id="category" name="category"><option>Assessment feedback</option><option>Pilot partnership</option><option>Garment care question</option><option>Technical feedback</option></select></label><label htmlFor="message">Your message<textarea id="message" name="message" rows={5} required maxLength={3000} /></label><button className="btn btn--dark" type="submit">Preview submission <ArrowUpRight size={18} /></button>{submitted && <p className="form-feedback" role="status">Your form is complete. This demo has not sent or saved your message.</p>}</form></div><section className="project-block faq-section"><p className="eyebrow">A few useful answers</p><h2>Care, without the guesswork.</h2><div className="faq-list">{faqs.map(item => <details key={item.id}><summary>{item.question}<Plus size={18} /></summary><p>{item.answer}</p></details>)}</div></section></div></section>}
    </main>
    <footer className="site-footer"><div className="wrap"><div className="footer-top"><a href="#home" className="wordmark">pressly</a><p>Good care.<br />A little closer to home.</p><nav aria-label="Footer navigation">{pages.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav></div><div className="footer-bottom"><span>© {currentYear} PRESSLY · BUS201 Assessment 2</span><span>Concept prototype · Generated editorial imagery · Simulated bookings & payments.</span></div></div></footer>
  </div>;
}

function ArrowDownIcon() {
  return <ArrowRight size={17} className="down-arrow" />;
}


