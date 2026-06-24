# AGENTS.md

## Project overview

This repository contains a production Vite, React, and Tailwind website.

## Change guidelines

- Preserve working features.
- Do not remove existing content unless explicitly requested.
- Always inspect existing components before editing them.
- Keep the UI mobile-first, simple, and easy for customers to order from.
- Always run `npm run build` after changes.

## Brand-specific safeguards

### Drunk Coffee Roasters

- Protect Contentful product fields and fallback data.

### Jojo Bakes

- Preserve the WhatsApp ordering flow, pickup-slot logic, menu prices, and product photos.

## Jojo Bakes project rules

### Stack

- Vite + React.
- Main page: `src/App.jsx`.
- Do not modify `src/main.jsx` unless required.
- `src/App.jsx` must always have a default export.

### Language

- Customer-facing UI must be Chinese only.
- Copy must sound natural, simple, and local.
- Avoid AI-style marketing words.

### Business context

- Jojo Bakes is a night market waffle and drink ordering page.
- The goal is fast mobile ordering through WhatsApp.

### WhatsApp

- Checkout number: `601110788823`.

### Pickup time

- Customers should choose a pickup time from selectable slots; do not make them type one manually.
- Default pickup configuration: start 18:45, end 22:30, 5-minute intervals, 15-minute buffer.

### Menu rules

- Classic Waffle: RM5.
- Normal Special Waffle: RM8.
- Oreo Series: Classic flavour RM7; Special flavour RM10.
- Nutella Series: Base RM8; Classic flavour +RM1; Special flavour +RM2.
- Mochi pricing is separate.
- Drinks have no pearl add-on.

### Order message rules

- Do not use “小计”.
- Use “RM…” only.
- Do not ask for the customer name.
- Include the selected pickup time.
- Include total quantity and total price.

### UI rules

- Mobile-first.
- Use warm cream, waffle brown, and chocolate tones.
- Use big product images, clear prices, an easy cart, and easy WhatsApp checkout.
- Keep category tabs sticky on mobile.
- Provide a floating cart or bottom checkout bar.
- Missing images must show a fallback.

### Technical rules

- Use React state.
- Do not use direct DOM manipulation for UI logic.
- Do not remove menu items unless requested.
- Run `npm run build` before finishing.

## Handoff requirements

When completing work, report the changed files, build result, and any deployment notes.
