import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import BookingFlow from './BookingFlow.jsx';
import { Tracking, CustomerDashboard, TechnicianDashboard } from './OrderPages.jsx';
import { Home, Services, About, Contact, HowItWorks, Policies, BusinessAnalysis } from './ContentPages.jsx';
import DesignSpecification from './DesignSpecification.jsx';
import { initialState } from './domain.js';
import { loadState, persistState, STORAGE_KEY } from './storage.js';

const pages = [
  ['home', 'Home', '', ''],
  ['services', 'Services', 'Express laundry. At your door.', 'Our signature express care leads the way. Regular laundry covers everyday needs. Express prices are illustrative AED amounts for this prototype.'],
  ['booking', 'Book Express Care', 'Your care. Your doorstep.', 'Six steps to a saved demo booking. No real payment, dispatch or service commitment.'],
  ['tracking', 'Tracking', 'Your order, step by step.', 'A transparent demonstration of service progress, timestamps and care details.'],
  ['dashboard', 'My account', 'Your wardrobe, remembered.', 'Saved demo bookings, service preferences, profile and feedback in this browser.'],
  ['technician', 'Technician demo', 'The technician workspace.', 'Accept suitable jobs and update the same order your demo customer sees.'],
  ['about', 'About us', 'A little closer to ready.', 'Your Clothes. Ready When Life Happens. A proposed on-demand garment-care venture.'],
  ['contact', 'Contact & support', 'Let’s talk garment care.', 'Prototype enquiries, booking help and draft service policies.'],
  ['how-it-works', 'How it works', 'Care without the round trip.', 'From the first booking to the final rating: the complete on-site service model.'],
  ['policies', 'Policies', 'Clear care. Clear commitments.', 'Draft pilot policies and the boundaries of this university prototype.'],
  ['assessment', 'Assessment', 'The thinking behind PRESSLY.', 'BUS201 planning, analysis, design, development and presentation documentation.'],
];
export default function App() {
  const route = () => { const id = window.location.hash.slice(1).split('/')[0]; return pages.some(([key]) => key === id) ? id : 'home'; };
  const [page, setPage] = useState(route), [menu, setMenu] = useState(false), [selected, setSelected] = useState('');
  const [loaded] = useState(() => { try { return loadState(window.localStorage); } catch { return { state: initialState(), error: 'Browser storage is unavailable. Enable local storage to save demo actions.' }; } });
  const [year] = useState(() => new Date().getFullYear());
  const [state, setState] = useState(loaded.state), [error, setError] = useState(loaded.error);
  const [booking, setBooking] = useState({ serviceId: loaded.state.customer.preferredService, rebook: null, key: 0 });
  const heading = useRef(null), main = useRef(null), menuButton = useRef(null), stateRef = useRef(state);
  const navigated = useRef(false);
  function commit(change) {
    try { const current = stateRef.current; const next = persistState(window.localStorage, change(current), current.revision); stateRef.current = next; setState(next); setError(''); return true; }
    catch (issue) { setError(issue.message); return false; }
  }
  function clear() {
    try { window.localStorage.removeItem(STORAGE_KEY); const next = initialState(); stateRef.current = next; setState(next); setError(''); return true; }
    catch { setError('Browser storage is unavailable. Data could not be deleted.'); return false; }
  }
  function go(id) {
    if (window.location.hash === `#${id}`) { window.scrollTo(0, 0); (heading.current || main.current)?.focus(); }
    else window.location.hash = id;
    setMenu(false);
  }
  function book(serviceId = state.customer.preferredService, rebook = null) { setBooking(prev => ({ serviceId, rebook, key: prev.key + 1 })); go('booking'); }
  function track(id) { setSelected(id); go('tracking'); }
  useEffect(() => {
    const onHash = () => { navigated.current = true; setPage(route()); setMenu(false); };
    const sync = event => { if (event.key === STORAGE_KEY || event.key === null) { const next = loadState(window.localStorage); stateRef.current = next.state; setState(next.state); setError(next.error); } };
    window.addEventListener('hashchange', onHash); window.addEventListener('storage', sync);
    return () => { window.removeEventListener('hashchange', onHash); window.removeEventListener('storage', sync); };
  }, []);
  useEffect(() => { document.title = `${pages.find(([id]) => id === page)[1]} — PRESSLY`; window.scrollTo(0, 0); if (navigated.current) (heading.current || main.current)?.focus(); }, [page]);
  useEffect(() => {
    if (!menu) return;
    function close(event) { if (event.key === 'Escape') { setMenu(false); menuButton.current?.focus(); } }
    document.addEventListener('keydown', close); return () => document.removeEventListener('keydown', close);
  }, [menu]);
  const meta = pages.find(([id]) => id === page);
  const content = page === 'services' ? <Services book={book} /> : page === 'booking' ? <BookingFlow key={booking.key} state={state} commit={commit} initialService={booking.serviceId} rebook={booking.rebook} track={track} /> : page === 'tracking' ? <Tracking state={state} commit={commit} selected={selected} select={setSelected} /> : page === 'dashboard' ? <CustomerDashboard state={state} commit={commit} book={book} track={track} clear={clear} /> : page === 'technician' ? <TechnicianDashboard state={state} commit={commit} track={track} /> : page === 'about' ? <About /> : page === 'contact' ? <Contact state={state} commit={commit} /> : page === 'how-it-works' ? <HowItWorks /> : page === 'policies' ? <Policies /> : page === 'assessment' ? <><div className="notice"><p>Supporting classroom documents, not customer service instructions. No original assessment brief was available locally; confirm the final rubric and word-limit interpretation.</p></div><DesignSpecification /><BusinessAnalysis /></> : null;
  return <div className="site-shell"><a className="skip-link" href="#main-content" onClick={e => { e.preventDefault(); main.current?.focus(); }}>Skip to content</a><header className="site-header"><div className="wrap header-inner"><a href="#home" className="wordmark" aria-label="PRESSLY home">pressly</a><nav className="desktop-nav" aria-label="Main navigation">{['services', 'how-it-works', 'dashboard'].map(id => <a key={id} href={`#${id}`} aria-current={page === id ? 'page' : undefined}>{pages.find(([key]) => key === id)[1]}</a>)}</nav><div className="header-actions"><button className="btn btn--primary" onClick={() => book()}>Book Express Care<ArrowUpRight size={17} /></button><button ref={menuButton} className="menu-toggle always-menu" aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} aria-controls="full-navigation" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button></div></div>{menu && <nav id="full-navigation" className="full-navigation" aria-label="All pages"><div className="wrap full-navigation-grid">{pages.map(([id, name]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)} aria-current={page === id ? 'page' : undefined}>{name}<ArrowUpRight size={18} /></a>)}<p>Demo mode · browser-local orders · no real payments</p></div></nav>}</header>{error && <div className="storage-error wrap" role="alert"><strong>Demo data notice</strong><p>{error}</p><a className="inline-link" href="#dashboard">Open My account for storage controls</a></div>}<main id="main-content" ref={main} tabIndex={-1}>{page === 'home' ? <Home book={book} /> : <section className={`page-section page-${page}`}><div className="wrap"><div className="page-heading"><p className="eyebrow">{page === 'assessment' ? 'BUS201 Assessment 2' : 'PRESSLY · Demo mode'}</p><h1 ref={heading} tabIndex={-1}>{meta[2]}</h1><p className="lead">{meta[3]}</p></div>{content}</div></section>}</main><footer className="site-footer"><div className="wrap"><div className="footer-top"><a href="#home" className="wordmark">pressly</a><p>Your Clothes.<br />Ready When Life Happens.</p><nav aria-label="Footer navigation">{pages.map(([id, name]) => <a key={id} href={`#${id}`}>{name}</a>)}</nav></div><div className="footer-bottom"><span>© {year} PRESSLY · BUS201 Assessment 2</span><span>Generated editorial imagery · Browser-local prototype · No real service or payments</span></div></div></footer></div>;
}
