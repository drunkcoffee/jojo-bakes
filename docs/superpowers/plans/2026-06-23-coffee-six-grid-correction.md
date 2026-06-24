# Coffee Six-Grid Menu Correction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace incorrectly named peanut-chocolate waffles with the four correct fixed-price coffee 六连击 products.

**Architecture:** Update the affected special-product records in `src/App.jsx` and add the missing chocolate-coffee crunchy-ball record. All records remain fixed products, so they use the existing confirmation quantity flow without option data.

**Tech Stack:** Vite, React, inline CSS.

## Global Constraints

- Keep the current page layout, customer-facing Chinese UI, confirmation flow, pickup selection, WhatsApp number `601110788823`, and default `App` export.
- Do not use “小计” and do not modify series or drink logic.

---

### Task 1: Correct coffee product records

**Files:**
- Modify: `src/App.jsx`

- [ ] Remove the two incorrect peanut-chocolate names.
- [ ] Define 花生咖啡六连击 and 巧克力咖啡六连击 at RM6, plus their 脆脆珠 variants at RM8.

### Task 2: Verify production build

**Files:**
- Modify: `src/App.jsx` (only if build verification requires it)

- [ ] Run `npm.cmd run build` and resolve Vite errors.
