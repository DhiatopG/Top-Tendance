# Top Tendance — Project Context & Session Memory

> **Purpose**: Read this file at the start of every session instead of re-scanning the whole codebase.
> Keep it updated after every phase or significant change.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router, `src/` layout) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 (custom config in `tailwind.config.ts`) |
| Icons | `lucide-react` |
| Utilities | `clsx`, `tailwind-merge` |
| State | React Context API + `localStorage` (no external lib) |
| Fonts | `Playfair Display` (women headings), `Outfit` (kids headings), `Inter` (UI + prices) |
| Currency | Tunisia / TND — formatted via `src/utils/currency.ts` → `formatPrice(189)` → `"189.000 TND"` |
| Images | `next/image`, remote patterns: `images.unsplash.com` |
| Data | Static mock JSON at `src/data/products.json` (16 products: 8 women, 8 kids) |

---

## Design System

### Colors (tailwind.config.ts)
- `charcoal` (#1A1A1A) — primary text/bg (women)
- `cream` (#F9F6F0) — page background
- `linen` (#EFECE6) — subtle surface
- `kids-peach` (#E78B72), `kids-peach-light` (#FDF1ED)
- `kids-sage` (#8EAA90), `kids-sage-light` (#F1F6F2)
- `kids-sky` (#8FBAD6), `kids-sky-light` (#EEF5FA)
- `sale` (#B84A39), `sale-light` (#FBEBE9)
- `border` (#E5E5E5)

### Design Language
- **Women**: Calm, editorial, generous whitespace, neutral tones, `rounded-women` (2px), serif headings, no rounded corners on buttons
- **Kids**: Warm pastels, `rounded-kids` (20px), `font-kids`, friendly UI, age-first navigation

### Typography
- `font-serif` → Playfair Display (women editorial)
- `font-kids` → Outfit (kids UI)
- `font-sans` → Inter (default body, prices)

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx          ← Root layout: fonts, providers, Header, CartDrawer, Footer
│   ├── page.tsx            ← Home (placeholder, shows product count)
│   ├── globals.css         ← Base Tailwind + scrollbar styles
│   ├── women/
│   │   └── page.tsx        ← /women — SSG, editorial banner, CatalogView
│   ├── kids/
│   │   └── page.tsx        ← /kids — SSG + Suspense, KidsCatalogClient
│   └── product/
│       └── [slug]/
│           └── page.tsx    ← /product/[slug] — SSG×16, generateStaticParams, OG metadata
├── components/
│   ├── common/
│   │   ├── Header.tsx      ← Sticky header, logo (public/images/logo.jpg), nav, search, cart/wishlist icons
│   │   ├── Footer.tsx      ← Brand + newsletter + links + TN payment icons
│   │   ├── MobileMenu.tsx  ← Slide-out drawer, Women/Kids split
│   │   └── Breadcrumbs.tsx ← Reusable, schema-friendly
│   ├── cart/
│   │   └── CartDrawer.tsx  ← Slide-in cart, quantity controls, free shipping bar
│   ├── catalog/
│   │   ├── ProductCard.tsx         ← Dual-image hover, badges, wishlist, color swatches
│   │   ├── FilterPanel.tsx         ← Desktop sidebar filter (sizes top+expanded, counts, muted OOS)
│   │   ├── MobileFilterDrawer.tsx  ← Slide-up bottom sheet with Apply/Reset
│   │   ├── SortDropdown.tsx        ← Featured / Newest / Price ↑↓
│   │   ├── CatalogView.tsx         ← Orchestrates sidebar + grid + mobile pill
│   │   └── KidsCatalogClient.tsx   ← Age-first tabs (0-12m, 1-3y, 4-7y, 8-12y) with counts
│   └── product/
│       ├── PDPClient.tsx       ← Full PDP — all 11 spec sections, mobile sticky bar
│       ├── ImageGallery.tsx    ← Desktop thumbnail strip + zoom, Mobile swipe carousel + dots
│       ├── SizeGuideModal.tsx  ← Women (Bust/Waist/Hips) + Kids (Height/Weight/Chest) charts
│       └── Accordion.tsx       ← Reusable open/close accordion (Fabric, Care, Returns)
├── context/
│   ├── CartContext.tsx      ← items, qty, add/update/remove, subtotal, localStorage, freeShippingThreshold
│   ├── WishlistContext.tsx  ← toggle, isInWishlist, count, localStorage
│   └── ToastContext.tsx     ← showToast(text, type), 3.5s auto-dismiss, bottom-right stack
├── data/
│   └── products.json       ← 16 products (8 women, 8 kids)
├── types/
│   └── product.ts          ← Product, CartItem, FilterState, ProductColor, ProductSize, Category, KidsAgeGroup
└── utils/
    └── currency.ts         ← formatPrice(), getDiscountPercentage()
```

---

## Data Schema (product.ts)

```ts
Product {
  id, slug, name, description
  price: number          // TND
  salePrice?: number     // TND, null if no sale
  category: 'women' | 'kids'
  subcategory: string
  ageGroup?: '0-12m' | '1-3y' | '4-7y' | '8-12y'  // kids only
  colors: { name, hex, imageIndex }[]
  sizes: { size, inStock, stockCount? }[]
  images: string[]       // [main, hover, detail_1, ...]
  fabric: string
  care: string[]
  isNew: boolean
  isBestSeller: boolean
  rating?: number
  reviewCount?: number
}
```

### Product Data Facts
- **Women subcategories**: Robes, Vestes & Manteaux, Pulls & Mailles, Pantalons, Chemises & Blouses, Jupes, Ensembles
- **Women sizes**: XS S M L XL / 34 36 38 40 42
- **Kids subcategories**: Bébé & Naissance, Tricots & Gilets, Pantalons & Salopettes, Robes, Ensembles, Sweats & Pulls, Vestes & Chemises, Jupes & Robes
- **Kids sizes**: 0-3m 3-6m 6-9m 9-12m / 1-3m 6-12m / 12-18m 18-24m 2-3y / 4-5y 5-6y 6-7y / 8-9y 9-10y 10-11y 11-12y
- **Price range**: 45–285 TND

---

## Providers (layout.tsx wrapping order)

```
ToastProvider
  └── CartProvider
        └── WishlistProvider
              ├── Header
              ├── CartDrawer
              ├── <main>{children}</main>
              └── Footer
```

---

## Routes Built

| Route | Status | Notes |
|---|---|---|
| `/` | ✅ Done | Flagship Home: Dual hero (Women/Kids), categories grid, interactive new/bestseller showcase, storytelling block, trust strip, VIP club |
| `/women` | ✅ Done | SSG, editorial banner, full catalog + filters |
| `/kids` | ✅ Done | SSG, age tabs, pastel UI, full catalog + filters |
| `/product/[slug]` | ✅ Done | SSG×16, image gallery, PDP layout, size guide, mobile sticky bar |
| `/search` | ✅ Done | Live search query, tag filtering (new/bestseller), category tabs, sort |
| `/cart` | ✅ Done | Full cart page with table, free shipping progress, summary |
| `/checkout` | ✅ Done | 3-step checkout form (Contact, TN Governorates, COD/Konnect), sticky sidebar |
| `/wishlist` | ✅ Done | Saved items grid, move to cart, empty state + recommendations |
| `/login` | ✅ Done | Client authentication form with validation styling |
| `/register` | ✅ Done | Account creation form (name, email, phone, password) |
| `/account` | ✅ Done | Dashboard with orders history, addresses carnet, profile |
| `/about` | ✅ Done | Brand story, editorial craftsmanship, pillars |
| `/contact` | ✅ Done | Form, phone, WhatsApp direct link, boutique hours |
| `/shipping-returns` | ✅ Done | Delivery delays across 24 governorates, 14-day return rules |

---

## Phases Progress

| Phase | Status |
|---|---|
| **1 — Project Setup & Design System** | ✅ Complete |
| **2 — Global Shell & State Management** | ✅ Complete |
| **3 — Catalog & Category Pages** | ✅ Complete |
| **4 — Product Detail Page (PDP)** | ✅ Complete |
| **5 — Cart & Checkout Flow** | ✅ Complete |
| **6 — Wishlist Page** | ✅ Complete |
| **7 — Quality, Accessibility & Mobile Audit** | ✅ Complete |
| **8 — Performance & SEO** | ✅ Complete |

---

## Known Patterns & Conventions

- `'use client'` required on any component using hooks or browser APIs
- Server pages import data directly from `src/data/products.json` (no API)
- `CatalogView` is the shared orchestrator for both `/women` and `/kids`
- Kids pages use `Suspense` boundary because `KidsCatalogClient` uses `useSearchParams()`
- Filter counts are computed with **facet exclusion** (clicking a size shows how many items still match all other filters, not just that size)
- `FilterPanel` exported `FilterState` type — used by `CatalogView`, `MobileFilterDrawer`, and `KidsCatalogClient`
- All interactive filter/sort state lives in `CatalogView` and is passed down as props
- Build verified: `next build` exits code 0, all routes SSG

---

## Important Config Files

- `tailwind.config.ts` — custom colors, fonts, borderRadius, boxShadow
- `next.config.mjs` — image remotePatterns (unsplash)
- `tsconfig.json` — `@/` path alias → `./src/`
- `package.json` — `"type": "module"`, Next 14.2.x

---

## Last Updated
- **Session**: 2026-11-01
- **Last completed**: Phase 7 (Quality, Accessibility & Mobile Audit + SEO)
- **Status**: All Checklist Milestones Complete!

