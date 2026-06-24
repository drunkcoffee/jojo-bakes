# Jojo Bakes Storefront Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, responsive Jojo Bakes storefront with Oreo and Nutella product series and a smooth client-side basket flow.

**Architecture:** Use a dependency-free static site so it can be opened immediately and extended without build tooling. Keep product metadata and client-side interaction in `app.js`, presentation in `styles.css`, and semantic structure in `index.html`; generated product photography lives under `assets/products/`.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, generated PNG product photography.

## Global Constraints

- Keep the experience mobile-first and keyboard accessible.
- Use no runtime package dependencies or fabricated customer claims.
- Display prices in Malaysian ringgit and label all product availability as preorder/next-day delivery where appropriate.
- Respect `prefers-reduced-motion` and maintain minimum 44px touch targets.

---

### Task 1: Build the visual foundation and storefront structure

**Files:**
- Create: `index.html`
- Create: `styles.css`

**Interfaces:**
- Consumes: Product image paths under `assets/products/`.
- Produces: semantic page landmarks and CSS class hooks used by `app.js`.

- [ ] **Step 1: Create the semantic page scaffold**

Create a header with primary navigation, a hero, `#menu` product section, `#series` collection feature, and footer. Include `#filterBar`, `#productGrid`, `#cartToggle`, `#cartCount`, `#cartPanel`, `#cartItems`, `#cartTotal`, and `#toast` elements with accessible labels.

- [ ] **Step 2: Add the responsive design system**

Define CSS variables for cocoa, cream, berry, Oreo slate and Nutella hazelnut tones. Implement a 1200px content container, an editorial heading stack, 44px controls, visible focus styles, responsive product grid, cart drawer, and a reduced-motion media query.

- [ ] **Step 3: Verify document and stylesheet structure**

Run: `Get-Content index.html | Select-String '<main|productGrid|cartPanel'; Get-Content styles.css | Select-String 'prefers-reduced-motion|:focus-visible'`

Expected: the page landmarks, cart hooks, reduced-motion rule, and focus rule are present.

### Task 2: Add series product photography and product data

**Files:**
- Create: `assets/products/oreo-series.png`
- Create: `assets/products/nutella-series.png`
- Create: `app.js`

**Interfaces:**
- Consumes: `#filterBar`, `#productGrid`, and `#series` in `index.html`.
- Produces: `products` array items with `id`, `name`, `series`, `description`, `price`, `image`, and `badge` fields; renders filterable product cards.

- [ ] **Step 1: Generate two square editorial product images**

Generate one image for Oreo baking treats and one for Nutella hazelnut baking treats, both in warm natural studio light with no text or logo. Save final images under the stated asset paths.

- [ ] **Step 2: Define the product catalogue**

In `app.js`, define Oreo and Nutella items such as `Oreo Burnt Cheesecake`, `Cookies & Cream Brownie`, `Nutella Sea-Salt Cookie`, and `Hazelnut Lava Bar` with ringgit prices and series labels.

- [ ] **Step 3: Render cards and filters**

Implement `renderProducts(filter = 'all')` to render buttons with `data-add-to-cart` and allow All, Oreo, and Nutella filter buttons to update the grid and active state without a page reload.

- [ ] **Step 4: Verify product interaction hooks**

Run: `Get-Content app.js | Select-String 'renderProducts|data-add-to-cart|oreo|nutella'`

Expected: catalogue data, render function, cart hooks, and both series names are present.

### Task 3: Implement friction-light basket interactions

**Files:**
- Modify: `app.js`
- Modify: `styles.css`

**Interfaces:**
- Consumes: `[data-add-to-cart]`, `#cartToggle`, `#cartPanel`, `#cartItems`, `#cartTotal`, `#toast`.
- Produces: in-memory basket, cart count, quantity controls, keyboard-dismissable cart, and confirmation feedback.

- [ ] **Step 1: Implement basket state and render function**

Create `const cart = []` and `renderCart()` to calculate item quantity and `RM` total, render quantity decrement/increment controls, and show a friendly empty-basket state.

- [ ] **Step 2: Wire fast add, adjust, and remove actions**

Delegate click events from `#productGrid` and `#cartItems`. `addToCart(id)` increments an existing item, opens a small confirmation toast, and updates `#cartCount`; quantity cannot drop below zero.

- [ ] **Step 3: Add cart drawer accessibility**

Use `aria-expanded`, an overlay, Escape-to-close, and focus return to `#cartToggle`. Keep the checkout button disabled with explanatory copy when the cart is empty.

- [ ] **Step 4: Verify JavaScript syntax**

Run: `node --check app.js`

Expected: exits with code 0.

### Task 4: Run visual and responsive quality checks

**Files:**
- Modify: `index.html`, `styles.css`, or `app.js` only if checks reveal an issue.

**Interfaces:**
- Consumes: the completed static storefront.
- Produces: a verified desktop and mobile presentation.

- [ ] **Step 1: Serve the storefront locally**

Run: `python -m http.server 4173`

Expected: a local HTTP server starts and serves `index.html`.

- [ ] **Step 2: Inspect key paths**

Open the local page at desktop and mobile widths. Test each collection filter, add two different products, alter one quantity, open and close the cart with Escape, and confirm the total updates.

- [ ] **Step 3: Finish checks**

Run: `node --check app.js; Get-ChildItem assets/products/*.png | Select-Object Name,Length`

Expected: JavaScript has no syntax errors and both image files have non-zero sizes.

- [ ] **Step 4: Commit**

Run: `git add index.html styles.css app.js assets/products docs/superpowers/plans/2026-06-22-jojo-bakes-storefront.md; git commit -m "feat: build Jojo Bakes storefront and series menu"`

Expected: a commit containing the storefront, assets, and implementation plan.

## Self-Review

- **Spec coverage:** Task 1 covers the full visual refresh, Task 2 adds Oreo and Nutella as genuine series, Task 3 makes the core ordering interaction quick and clear, and Task 4 checks real responsive behavior.
- **Placeholder scan:** No implementation placeholders are used; all new page hooks, product fields, and verification commands are specified.
- **Type consistency:** `products`, `renderProducts`, `cart`, `renderCart`, and the DOM hooks named in later tasks are defined by the preceding tasks.
