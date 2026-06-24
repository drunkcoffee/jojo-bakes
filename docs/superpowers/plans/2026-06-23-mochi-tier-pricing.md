# Mochi Tier Pricing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give 拉丝麻薯 its own classic, special, and premium tier prices of RM8, RM10, and RM12.

**Architecture:** Define mochi-tier option data in `src/App.jsx`, use it only inside the existing mochi selection sheet, and derive the pending/cart unit price from the selected tier. The existing option records keep style and flavour available to both cart and WhatsApp output.

**Tech Stack:** Vite, React, inline CSS.

## Global Constraints

- Keep the page structure, non-mochi special waffle RM8 pricing, Oreo/Nutella/Kunafa pricing, cart, pickup-time selection, WhatsApp number `601110788823`, and default `App` export.
- Customer interface remains Chinese and orders must not use “小计”.

---

### Task 1: Define mochi-only tiers

**Files:**
- Modify: `src/App.jsx`

- [ ] Add classic, special, and premium mochi tier data with their exact RM8/RM10/RM12 prices and requested flavours.
- [ ] Update the mochi product’s display price to start at RM8.

### Task 2: Apply selected tier price

**Files:**
- Modify: `src/App.jsx`

- [ ] Update the mochi option-sheet tier buttons and flavour list to use the new data.
- [ ] Set the pending item price from the selected tier while retaining `方式` and `口味` cart fields.

### Task 3: Verify output

**Files:**
- Modify: `src/App.jsx` (only if build verification requires it)

- [ ] Run `npm.cmd run build` and resolve Vite errors.
