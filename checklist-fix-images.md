# Fix 404 Upstream Images Checklist

> **Objective**: Replace the 3 expired Unsplash image URLs that return HTTP 404 with stable, high-definition fashion and kids apparel imagery.

---

## 1. Replace 404 Image in Home Page Category Tile
- [x] **`src/app/page.tsx`**:
  - [x] Replace `photo-1548624149-f9b1859aa9d0` (Tile 5: *Vestes & Blazers*) with a valid high-quality blazer image:
    `https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80`

---

## 2. Replace 404 Images in Product Catalog Dataset
- [x] **`src/data/products.json`**:
  - [x] **Item `tt-w-002` ("Blazer Structuré en Laine Froide")**:
    - [x] Replace primary image `photo-1548624313-039e3f670104` with:
      `https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80`
  - [x] **Item `tt-k-003` ("Salopette en Velours Côtelé Rétro")**:
    - [x] Replace secondary image `photo-1543854589-cb489868e469` with:
      `https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=1000&q=80`
  - [x] **Item `tt-k-006` ("Sweat Capuche Minimaliste")**:
    - [x] Replace detail image `photo-1543854589-cb489868e469` with:
      `https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=1000&q=80`

---

## 3. Verification & Validation
- [ ] Ensure all 3 replaced images load with HTTP 200 without Next.js upstream optimizer errors.
- [ ] Verify both `/` (Home page) and affected product detail pages (`/product/blazer-oversize-laine-froide-caramel`, `/product/salopette-velours-cotele-caramel-toddler`, `/product/sweat-molleton-ecologique-biscuit`) render without 404 warnings.

