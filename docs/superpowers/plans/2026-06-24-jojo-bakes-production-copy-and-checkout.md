# Jojo Bakes Production Copy and Checkout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the existing Jojo Bakes production app hero copy and WhatsApp checkout message without replacing its live ordering experience.

**Architecture:** Retain the existing `src/App.jsx` data, cart, product options, pickup-date logic, and `wa.me` launch. Make focused changes to the hero markup/styles and to `buildOrderMessage`, using the supplied App.jsx only as a source for the required message fields.

**Tech Stack:** React 19, Vite 8, CSS.

## Global Constraints

- Work inside the existing `drunkcoffee/jojo-bakes` repository and production branch `main`.
- Do not create a Cloudflare Pages project or site.
- Keep WhatsApp number `601110788823`, existing cart, menu, pickup slots, product options, image layout, and mobile layout.
- Run `npm run build`; commit and push only after it passes.

---

### Task 1: Safely merge hero and checkout updates

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/App.css`

**Interfaces:**
- Consumes: Existing `buildOrderMessage({ lang, items, pickupDate, pickupTime, pickupDay, pickupLocation, paymentMethod })`.
- Produces: A WhatsApp message containing pickup time, order-created time, payment method, item options and quantities, subtotals, total quantity, total amount, and a remark line, with no customer-name placeholder.

- [ ] **Step 1: Add exact hero content**

Replace the hero copy presentation with a semantic heading and supporting line: `Fresh waffle, made tonight.` and `想吃 waffle，就找 Jojo.`

- [ ] **Step 2: Extend the existing WhatsApp message builder**

Add a locally formatted order-created timestamp and total quantity while retaining existing pickup, payment, item, option, quantity, subtotal, and total data. Do not add a customer-name field.

- [ ] **Step 3: Preserve responsive hero layout**

Add only the CSS needed for `.hero-title`, retaining the existing centered hero, image wrapper, actions, and mobile media queries.

### Task 2: Verify and release

**Files:**
- Verify: `src/App.jsx`
- Verify: `src/App.css`

- [ ] **Step 1: Inspect the diff**

Run `git diff --check` and inspect `git diff -- src/App.jsx src/App.css`.

Expected: Only requested hero/message changes plus the implementation plan.

- [ ] **Step 2: Build production bundle**

Run `npm run build`.

Expected: Vite completes successfully and writes `dist`.

- [ ] **Step 3: Commit and push to main**

Stage the two source files and this plan, create commit `fix: update Jojo Bakes hero and checkout message`, then push `main` to `origin`.

Expected: The commit is accepted by `origin/main`, allowing the existing Cloudflare Pages project to deploy from its configured production branch.
