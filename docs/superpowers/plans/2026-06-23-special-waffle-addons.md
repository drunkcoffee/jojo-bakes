# Special Waffle Add-On Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let every visible special waffle optionally add one classic flavour for RM1 without affecting other series.

**Architecture:** Mark special waffle records in `src/App.jsx` with a dedicated option mode. Reuse the existing option and confirmation sheets, limiting the choice list to “不加” plus the classic flavours; prepare the cart record with an optional `加` line and either RM8 or RM9.

**Tech Stack:** Vite, React, inline CSS.

## Global Constraints

- Keep all visible special cards, Chinese interface, cart confirmation, pickup selection, WhatsApp number `601110788823`, and default `App` export.
- Do not change Oreo, Nutella, mochi, or Kunafa logic and do not use “小计”.
- Special waffle add-ons can include only one classic flavour and cost RM1.

---

### Task 1: Mark special waffle card behavior

**Files:**
- Modify: `src/App.jsx`

- [ ] Give each special card the dedicated special-add-on mode and retain its RM8 base price.
- [ ] Provide a shared optional add-on list containing only “不加” and the seven classic flavours.

### Task 2: Price and describe the selected add-on

**Files:**
- Modify: `src/App.jsx`

- [ ] Add the single-choice special-add-on picker to the existing option sheet.
- [ ] Pass `加：<flavour>` and RM9 to the confirmation/cart flow only when an add-on is chosen; use no extra option line and RM8 for “不加”.

### Task 3: Verify build

**Files:**
- Modify: `src/App.jsx` (only if build verification requires it)

- [ ] Run `npm.cmd run build` and resolve all Vite errors.
