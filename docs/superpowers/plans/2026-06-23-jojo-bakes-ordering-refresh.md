# Jojo Bakes Ordering Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the existing Chinese Jojo Bakes ordering menu into a premium, mobile-first dessert storefront without changing its catalogue or ordering logic.

**Architecture:** Keep the single React `App.jsx` entry point and its in-memory cart/customisation state. Replace corrupted Chinese copy, assign the supplied close-up waffle photography per product, and use a small, self-contained visual system embedded in the component.

**Tech Stack:** Vite, React, CSS.

## Global Constraints

- Preserve all existing menu items, prices, options, drinks, product photographs, and WhatsApp checkout number `601127060012`.
- Chinese interface only; keep `App.jsx` as a default export and leave `main.jsx` unchanged.
- Classic waffle requires exactly two flavours; mochi waffle requires one or two; pearl costs RM1 and selections appear in the cart and WhatsApp message.
- Build with `npm run build` after implementation.

---

### Task 1: Preserve and organise product imagery

**Files:**
- Create: `public/assets/products/*`

- [ ] Copy the uploaded close-up waffle assets from the old build output into Vite's public assets directory, retaining their original filenames.
- [ ] Use the supplied poster/menu image only for the guide content, not standard product cards.

### Task 2: Rebuild the existing App component's presentation

**Files:**
- Modify: `src/App.jsx`

- [ ] Keep the catalogue IDs, prices, flavour constraints, cart grouping, quantity controls and WhatsApp checkout behaviour.
- [ ] Correct all Chinese UI text and implement the requested hero, recommendations, waffle menu, mochi explanation, drink menu and sticky cart flow.
- [ ] Map each waffle card to a relevant close-up photo and retain image error fallbacks.
- [ ] Add mobile-first warm cream, waffle brown and chocolate styles with clear price/add controls and accessible option dialog controls.

### Task 3: Verify the production build

**Files:**
- Modify only if verification identifies a defect.

- [ ] Run `npm run build`.
- [ ] Confirm Vite outputs the compiled app and copies product assets without errors.

## Self-Review

- Product inventory and ordering constraints are retained in Task 2.
- The requested section order and Chinese-only content are implemented in Task 2.
- Image preservation and production availability are covered in Task 1 and Task 3.
