# Mobile Auto-Changing Images Checklist (`ProductCard`)

> **Objective**: On mobile devices, automatically cycle between the primary and secondary/alternative product image every few seconds with a smooth, elegant crossfade, creating a lively showcase without requiring manual hovering.

---

## 1. Auto-Cycle Timer & Animation Architecture
- [x] **Mobile Detection & Responsive Activation**:
  - [x] Run the auto-cycle timer exclusively on mobile viewports (`window.innerWidth < 768px` or touch-enabled devices).
  - [x] Leave desktop hover behavior (`group-hover:opacity-100`) 100% untouched.
- [x] **Gentle Interval & Staggered Timing**:
  - [x] Transition interval: **3.5 seconds** per image switch.
  - [x] Add pseudo-random or index-based stagger (e.g. `200ms - 800ms`) so cards on screen don't all flip at the exact same fraction of a second.
- [x] **Smooth CSS Crossfade**:
  - [x] Opacity transition: `transition-opacity duration-700 ease-in-out` so image changes feel high-end, calm, and editorial rather than jarring.

---

## 2. Implementation in `src/components/catalog/ProductCard.tsx`
- [x] **State & Effects**:
  - Add `isMobileAltImage` state (boolean, defaults to `false`).
  - Set up an interval timer (`useEffect`) that toggles `isMobileAltImage` when `hasSecondaryImage` is true.
  - Reset timer when color swatch changes.
- [x] **Visibility Optimization (Intersection Observer)**:
  - Only run the interval when the product card is inside the user's viewport (`IntersectionObserver`).
  - Pauses when scrolled out of view to preserve battery life and performance.
- [x] **Subtle Mobile Visual Indicator (Optional 2-bar or 2-dot)**:
  - Show tiny discreet indicator lines/dots at the bottom of the card on mobile to show which view is active.
- [x] **Tap Navigation Safety**:
  - Tapping the card opens the Product Detail Page (`/product/[slug]`) normally without being interrupted by the animation.

---

## 3. Testing & Mobile Verification
- [x] Test on mobile viewports (`375px` iPhone, `414px`, `768px` iPad).
- [x] Confirm images alternate automatically and smoothly between front and alternative angles.
- [x] Confirm that on desktop, hovering with mouse cursor still smoothly reveals the second image as before.
- [x] Confirm that tapping any product card navigates directly to the correct PDP.

