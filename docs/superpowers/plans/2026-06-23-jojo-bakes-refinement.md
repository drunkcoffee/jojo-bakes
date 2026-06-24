# Jojo Bakes Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the existing Jojo Bakes ordering page without losing its menu, WhatsApp flow, or product imagery.

**Architecture:** Keep the single-page React implementation in `src/App.jsx`, with menu configuration driving category sections, option sheets, cart rows, and the WhatsApp order message. Keep styling local to the component so the existing Vite entry point remains unchanged.

**Tech Stack:** Vite, React, inline CSS.

## Global Constraints

- Keep `src/App.jsx` as the main page and retain its default export.
- Customer-facing copy is Chinese; use React state only.
- Preserve product content, photos, WhatsApp ordering, and mobile-first behavior.
- Checkout number is `601110788823`; pickup slots run from `18:45` to `22:30` in five-minute intervals with a 15-minute buffer.
- Run `npm run build` before handoff.

---

### Task 1: Rework menu configuration and pricing

**Files:**
- Modify: `src/App.jsx`

- [ ] Define category-specific products and option tiers for classic, special, Oreo, Nutella, mochi, and drinks.
- [ ] Retain existing signature menu items as fixed products, map their supplied images, and use fallbacks for drinks without photos.
- [ ] Calculate each configurable product price from its selected option tier.

### Task 2: Improve the mobile ordering interface

**Files:**
- Modify: `src/App.jsx`

- [ ] Add the hero, sticky category navigation, short recommendations, distinct category sections, and compact photo cards.
- [ ] Add accessible option and cart sheets with large quantity controls and safe-area-aware fixed checkout UI.
- [ ] Use lazy image loading and per-image React fallback state.

### Task 3: Complete checkout controls

**Files:**
- Modify: `src/App.jsx`

- [ ] Generate today-only valid pickup slots from the editable configuration and prevent checkout without a selected slot.
- [ ] Generate a clean Chinese WhatsApp message with item options, quantity, total, pickup time, and payment wording.
- [ ] Remove name and pearl-add-on flows.

### Task 4: Verify delivery

**Files:**
- Modify: `src/App.jsx` (if verification reveals a fix)

- [ ] Run `npm run build`.
- [ ] Address build errors and inspect the resulting bundle output.
