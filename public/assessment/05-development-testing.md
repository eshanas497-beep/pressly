# Development and testing

## Implementation

React 19, Vite, Tailwind import, CSS and Lucide icons. No new runtime dependency. Pure `domain.js` operations implement validation, prices, assignment, transitions, feedback and inquiries. `storage.js` saves versioned browser-local data and checks revisions so stale tabs cannot silently overwrite newer state. Same-origin storage events refresh other open tabs.

Six booking steps lead to a uniquely identified saved order. Technicians explicitly accept or decline capability-matched jobs and sequentially progress them. Tracking derives its stages and timestamps from those operations. My account uses actual local history for rebooking and transparent preference suggestions.

Payment authorisation, cash recording, technician work, slots and earnings are simulations. The local event log is not blockchain. No backend, real accounts, GPS or cross-device sync exists.

## Automated test cases

Run `npm test`, `npm run lint` and `npm run build`. Tests cover bundles and fees, invalid quantities/services/garments, profile/location/consent/scheduling validation, UUID duplication, technician capability/assignment, declines, busy capacity, skipped transitions, duplicate completion, cancellation, fee-waiver eligibility, feedback, inquiry validation, persistence round trips, corruption/quota errors and stale revisions. Render tests exercise every route, skip target, primary heading and local assets. Record actual results in `VERIFICATION.md`; listing a case here is not evidence it passed.

## Usability and acceptance plan — not executed results

At desktop, tablet and phone sizes, ask participants to book pressing for a fictional meeting, inspect total and policy, accept the job in Technician demo, advance all stages, reload, inspect tracking and leave feedback. Separately test stain referral, invalid fields, cancellation, scheduled slots and local support receipts. Check keyboard-only use, focus, menu Escape, screen-reader names, visible errors and image loading. Record participant consent and observations; do not invent completion rates or quotes.

## Limits

Use fictional data, especially on shared machines. Local records are user-editable and not independently verified. Browser storage may be unavailable; failures must remain visible. Commercial launch needs authenticated shared services, secure server validation, professional fabric protocols, vetted operations, legal policies, monitoring and measured capacity. Original rubric and any requirement for separate HTML files need verification.
