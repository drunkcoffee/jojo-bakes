# Special Menu Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the duplicate chicken-floss and standalone Lotus special-waffle cards without changing menu behavior elsewhere.

**Architecture:** Delete only the two corresponding special-product records from the `products` data array in `src/App.jsx`. The special grid, classic +RM1 add-on flow, cart formatting, and all other category records remain unchanged.

**Tech Stack:** Vite, React, inline CSS.

## Global Constraints

- Keep Mayo 鸡肉松, 抹茶 Lotus Crumbs, all series, drinks, cart, pickup selection, and default `App` export.
- Keep customer UI Chinese, final-RM calculations, and no “小计”.

---

### Task 1: Remove duplicate special records

**Files:**
- Modify: `src/App.jsx`

- [ ] Remove the `lotus-waffle` and `chicken-floss` records from the special waffle data.
- [ ] Preserve shared special add-on options and all remaining product records.

### Task 2: Verify production output

**Files:**
- Modify: `src/App.jsx` (only if build verification requires it)

- [ ] Run `npm.cmd run build` and resolve Vite errors.
