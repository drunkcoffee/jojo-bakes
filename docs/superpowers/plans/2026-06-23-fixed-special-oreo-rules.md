# Fixed Special and Oreo Rules Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make special waffles fixed-price products, add the two peanut-chocolate waffles, and correct Oreo Cookies & Cream pricing.

**Architecture:** Remove special-add-on behavior from special product records so they use the existing fixed-item confirmation path. Add the requested peanut-chocolate records and define Oreo flavour data that classifies Cookies & Cream as RM7 while retaining the existing one-flavour selection and cart message shape.

**Tech Stack:** Vite, React, inline CSS.

## Global Constraints

- Keep the page layout, drinks, Nutella, Kunafa, mochi, confirmation-before-cart, pickup selection, WhatsApp number `601110788823`, and default `App` export.
- Customer interface stays Chinese; orders do not use “小计”.
- Do not alter non-mochi special, Nutella, Kunafa, or mochi rules except the explicit special-card prices in this task.

---

### Task 1: Fix special product rules

**Files:**
- Modify: `src/App.jsx`

- [ ] Remove special-waffle add-on mode and its option-sheet branch so special cards go straight to confirmation.
- [ ] Set 鸡肉松芋泥 to RM10 and add RM6 花生巧克力华夫饼 plus RM8 花生巧克力脆脆珠华夫饼.

### Task 2: Correct Oreo flavour classification

**Files:**
- Modify: `src/App.jsx`

- [ ] Define one-flavour Oreo choices where Cookies & Cream is an RM7 choice.
- [ ] Store the selected Oreo option as `口味` and retain RM10 for other special Oreo flavours.

### Task 3: Verify build

**Files:**
- Modify: `src/App.jsx` (only if build verification requires it)

- [ ] Run `npm.cmd run build` and resolve all Vite errors.
