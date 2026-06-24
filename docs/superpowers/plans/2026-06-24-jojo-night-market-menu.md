# Jojo Night-Market Menu Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the Jojo Bakes menu as a warm, mobile-first night-market ordering page without changing any ordering behavior.

**Architecture:** Keep all menu data, React state, helper functions, cart behavior, pickup-slot rules, and WhatsApp message construction intact in `src/App.jsx`. Update only customer-facing copy, JSX presentation wrappers/classes, and the existing co-located CSS string, using the current components and their event handlers.

**Tech Stack:** Vite, React, Tailwind-compatible CSS string, npm build.

## Global Constraints

- Modify only `src/App.jsx` for the storefront implementation.
- Do not alter product identity, category availability, price calculations, images, state names, function behavior, pickup slots, or WhatsApp checkout message logic.
- Customer-facing UI is Chinese only; preserve necessary product names such as Oreo and Nutella.
- Keep mobile first; sticky tabs must horizontally scroll, images must retain stable ratios, and the fixed cart must not conceal the final content.
- Do not add dependencies; run `npm run build` after changes.

---

### Task 1: Refresh customer-facing menu structure and copy

**Files:**
- Modify: `src/App.jsx:17-164`
- Test: visual browser check plus `npm run build`

**Interfaces:**
- Consumes: existing product/drink objects, `ProductCard`, `SeriesCard`, `onAdd`, category anchors, and React event handlers.
- Produces: the same component props, IDs, and click paths with warm Chinese display copy.

- [ ] **Step 1: Update display-only product and drink descriptions**

Change only requested descriptions, including fixed flavours to `不用选择，直接点就好。`, Apam Balik to `花生香、边边脆，经典不会错。`, taro to `芋泥比较温柔，不会太腻。`, and Mayo chicken floss to `咸甜口，越吃越顺。`; update the requested drink descriptions without modifying IDs or prices.

- [ ] **Step 2: Recompose hero, category, recommendation, drink, cart, and footer JSX**

Keep every existing callback and condition. Use the specified hero wording, service chips, the selected six tab labels, recommendation eyebrow/subtitle and badges, clearer pickup wording, empty-cart copy, checkout copy, and footer note. Add presentational wrappers/classes only.

- [ ] **Step 3: Make component microcopy consistent**

Use `加入` on product and series action buttons while retaining explicit aria labels. Change series status labels to `先帮你选` and `你选了`; retain the same select/expand/collapse state transitions. Replace option warnings only with the requested gentle Chinese wording.

- [ ] **Step 4: Verify behavior-preserving structure**

Review that `onAdd`, `checkout`, `confirmOptions`, `toggleChoice`, `updateQuantity`, all slot handlers, dialog attributes, and the default App export retain their existing call signatures and control flow.

### Task 2: Build the night-market visual system in the existing style string

**Files:**
- Modify: `src/App.jsx:166-end`
- Test: phone-width visual browser check plus `npm run build`

**Interfaces:**
- Consumes: existing classes and the display-only classes introduced in Task 1.
- Produces: responsive paper, caramel, cream, and chocolate styles without changing JavaScript behavior.

- [ ] **Step 1: Establish textured warm surfaces and controls**

Implement layered cream/radial-gradient background, warm `.shop::before` glow, paper-like cards, softened shadows, chocolate primary buttons with caramel active states, and sticker-like badges.

- [ ] **Step 2: Style mobile-first hero and navigation**

Keep hero copy unobscured by using a right-side image and safely layered content. Give service chips their own scroll-safe/wrapping row. Make sticky category links resemble kraft-paper menu tags, with the first item dark and the strip horizontally scrollable.

- [ ] **Step 3: Feature and product presentation**

Give recommendations a shallow caramel panel and stable three-item responsive grid. Increase regular mobile product image height slightly, keep normal cards in two columns, and keep drinks as compact horizontal pairing cards with a drink-specific image fallback.

- [ ] **Step 4: Stabilize series cards, sheets, and receipt cart**

Set a fixed series image height with `object-fit: cover`; use option chips with visible prices; present sheets as paper order tickets; make selected options chocolate/cream; and style the bottom cart as a readable night-market receipt with safe-area spacing.

- [ ] **Step 5: Verify responsive constraints**

At a narrow iPhone-sized viewport, check hero layering, recommendation cards, category scrolling, fixed series photos after options open, and enough bottom page padding above the cart dock.

### Task 3: Validate production output

**Files:**
- Test: `package.json` script `build`

**Interfaces:**
- Consumes: final `src/App.jsx`.
- Produces: Vite production bundle.

- [ ] **Step 1: Run `npm run build`**

Expected: Vite completes successfully without syntax, import, or CSS parsing errors.

- [ ] **Step 2: Inspect changed-file scope**

Run `git diff -- src/App.jsx` and verify business logic has not been changed beyond requested display copy/classes/styles.

