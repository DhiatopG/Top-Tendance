# Checklist: Resolution & Prevention of Next.js Static Asset 404 Errors

> **Issue Reference**:
> ```text
> GET /_next/static/css/app/layout.css?v=1793568088394 404 in 71ms
> GET /_next/static/chunks/app-pages-internals.js 404 in 87ms
> GET /_next/static/chunks/main-app.js?v=1793568088394 404 in 87ms
> ```
> **Status**: Ready for execution (Awaiting user confirmation)

---

## Phase 1: Pre-Implementation Verification (Completed Diagnostics)
- [x] Analyze error logs and trace the timestamp parameter (`v=1793568088394`) to an earlier compilation session.
- [x] Run production build (`next build`) to rule out syntax errors, missing CSS, or broken component imports (completed with 0 errors).
- [x] Inspect layout and client providers (`Header`, `Footer`, `CartDrawer`, `CartContext`, etc.) for valid `'use client'` boundaries.
- [x] Confirm that active port `3000` is currently serving valid 200 responses on current chunk hashes.

---

## Phase 2: Process & Cache Cleanup
- [x] **Step 2.1 - Terminate running dev server instances**:
  - Close active terminal running `next dev` or stop any orphaned Node.js processes on port `3000`.
- [x] **Step 2.2 - Purge `.next` cache directory**:
  - Delete `.next` folder to eliminate stale chunk manifests (`build-manifest.json`, `app-build-manifest.json`) and Webpack cache:
    ```powershell
    Remove-Item -Recurse -Force .next
    ```
- [ ] **Step 2.3 - Flush browser client state**:
  - In the browser tab (`http://localhost:3000`), clear site data or perform a hard refresh (`Ctrl + Shift + R` / `Ctrl + F5`).
  - (Alternative: test in an Incognito / Private browsing window).

---

## Phase 3: Dev Server Relaunch & Live Verification
- [ ] **Step 3.1 - Restart dev server**:
  - Run fresh development server:
    ```powershell
    npm run dev
    ```
- [ ] **Step 3.2 - Verify asset requests in browser network tab**:
  - [ ] `GET /` returns `200 OK`.
  - [ ] `GET /_next/static/css/app/layout.css` returns `200 OK`.
  - [ ] `GET /_next/static/chunks/main-app.js` returns `200 OK`.
  - [ ] `GET /_next/static/chunks/app-pages-internals.js` returns `200 OK`.
- [ ] **Step 3.3 - Verify terminal output**:
  - Confirm terminal shows clean route compilation without any 404 static asset lines.

---

## Phase 4: Long-Term Safeguards (Optional DX Enhancements)
- [ ] Add a `dev:clean` npm script to `package.json` for one-command cache purge & server launch:
  ```json
  "dev:clean": "powershell -Command \"if (Test-Path .next) { Remove-Item -Recurse -Force .next }; next dev\""
  ```
- [ ] Document in team notes that restarting `next dev` while keeping stale browser tabs open may produce temporary 404s until the page is reloaded.

