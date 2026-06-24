# Coffee Flavour Naming Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove “六连击” from the four coffee flavour names while retaining their fixed RM6/RM8 prices.

**Architecture:** Rename only the four coffee records in `src/App.jsx`; their product IDs, category, prices, and existing fixed-item confirmation flow stay unchanged.

**Tech Stack:** Vite, React, inline CSS.

## Global Constraints

- Keep Chinese customer UI, cart confirmation, pickup selection, WhatsApp number `601110788823`, and default `App` export.
- Do not use “小计” or alter other menu and series rules.

---

### Task 1: Rename coffee flavours

**Files:**
- Modify: `src/App.jsx`

- [ ] Rename the two RM6 and two RM8 coffee records to the requested flavour names using “脆脆珠”.

### Task 2: Verify production build

**Files:**
- Modify: `src/App.jsx` (only if build verification requires it)

- [ ] Run `npm.cmd run build` and resolve Vite errors.
