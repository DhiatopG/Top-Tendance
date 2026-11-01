# Fix Editorial Storytelling Images Checklist ("L'Esprit Top Tendance")

> **Objective**: Fix the visual container collapse in the "L'Esprit Top Tendance" section on the Home page (`/`), ensuring both images render with proper portrait heights, responsive scaling, and verified image sources.

---

## 1. Fix Container Dimensions & Layout
- [x] **`src/app/page.tsx`**:
  - [x] Replace collapsing `aspect-4/5` class with explicit responsive heights:
    - Primary card: `relative h-72 sm:h-96 lg:h-[480px] w-full rounded-xs overflow-hidden border border-border shadow-xs`
    - Staggered secondary card: `relative h-72 sm:h-96 lg:h-[480px] w-full rounded-xs overflow-hidden border border-border shadow-xs mt-6 sm:mt-10`
  - [x] Ensure `object-cover object-center` and correct responsive `sizes` are applied to both `Image` elements.

---

## 2. Verified High-Definition Image Sources
- [x] **Left Editorial Image (Women & Linen Textures)**:
  - [x] Use stable verified image:
    `https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80`
- [x] **Right Editorial Image (Kids Softness & Childhood)**:
  - [x] Use stable verified image:
    `https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80`

---

## 3. Visual Verification
- [x] Verify both images render fully in a balanced 2-column staggered portrait format on Desktop (`1280px+`).
- [x] Verify images scale cleanly and stack proportionally on Tablet (`768px`) and Mobile (`375px`).
- [x] Confirm no distortion, overflow, or upstream image loading errors in terminal.

