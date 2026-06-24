# Cart Add Confirmation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Require a customer confirmation, including quantity, before any menu item is committed to the cart.

**Architecture:** Store a pending cart record in `src/App.jsx` after a direct product tap or after required options are validated. Render a mobile bottom sheet from that pending record; its confirm action calls the existing cart merge function with the selected quantity.

**Tech Stack:** Vite, React, inline CSS.

## Global Constraints

- Keep all products, prices, Chinese interface, cart, pickup selection, WhatsApp number `601110788823`, and default `App` export.
- Use React state; do not use “小计” or collect customer names.
- Required flavour/style validation must happen before the confirmation sheet opens.

---

### Task 1: Stage item additions

**Files:**
- Modify: `src/App.jsx`

- [ ] Add pending-item, pending-quantity, and option-warning state.
- [ ] Route fixed cards, series cards, and validated option choices through a `prepareItem` function instead of adding immediately.
- [ ] Extend cart insertion to apply the confirmed quantity when merging identical items.

### Task 2: Add validation and confirmation UI

**Files:**
- Modify: `src/App.jsx`

- [ ] Show “请选择口味” or “请选择麻薯方式” in the option sheet when applicable.
- [ ] Add the safe-area-aware confirmation bottom sheet with item details, options, quantity controls, price, 取消, and 确认加入.

### Task 3: Verify build

**Files:**
- Modify: `src/App.jsx` (only if build verification requires it)

- [ ] Run `npm.cmd run build` and resolve all build errors.
