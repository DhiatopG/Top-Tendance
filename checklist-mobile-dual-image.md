# Mobile Dual-Image Interaction Checklist (`ProductCard`)

> **Objective**: On touch devices (phones/tablets), users don't have a mouse hover to see the second image. Implement an intuitive mobile interaction so mobile shoppers can view the alternative product image seamlessly without hindering click navigation.

---

## 1. Interaction Design Options for Mobile
- [ ] **Option A (Recommended: Horizontal Swipe / Tap Indicator)**:
  - Add horizontal touch swipe (`onTouchStart`, `onTouchEnd`) on mobile screens to toggle between primary and secondary image.
  - Show subtle discreet mobile pagination dots (e.g. 2 small dots `● ○`) on mobile viewports (`sm:hidden`) when a secondary image is available.
  - Tapping a dot switches the visible image directly without navigating away.
- [ ] **Option B (Tap to Flip / Toggle on thumbnail)**:
  - Add a small camera/switch icon or toggle overlay on mobile that swaps between the front and back image on tap.
- [ ] **Option C (Timed subtle peek or 2-segment touch area)**:
  - Left half of mobile image shows front, right half shows back.

---

## 2. Implementation in `src/components/catalog/ProductCard.tsx`
- [ ] **State Management**:
  - Add `activeImageIndex` state (0 for primary, 1 for secondary).
  - Sync with active color selection so selecting a new swatch resets to image 0.
- [ ] **Touch Swipe Gesture Handling**:
  - Implement swipe detection (`touchStartX`, `touchEndX`) with a swipe threshold (e.g. 30px).
  - Swipe left: show secondary image (`activeImageIndex = 1`).
  - Swipe right: show primary image (`activeImageIndex = 0`).
- [ ] **Mobile Pagination Dots (`sm:hidden`)**:
  - When `hasSecondaryImage` is true, display 2 discreet dots at bottom center of image container.
  - Active dot: filled (`bg-charcoal` or `bg-white shadow-xs`); Inactive dot: translucent (`bg-white/60`).
  - Clicking/tapping a dot toggles the image without triggering the Link to the product detail page (`e.preventDefault()`, `e.stopPropagation()`).
- [ ] **Preserve Desktop Hover**:
  - Ensure desktop hover behavior remains 100% intact (smooth CSS opacity fade on `group-hover`).

---

## 3. Testing & Mobile Verification
- [ ] Test on mobile viewport (`375px`, `414px`) with touch simulation.
- [ ] Verify swiping switches smoothly between front and alternative image.
- [ ] Verify tapping pagination dots toggles images.
- [ ] Verify tapping the product image still opens the product detail page (`/product/[slug]`).
- [ ] Verify desktop hover continues to work exactly as before.

