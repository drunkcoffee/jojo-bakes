# Jojo Bakes Ordering Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the existing wa.me checkout while producing a complete, readable WhatsApp order message and editable menu options.

**Architecture:** Keep the existing React state flow in `src/App.jsx`. Store drink settings and permitted add-ons alongside each menu item, and make checkout validation explicit when a pickup slot is unavailable or unselected.

**Tech Stack:** Vite, React, Tailwind-compatible inline CSS.

## Global Constraints

- Preserve WhatsApp ordering, pickup-slot logic, menu prices, menu items, and product photos.
- Customer-facing copy is Chinese only.
- Pickup slots remain selectable and use the configured 18:45–22:30, 10-minute interval, 15-minute buffer.
- Drinks that already include pearl do not offer it again; other drinks declare any available add-on in menu data.
- Run `npm run build` after changes.

---

### Task 1: Improve options and checkout copy

**Files:**
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: existing `customising`, `cart`, and `pickupTime` React state.
- Produces: drink options containing only sweetness and ice, and a Chinese WhatsApp checkout label.

- [ ] **Step 1: Declare drink sweetness, ice, and permitted pearl add-ons in menu data.**

```jsx
addOns: id === 'thai-milk-tea' || id === 'pearl-cocoa' ? [] : [{ id: 'pearl', label: '加珍珠', price: 1 }]
```

- [ ] **Step 2: Require an available, selected pickup slot before checkout and include customer-name, order-time, pickup-time, payment, item, option, quantity, subtotal, total, and remark fields in the WhatsApp message.**

```jsx
if (!pickupSlots.length || !pickupTime) {
  setPickupWarning(true);
  setCartOpen(true);
  return;
}
```

- [ ] **Step 3: Use 10-minute pickup intervals and show the disabled end-of-day checkout state.**

- [ ] **Step 4: Run the production build.**

Run: `npm run build`

Expected: Vite build completes successfully.
