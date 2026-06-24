# Full Jojo Bakes Replacement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing production Jojo Bakes storefront with the full React implementation and product assets supplied in `C:\Users\jiayi\OneDrive\Desktop\jojo-bakes`.

**Architecture:** Copy the supplied Vite entry files, application component, dependency manifests, helper files, and public product assets into the existing GitHub repository. Keep the existing repository identity, Cloudflare Pages project, `main` deployment branch, and Vite configuration because the supplied project does not provide a replacement Vite config.

**Tech Stack:** React, Vite, JavaScript, CSS.

## Global Constraints

- Work inside the existing `drunkcoffee/jojo-bakes` repository and production branch `main`.
- Do not create a new Cloudflare Pages project or site.
- Replace the storefront with the user-supplied full version, including its supplied menu, checkout flow, and product assets.
- Retain the existing `vite.config.js`; run `npm run build` before committing and pushing.

---

### Task 1: Replace supplied storefront source and assets

**Files:**
- Modify: `AGENTS.md`, `app.js`, `index.html`, `package.json`, `package-lock.json`, `preview-server.js`, `styles.css`
- Modify: `src/main.jsx`, `src/App.jsx`
- Create or modify: `public/assets/products/**`

**Interfaces:**
- Consumes: The supplied root files and `public/assets/products` directory.
- Produces: A Vite entry at `index.html` that loads `src/main.jsx`, which renders the supplied default `App` export and resolves its `/assets/products/*` image paths.

- [ ] **Step 1: Copy the supplied runtime source files**

Copy each supplied root file and the two React source files to the matching repository path.

- [ ] **Step 2: Copy the supplied public product assets**

Copy `public/assets/products` recursively so every product and hero image referenced by the supplied app is present in the build output.

### Task 2: Verify and publish

**Files:**
- Verify: `package.json`, `src/main.jsx`, `src/App.jsx`, `public/assets/products/**`

- [ ] **Step 1: Install the lockfile-defined dependencies**

Run `npm.cmd ci` so local dependencies exactly match the supplied package lock.

Expected: dependencies install without lockfile changes.

- [ ] **Step 2: Build the production site**

Run `npm.cmd run build`.

Expected: Vite completes successfully and generates `dist`.

- [ ] **Step 3: Commit and push the replacement to main**

Stage the supplied storefront replacement and this plan, create commit `feat: replace Jojo Bakes storefront`, then push `main` to `origin`.

Expected: The existing Cloudflare Pages project receives the new main-branch commit and runs its unchanged `npm run build` / `dist` deployment configuration.
