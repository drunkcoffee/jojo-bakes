# Jojo Bakes Series Menu Structure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Nutella and 开心果 Kunafa separately understandable orderable series without redesigning the existing page.

**Architecture:** Update the existing data-driven `src/App.jsx` menu with a distinct Kunafa category and direct-selection series cards. Pass each card’s selected option and final price into the existing cart function so cart and WhatsApp rendering remain consistent.

**Tech Stack:** Vite, React, inline CSS.

## Global Constraints

- Keep customer UI in Chinese and preserve the default `App` export.
- Keep drinks, existing menu content, the WhatsApp number `601110788823`, and React-state UI logic.
- Do not use “小计”; orders must include the selected option and final RM price.

---

### Task 1: Separate series data and navigation

**Files:**
- Modify: `src/App.jsx`

- [ ] Move the Kunafa product out of the special category, create its dedicated category tab and section, and set its two requested RM14/RM13 options.
- [ ] Restrict Nutella options to base Nutella plus the seven specified classic pairings at RM8/RM9.

### Task 2: Add direct-selection series cards

**Files:**
- Modify: `src/App.jsx`

- [ ] Add a stateful `SeriesCard` component with visible option buttons, live price, and an add-to-cart action.
- [ ] Use it for the Nutella and Kunafa sections, passing option labels through to the existing cart record.

### Task 3: Verify checkout data

**Files:**
- Modify: `src/App.jsx` (only if required by the build)

- [ ] Run `npm.cmd run build` and confirm the Vite production build succeeds.
