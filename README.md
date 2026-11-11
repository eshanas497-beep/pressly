# PRESSLY

**Your Clothes. Ready When Life Happens.**

A BUS201 prototype for on-demand garment care at the customer's home, hotel or office. Built with React 19, Vite, CSS, Tailwind and Lucide icons.

## Project status

Read [the current handoff and project status](docs/project-status.md) before continuing development. It records the implementation, deployment evidence, tests and remaining work, including when the original Windows folder is unavailable.

## Start

```sh
npm ci
npm run dev
```

Use Node 22.12 or later supported by Vite. On Windows PowerShell use `npm.cmd` if script execution is restricted.

```sh
node scripts/generate-design-spec.mjs
npm test
npm run lint
npm run build
node scripts/production-check.mjs
npm run preview
```

## Try the complete demo

1. Open Services, inspect the calculator and book an available service.
2. Complete service, garments, fictional customer/location, time, review and demo checkout.
3. Tracking displays the saved order and its unique ID.
4. Open the all-pages menu → Technician demo. Select a capable technician and accept the request.
5. Advance the job through en route, arrived, in progress and completed. Scheduled jobs cannot start before the selected slot.
6. Return to Tracking or My account, inspect status events, reload and save feedback.
7. Try rebooking, profile changes, local support requests and cancellation before departure.

All views share one browser's localStorage. Same-origin tabs refresh on storage events; stale saves are rejected. Nothing synchronises to another browser or device. If storage is blocked or full, an error appears and a successful booking is not claimed. My account offers explicit local-data deletion. Use fictional contact and address details, particularly on shared devices.

## Screens

Home, Services, Book Express Care, Tracking, My account, Technician demo, About us, Contact & support, How it works, Policies and a separate Assessment page. These are hash routes inside one HTML application. Main navigation stays focused; the all-pages menu and footer expose every screen.

## Prices and timing

- Express Refresh: AED 39 for one top + one bottom.
- Formalwear Rescue: AED 59 for jacket + trousers; AED 69 for jacket + waistcoat + trousers.
- Stain Rescue: AED 49 for one garment; removal depends on fabric/stain suitability and is not guaranteed.
- Additional eligible refresh/formalwear garment during the same visit: AED 15, up to six garments total. One package or one stain-treatment garment per demo visit.
- Regular laundry: Wash & Fold AED 49 up to 5 kg; Clean & Press from AED 15 per garment; Press Only from AED 8 per garment; Bed & Bath AED 69 up to 10 items. Scheduled collection, centralised processing and delivery; enquiry-only until collection slots/turnaround are defined.
- Add AED 5 demonstration service fee per booking. No other tax or surcharge is modelled.
- Arrival target: 30 minutes after immediate confirmation or selected scheduled start in fictional pilot zones.
- Pressing/refresh target completion: 60 minutes from start, with suitability/workload limits.
- Only immediate refresh/formalwear orders of up to three garments qualify for the proposed late-completion AED 5 service-fee waiver. Care charges remain. Full draft conditions are on Policies.
- Rapid Wash is a future, unvalidated concept and cannot be booked.

These are classroom prices and proposed commitments, not verified market rates or operating performance.

## Boundaries

No real payments, card collection, Apple Pay authorisation, GPS, dispatch, authentication, AI model, blockchain or server order database. Technician identities, capabilities, slots and earnings are demonstrations. Earnings use an illustrative 60% of garment-care subtotal. Local status events are editable records, not independently verified evidence. Contact forms save to a local demo inbox and never deliver a message. Phone contacts were provided for the project and are not represented as operational service lines. Editorial images are generated concepts. Testimonials are explicitly fictional scenarios.

## Source and assessment documents

- `src/domain.js`: service data, typed model descriptions, prices, validation, order lifecycle and feedback.
- `src/storage.js`: versioned persistence and revision conflict handling.
- `src/BookingFlow.jsx`: six-step booking and reusable form/price components.
- `src/OrderPages.jsx`: tracking, customer dashboard and technician workspace.
- `src/ContentPages.jsx`: customer-facing content, calculator, fixed fabric guide and support.
- `src/App.jsx`: navigation, state and save boundaries.
- `assessment/`: six concise company/SDLC/presentation documents, mirrored under `public/assessment/` for download.
- `src/data/designSpec.js`: screen layouts, rules and documentation source.
- `docs/design-specification.md`: expanded design notes; generated download at `public/design-specification.md`.
- `VERIFICATION.md`: executed checks and remaining verification limits.

No original assessment brief was found locally. Confirm the final rubric, 3,000-word interpretation and whether route-selected screens meet any separate-page requirement. Do not present proposed research or usability scenarios as executed studies.

## GitHub Pages

Repository: https://github.com/eshanas497-beep/pressly

The existing workflow checks and builds on pushes to `main`, then deploys `dist/` through GitHub Pages. Settings → Pages must use GitHub Actions as its source. `base: './'` supports the `/pressly/` project path. A successful local build does not confirm deployment: inspect the Actions result and actual published site after pushing.

Local review profiles, dependencies, build output, development instructions, hosting metadata and secrets are excluded from source control. No repository history is rewritten.

Current services follow the two user-supplied WhatsApp references dated 2026-11-10. Regular-service photos use the supplied reference image; generated editorial imagery remains used for express care. Legacy service definitions are retained only to read saved orders; their original price snapshots are preserved and rebooking uses current packages.
