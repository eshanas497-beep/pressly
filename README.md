# PRESSLY

A React + Vite garment-care assessment prototype with five screens: Home, Services, Booking, The project and Contact.

## Run locally

```sh
npm ci
npm run dev
```

## Checks and build

```sh
npm run lint
node src/booking.test.js
node scripts/generate-design-spec.mjs
npm run build
npm run preview
```

## Design documentation

The Project page contains the sitemap, five desktop/mobile block compositions, content and layout analysis, business rules, process diagrams and implementation notes. The matching specification is in [docs/design-specification.md](docs/design-specification.md), with a downloadable copy under public/.

## Prototype boundaries

Prices use AED. Refresh and stain bookings model 30-minute arrival; Rapid Wash models a four-hour return. Cash, credit/debit card and Apple Pay are demo selections. No payment gateway, blockchain, GPS dispatch, contact-form delivery or persistent order store is connected. Images are generated editorial concepts. User-provided UAE contact numbers appear on Contact.

## Source structure

- src/App.jsx: page navigation and booking/contact interactions
- src/DesignSpecification.jsx: visible design documentation
- src/data/designSpec.js: shared documentation source
- src/data/mockData.js: service, fabric and business datasets
- src/booking.js: pricing, timers and payment semantics
- src/index.css: responsive visual system
- public/images: local editorial image assets

## Hosting

The production output is dist/. The .openai/hosting.json file records the Sites hosting configuration. Local browser profiles, temporary review files, node_modules, build output and secrets are excluded from source control.

## GitHub Pages publication

Create a public repository named pressly and push the source on main. In Settings > Pages, choose GitHub Actions as the build source. The included .github/workflows/deploy-pages.yml checks, builds and deploys on each push to main. Relative asset paths support a project URL such as https://USERNAME.github.io/pressly/. The workflow is prepared but has not been run in GitHub.

## Direct static upload

Build with npm run build and upload the contents of dist/ to a static host, such as Cloudflare Pages Direct Upload. This publishes the frontend prototype; it does not add payment processing, dispatch or message delivery.
