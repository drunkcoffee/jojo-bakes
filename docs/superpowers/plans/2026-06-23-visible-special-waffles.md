# Visible Special Waffles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn all requested special waffles into visible, one-tap product cards while preserving series separation and the existing checkout experience.

**Architecture:** Replace the generic special-waffle selector in `src/App.jsx` with fixed special-product data records. Each record uses the existing `ProductCard` and `addItem` path, so items add directly with their fixed RM8 price and no unrelated flavour picker.

**Tech Stack:** Vite, React, inline CSS.

## Global Constraints

- Keep the Chinese customer interface, React state ordering flow, drinks, cart, pickup-time selection, WhatsApp number `601110788823`, and default `App` export.
- Keep Oreo, Nutella, Kunafa, and mochi as their own sections; do not use “小计”.
- Use supplied images only when they match the product; missing matching artwork uses the component fallback.

---

### Task 1: Replace hidden special selection with card data

**Files:**
- Modify: `src/App.jsx`

- [ ] Remove the generic special-waffle product that opens an option selector.
- [ ] Add the ten requested fixed special waffles at RM8, retain the existing coffee-peanut product, and map supplied matching images.

### Task 2: Preserve clean series behavior

**Files:**
- Modify: `src/App.jsx`

- [ ] Remove the no-longer-used special selector branch while retaining special flavours for Oreo and mochi tier selection.
- [ ] Keep Oreo’s selected-flavour-only cart data and separate Nutella/Kunafa series cards unchanged.

### Task 3: Verify production build

**Files:**
- Modify: `src/App.jsx` (only if required by build verification)

- [ ] Run `npm.cmd run build` and resolve any Vite errors.
