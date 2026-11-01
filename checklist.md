# Top Tendance - Frontend Implementation Checklist

## Project Information
- **Brand**: Top Tendance
- **Market / Currency**: Tunisia / TND
- **Stack**: Next.js (App Router), TypeScript, Tailwind CSS, Lucide React, Context API + `localStorage`
- **Design Language**: 
  - **Women**: Calm, elegant, generous white space, neutral tones, editorial serif headings
  - **Kids**: Warm pastel accents (Terracotta / Soft Peach, Sage), rounded corners, friendly, age-first browsing

---

## Phase 1: Project Setup & Design System Foundation
- [x] Initialize Next.js 14+ project with TypeScript, Tailwind CSS, and App Router
- [x] Install essential packages (`lucide-react`, `clsx`, `tailwind-merge`)
- [x] Configure Tailwind theme:
  - [x] Color tokens (Charcoal `#1A1A1A`, Warm Cream `#F9F6F0`, Linen `#EFECE6`, Kids Peach `#E78B72`, Sage `#8EAA90`, Muted Sale `#B84A39`)
  - [x] Font families (`Playfair Display` for Women editorial headers, `Outfit` for Kids headers, `Inter` for interface and TND prices)
  - [x] Custom border radiuses (`rounded-2xl` for Kids, clean minimalist lines for Women)
- [x] Create `/data/products.json` mock data:
  - [x] Schema: `id`, `slug`, `name`, `description`, `price`, `salePrice`, `category` (women|kids), `subcategory`, `ageGroup` (kids only), `colors[]`, `sizes[]` with stock status, `images[]`, `fabric`, `care[]`, `isNew`, `isBestSeller`
  - [x] Populate at least 16–20 realistic products (Women dresses, knitwear, coats, sets; Kids rompers, tees, sets across age groups)
  - [x] Curate high-quality responsive image URLs (with 2nd hover image for every product)
- [x] Setup Currency utility (`formatPrice(amount)` -> e.g., `129,000 TND`)

---

## Phase 2: Global Shell & State Management
- [x] **State Providers (`/context`)**:
  - [x] `CartContext`: items, quantity, selected size, selected color, add, update, remove, subtotal, localStorage persistence
  - [x] `WishlistContext`: toggle wishlist, isWishlisted check, count, localStorage persistence
- [x] **Global Header Component**:
  - [x] Brand logo (Top Tendance) - ready for provided logo asset
  - [x] Desktop navigation (Women, Kids, New Arrivals, Best Sellers)
  - [x] Search trigger / input bar
  - [x] Wishlist icon with live item badge
  - [x] Cart icon with live counter and CartDrawer trigger
- [x] **Mobile Navigation Drawer**:
  - [x] Hamburger toggle button
  - [x] Slide-out menu with clear Women / Kids split
  - [x] Quick customer support links (Shipping, Contact)
- [x] **Global Footer**:
  - [x] Brand statement & newsletter signup box
  - [x] Categorized links (Shop, Help & Service, About)
  - [x] Tunisian payment icons & badges
  - [x] Copyright and legal links
- [x] **Feedback & Breadcrumbs**:
  - [x] Toast notification system (added to cart, added to wishlist)
  - [x] Reusable breadcrumbs component with schema-friendly structure

---

## Phase 3: Catalog & Category Pages
- [x] **ProductCard Component**:
  - [x] Image display with hover effect showing 2nd image
  - [x] "New" and "Sale" status badges
  - [x] Heart icon for instant wishlist toggle
  - [x] Product title, category, and price in TND (sale price crossed out)
  - [x] Color swatches preview (clickable to switch card photo)
  - [x] Mobile-optimized touch targets
- [x] **Filter System (`FilterPanel`)**:
  - [x] Size filter placed at the **top** and **expanded by default**
  - [x] Item counts dynamically shown next to each filter option
  - [x] Out-of-stock / zero-result filter options visually muted and disabled
  - [x] Color filter with visual swatches
  - [x] Price range slider / inputs
  - [x] Subcategory checkboxes
- [x] **Mobile Filter Bottom Sheet**:
  - [x] Floating or sticky "Filters" trigger button
  - [x] Smooth slide-up sheet with "Apply" and "Reset" actions
- [x] **Sorting Dropdown**:
  - [x] Featured, Newest, Price: Low to High, Price: High to Low
- [x] **Women Category Page (`/women`)**:
  - [x] Editorial header & aesthetic category banner
  - [x] Desktop sidebar filter + responsive product grid
- [x] **Kids Category Page (`/kids`)**:
  - [x] Age-first primary navigation tabs (`0-12m`, `1-3y`, `4-7y`, `8-12y`)
  - [x] Filter logic: filters by age group first, size second
  - [x] Warmer pastel UI styling & softer rounded cards

---

## Phase 4: Product Detail Page (PDP) (`/product/[slug]`)
- [x] **ImageGallery**:
  - [x] Desktop: multi-image grid or thumbnail carousel with zoom
  - [x] Mobile: touch-swipeable carousel with pagination dots
- [x] **PDP Layout Sequence (Strict Spec Order)**:
  1. Image gallery
  2. Product name & rating badge
  3. Price (regular & sale in TND)
  4. Color selector with active swatch highlight
  5. Size selector + "Find my size" guide link
  6. Out-of-stock sizes shown crossed out (not hidden)
  7. "Add to Cart" primary button
  8. Return policy line directly under the button ("Free returns within 14 days across Tunisia")
  9. Product description
  10. Fabric & Care breakdown accordion
  11. Customer reviews preview
- [x] **SizeGuideModal**:
  - [x] Women measurement chart (Bust, Waist, Hips in cm)
  - [x] Kids age/height/weight chart
- [x] **Mobile Sticky Action Bar**:
  - [x] Fixed bottom bar on mobile viewports (< 768px)
  - [x] Displays price, selected variant summary, and direct "Add to Cart" CTA

---

## Phase 5: Cart, Checkout & Wishlist
- [x] **CartDrawer (Slide-out)**:
  - [x] Slide-out animation from right
  - [x] List of cart items (thumbnail, name, selected size/color, quantity adjuster, remove action)
  - [x] Free shipping progress indicator
  - [x] Subtotal calculation in TND
  - [x] Quick "View Cart" and "Checkout" buttons
- [x] **Full Cart Page (`/cart`)**:
  - [x] Comprehensive cart table with quantity management
  - [x] Order summary breakdown (Subtotal, Estimated Delivery, Total)
  - [x] Empty cart state with link to continue shopping
- [x] **Checkout Page (`/checkout`) [UI Only]**:
  - [x] Step 1: Customer Contact details
  - [x] Step 2: Shipping address in Tunisia (Governorate dropdown: Tunis, Sousse, Sfax, etc.)
  - [x] Step 3: Payment method selector (Cash on Delivery / Paiement à la livraison, Konnect/Credit Card preview)
  - [x] Sticky order summary sidebar with product miniatures
- [x] **Wishlist Page (`/wishlist`)**:
  - [x] Grid of saved items with quick "Move to Cart" button
  - [x] Remove from wishlist action
  - [x] Empty state with recommended products

---

## Phase 6: Search & Auxiliary Pages
- [x] **Search Results Page (`/search`)**:
  - [x] Live search query handling
  - [x] Matching product results grid with active filters
  - [x] "No results found" suggestions
- [x] **Auth Pages (`/login`, `/register`) [UI Only]**:
  - [x] Elegant login form with validation styling
  - [x] Registration form (name, email, phone number, password)
- [x] **Account Dashboard (`/account`) [UI Only]**:
  - [x] Customer profile summary
  - [x] Recent mock order history with status badges ("In Transit", "Delivered")
  - [x] Saved addresses tab
- [x] **Information Pages**:
  - [x] About Page (`/about`): Brand story, craftsmanship, local presence
  - [x] Contact Page (`/contact`): Contact form, phone, WhatsApp button, boutique location
  - [x] Shipping & Returns (`/shipping-returns`): Delivery times per governorate, return policies

---

## Phase 7: Quality, Accessibility & Mobile Audit
- [x] **Responsive Viewport Testing**:
  - [x] Mobile standard: `375px` (iPhone SE / mini)
  - [x] Tablet: `768px` (iPad)
  - [x] Desktop: `1280px` / `1440px`
- [x] **Accessibility (WCAG AA)**:
  - [x] Contrast ratio $\ge$ 4.5:1 for body and heading text against backgrounds
  - [x] Clear keyboard focus rings on all buttons, links, and inputs
  - [x] Descriptive `alt` attributes on all product and hero images
  - [x] Proper ARIA labels for icon-only buttons (Wishlist, Cart, Mobile Menu)
- [x] **Performance & SEO**:
  - [x] `next/image` optimization with explicit `sizes` attributes and priority on LCP hero images
  - [x] Dynamic metadata (`generateMetadata`) for PDP pages
  - [x] OpenGraph title and descriptions for social sharing

