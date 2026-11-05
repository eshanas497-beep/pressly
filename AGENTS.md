# PRESSLY – Project Developer & Agent Guidelines

## 1. Project Overview
PRESSLY is a Web 3.0 on-demand mobile garment-care application built for BUS201 Assessment 2.
It demonstrates the 5 SDLC modules: Planning, Analysis, Design, Development, and Presentation.

## 2. Tech Stack & Architecture
- **Framework**: React 19 + Vite + Tailwind CSS v4 + Lucide Icons.
- **Design System**: Apple HIG clean aesthetic with deep navy background (`#020617` / `#0A192F`) and emerald mint accents (`#10B981` / `#00E599`).
- **Core Modules**:
  1. `Home`: Hero, 30-min SLA guarantee banner, 4-step workflow, sustainability metrics.
  2. `Services`: Express Refresh, Stain Rescue, Rapid Wash & Fold (Phase 2).
  3. `Transaction / Booking`: Interactive Web 3.0 escrow simulator, countdown timer, technician dispatch.
  4. `About`: 5-person team roles, Feasibility study (5 dimensions), Porter's Five Forces, BMC.
  5. `Contact`: Board evaluation inquiry form.

## 3. Ponytail Philosophy (Anti-Bloat Senior Dev Rules)
- Follow the 7-rung Ladder of Laziness:
  1. Does this need to exist? If no, skip it.
  2. Is it already in this codebase? Reuse existing components and utilities.
  3. Use native browser features and standard HTML elements whenever possible.
  4. Do not install heavy state machines or complex libraries when simple React state (`useState`, `useEffect`) satisfies the requirement.
  5. Always keep the booking flow frictionless and accessible.

## 4. Run & Test Commands
- Development server: `npm.cmd run dev`
- Production build: `npm.cmd run build`
- Preview build: `npm.cmd run preview`
