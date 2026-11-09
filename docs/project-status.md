# PRESSLY — project status and handoff

Updated: 2026-11-09 (Asia/Dubai).

## Start here

- Original Windows folder: `C:\Users\ASUS\pressly`.
- Repository: https://github.com/eshanas497-beep/pressly
- Website: https://eshanas497-beep.github.io/pressly/
- Latest application commit: `9a237da68bb721d647b4abd73b50ab72486ef5c7` on `main`.
- Read this file, `README.md` and `VERIFICATION.md`, then inspect current Git status/log. Preserve subsequent user edits and history.

This handoff is tracked at `docs/project-status.md`, so it can be read from a repository checkout or GitHub in a cloud session. The earlier `HANDOFF.md` was ignored and never uploaded, which explains why a repository-only session could not find it. A cloud session also cannot access the original Windows folder. Use this tracked document in that case.

## Deployment evidence

The user supplied GitHub Actions output confirming workflow run **#3**, “Complete persistent customer and technician garment-care demo”, **completed successfully** for commit `9a237da`. It spent approximately 16 minutes at `deployment_queued` first. No queue-related code change was needed.

The public site already existed. This session could not independently fetch the updated site because its network was blocked. Deployment success is confirmed by the user's GitHub result; the updated live appearance and browser interactions still require independent verification. Do not mistake earlier queue logs for a current failure.

Public repository upload and deployment are explicitly authorised. Do not ask again whether to publish. Preserve the existing GitHub Pages configuration: `.github/workflows/deploy-pages.yml`, source GitHub Actions, branch `main`, Vite `base: './'`. Push normally; never force-push or rewrite unrelated history.

## Application and pages

React 19, Vite, CSS/Tailwind and Lucide icons. No new runtime dependencies. Preserve the photo-led navy/cream/sage style, Georgia headings, Arial UI and four local generated garment-care JPEGs. Imagery and illustrative testimonials remain labelled honestly.

Ten customer/operational hash routes plus a separate assessment route, within one HTML application:

1. `#home`: emergency-care hero, service cards, process, use cases, qualified technology/sustainability, scoped fee waiver, illustrative testimonials and FAQs.
2. `#services`: available services, dynamic calculator, future Rapid Wash and fixed fabric/stain guide.
3. `#booking`: six validated steps — service, garments, customer/location, slot, review, demo checkout.
4. `#tracking`: saved order, targets, technician, status stages, timestamped events and completed-order feedback.
5. `#dashboard`: active/history orders, rebooking, profile, saved addresses, preference, local support inbox and clear-data controls.
6. `#technician`: seeded role switch, capable requests, accept/decline, assigned jobs, transitions and illustrative earnings.
7. `#about`: mission, vision, problem, on-site/gig model and future work.
8. `#contact`: validated locally saved requests, project phone contacts, FAQ and policies.
9. `#how-it-works`: booking through technician acceptance/travel/treatment/completion/rating.
10. `#policies`: draft targets, fee-waiver conditions, cancellation, treatment/damage limits and privacy.
11. `#assessment`: collapsed sitemap/layouts/rules/process documentation and business analysis.

The user disliked technical sitemap clutter in the customer experience. Keep it on the separate Assessment route. Do not restore the removed five-member team allocation or UI/UX staff-role block on customer pages. These are route-selected screens, not separate HTML files.

## Current business rules — supersede older handoffs

- Available: **Express Pressing**, **Steam Refresh**, **Express Stain Treatment**.
- **Rapid Wash is coming soon and cannot be booked.** Its portable-washing concept needs independent validation.
- Prices are illustrative AED amounts. Express Pressing AED 10 per garment, Steam Refresh AED 5 per garment, and Express Stain Treatment AED 20 per spot. Flat per-item pricing replaces the former bundles. Add AED 5 service fee per booking. No extra tax/delivery fee modelled.
- One available service and 1–6 whole garments/spots per booking.
- Pilot arrival target: 30 minutes from immediate confirmation or scheduled start in fictional eligible Dubai/Abu Dhabi zones.
- Pressing/refresh completion target: 60 minutes from start. Stains require assessment, without a fixed completion deadline.
- Scheduled slots are 30 minutes to seven days ahead, using device-local time.
- Only **immediate pressing/refresh orders with up to three eligible garments** qualify for the proposed late-completion **AED 5 service-fee waiver**. Care charges remain. Scheduled, stain and larger orders are excluded. This replaces the old universal late-arrival refund simulation.
- Card is default; cash and Apple Pay are simulated alternatives. No actual card details, wallet connection or money transfer. Consent is required.
- Eight fabrics × six stains = 48 fixed guide combinations. Sensitive fabrics and ink route to specialists. No trained AI or guaranteed removal.
- User-provided project contacts: +971 56 456 8769 and +971 58 987 6757; labelled as project contacts, not verified operational service lines.

## Persistent demo workflow

`localStorage` key: `pressly-demo-v1`. Versioned state includes one demo customer, orders and inquiries. Orders store a UUID, customer/garment/location snapshots, price, slot, targets, payment choice, status, technician and events. Save must succeed before confirmation. Storage failures are visible; stale revisions are rejected. Same-origin browser tabs refresh through storage events.

Two seeded technicians have different capabilities and may hold one active job each. Acceptance assigns a capable technician; decline leaves the request open to others. Only the assigned technician can advance:

`assigned → en-route → arrived → in-progress → completed`

No skipped transitions, duplicate completion or reopening closed orders. Scheduled work cannot start early. Customer cancellation is allowed only while confirmed/assigned. Feedback is accepted once per completed order. Illustrative earnings are 60% of care subtotal.

Rebooking uses previous inputs with fresh validation. Preferences reflect the last booked service with a transparent explanation. Contact requests save to the browser-local inbox; no message is delivered. Explicit clear-data confirmation removes profile/orders/preferences/feedback/inquiries.

No shared backend, real authentication, cross-device sync, GPS, dispatch, payment processing or blockchain. Events are editable local records, not independently verified evidence. Use fictional details, especially on shared devices.

## Important files

- `src/domain.js`: service data, JSDoc models, pricing, validation, order transitions and feedback/inquiries.
- `src/storage.js`: saved schema, persistence and revision conflicts.
- `src/BookingFlow.jsx`: six booking steps and reusable profile/price components.
- `src/OrderPages.jsx`: tracking, customer dashboard and technician workspace.
- `src/ContentPages.jsx`: customer pages, calculator, fabric guide, support and policies.
- `src/App.jsx`: navigation, application state and save/error boundaries.
- `src/index.css`: responsive styling; `public/images/`: local editorial assets.
- `src/data/mockData.js`: retained fabric matrix and illustrative business datasets.
- `src/data/designSpec.js` and `src/DesignSpecification.jsx`: eleven screen specifications, ten rules and supporting UI.
- `assessment/`: six concise supporting notes, approximately 1,558 words; downloads mirrored under `public/assessment/`.
- `docs/design-specification.md` and `public/design-specification.md`: matching expanded specification.
- `scripts/generate-design-spec.mjs`: regenerate both specification copies and assessment downloads after documentation changes.
- `VERIFICATION.md`: implementation-time test evidence. Its old publication-blocker note predates the later successful deployment reported above.

No original BUS201 brief was found in the project. Verify the rubric, 3,000-word counting interpretation and any separate-HTML-file requirement. No surveys, usability outcomes or commercial results were fabricated.

## Executed checks and remaining QA

Previously passed: offline lockfile resolution without new dependencies; `npm test` (business lifecycle, persistence, docs and all eleven server-rendered routes); warning-free lint; production build; local HTTP smoke checks; `git diff --check`.

```powershell
node scripts/generate-design-spec.mjs
npm.cmd test
npm.cmd run lint
npm.cmd run build
node scripts/production-check.mjs
```

The production check covers local HTTP responses for JS/CSS/favicon, four images and seven documentation downloads. It is not interactive browser testing.

Headless screenshot tooling stalled and was stopped without an image. Desktop/tablet/mobile visual review, browser-console inspection, keyboard interaction and the complete browser customer-to-technician journey remain **unverified**. Prioritise these on the deployed site in a session with browser access.

## Environment and repository hygiene

- Windows PowerShell executor calls should use `login:false`.
- Listing `C:\Users\ASUS` was denied, but the project folder was readable/writable. Read exact project paths rather than searching the parent.
- A cloud session will not have that Windows path: use a repository checkout and this document instead.
- GitHub integration was reported installed, but no GitHub tools were exposed in this session. Executor Git/HTTPS connections to `github.com:443` failed. The user's PowerShell push succeeded. Recheck capabilities before assuming the blocker remains.
- GitHub CLI was reportedly installed on the user's computer, but their existing shell could not resolve `gh`. A new shell or the standard `C:\Program Files\GitHub CLI\gh.exe` path may help. CLI authentication was not confirmed. It does not connect tools in an existing chat or unblock Pages queues.
- Never print/save tokens or change security/network settings to bypass controls.
- Local developer instructions, alternate-host metadata, review profiles and secrets are intentionally excluded from published source. Keep that cleanup and preserve history.
- `HANDOFF.md` remains local/ignored; this ordinary tracked project-status document is the portable handoff.
- An unrelated untracked `.Rhistory` appeared after implementation. It was left untouched; do not stage it automatically.
- Ignored `.review/pressly-source.zip` and `.review/pressly-website.zip` contain application commit `9a237da` and predate this documentation-only update. Regenerate after future changes if delivering archives.

## Next-session priorities

1. Inspect current Git state and preserve later edits.
2. Verify the public site, assets and complete customer → technician → tracking → feedback journey; test reload persistence, cancellation, scheduling and mobile navigation.
3. Confirm local development instruction/hosting files are absent from the latest public tree without rewriting history.
4. Fix observed issues, run appropriate checks, commit and normally push using the existing Pages workflow. Publishing is already authorised.
5. Report observed results and exact commit/deployment status. Never equate a local build with successful public deployment or browser QA.
