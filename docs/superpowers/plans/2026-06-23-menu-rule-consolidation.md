# Menu Rule Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate Jojo Bakes menu categories, fixed prices, configurable series, mochi tiers, drink options, cart output, and WhatsApp output under the supplied rules.

**Architecture:** Keep `src/App.jsx` as the single data-driven page. Define menu option data at the top of the component, route configurable products through the existing options/confirmation sheets, and store each selected label/value plus final unit price in the existing cart record so the cart and WhatsApp renderer remain one source of truth.

**Tech Stack:** Vite, React, inline CSS.

## Global Constraints

- Keep Chinese UI, mobile layout, sticky tabs, floating cart, pickup selection, confirmation-before-cart flow, WhatsApp number `601110788823`, and default `App` export.
- Do not use direct DOM UI logic, customer name collection, or “小计”.
- Use `RM…` pricing and retain supplied images and fallback behavior.

---

### Task 1: Reconcile menu data and sections

**Files:**
- Modify: `src/App.jsx`

- [ ] Remove the 推荐 card grid and make the menu start with 经典口味.
- [ ] Add the 抹茶酱搭配 card, updated Kunafa options, 饼干系列 sub-series, fixed special products, and requested coffee items.

### Task 2: Update option and pricing engines

**Files:**
- Modify: `src/App.jsx`

- [ ] Route matcha, cookie series, mochi tiers, and drinks through dedicated data-backed choices.
- [ ] Apply final prices from selected options and retain readable cart/WhatsApp option labels.

### Task 3: Verify delivery

**Files:**
- Modify: `src/App.jsx` (only if build verification requires it)

- [ ] Run `npm.cmd run build` and resolve all Vite errors.
