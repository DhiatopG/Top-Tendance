# Location Section Integration Checklist

This checklist tracks the plan and implementation steps for integrating the Google Maps location section just before the footer on Top Tendance.

---

## 1. Requirement & Asset Details
- **Target Position**: Directly above the global `<Footer />` (either inside `src/app/layout.tsx` or as an individual section depending on page scope).
- **Embed Code Provided**:
  ```html
  <iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.195525579566!2d10.095792075550067!3d36.837793065580136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd330062af6b4b%3A0x84dd0c6e31ae20d8!2sTop%20Tendance!5e0!3m2!1sen!2stn!4v1793578256561!5m2!1sen!2stn" 
    width="2000" 
    height="300" 
    style="border:0;" 
    allowfullscreen="" 
    loading="lazy" 
    referrerpolicy="strict-origin-when-cross-origin">
  </iframe>
  ```

---

## 2. Checklist

### Preparation & Architectural Decisions
- [x] **Placement scope decision**:
  - Global placement directly before `<Footer />` inside `src/app/layout.tsx` so the store location is accessible across all pages, with an option to be customized via props if needed.
- [x] **Design & Responsive Layout**:
  - Encapsulate the iframe in a clean, reusable component (`src/components/common/StoreLocation.tsx`).
  - Make iframe responsive: replace fixed `width="2000"` with `w-full`, and keep an appropriate height (`h-[300px]`, `border-0`).
  - Design an elegant, editorial header aligned with the Top Tendance brand identity (charcoal & cream palette, subtle serif accent, store label and directions link).

### Component Implementation
- [x] Create `src/components/common/StoreLocation.tsx`:
  - [x] Add accessible heading / label (e.g., "Visitez Notre Boutique / Visit Us").
  - [x] Embed the Google Maps `iframe` with Next.js / JSX compatible attributes (`allowFullScreen`, `referrerPolicy`, `className="w-full h-[300px] border-0"`).
  - [x] Ensure `loading="lazy"` is maintained for performance optimization.
- [x] Insert the component directly above `<Footer />`:
  - [x] Update `src/app/layout.tsx` (or target page).

### Verification & Testing
- [x] Check responsive rendering across viewports (Mobile, Tablet, Desktop).
- [x] Verify map interactions (scroll zoom, touch gestures, pin visibility).
- [x] Run build test (`npm run build` / lint) to verify TypeScript & JSX syntax compatibility.
- [x] Push clean commit to GitHub `main` for deployment.
- [ ] Ensure no layout shift (CLS) or horizontal scrollbars occur due to iframe dimensions.

