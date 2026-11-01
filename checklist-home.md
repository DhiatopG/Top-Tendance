# Top Tendance — Home Page Implementation Checklist

> **Goal**: Replace the initial Phase 1 placeholder on `/` with a flagship, high-converting editorial e-commerce Home Page reflecting the dual brand identity (Women: calm, refined editorial; Kids: warm, pastel, playful).

---

## 1. Dual Split Hero Section
- [x] **Dual Hero Banner (Desktop side-by-side, Mobile stacked)**:
  - [x] **Left / Femme Wing**:
    - High-fashion lifestyle image (linen / tailored collection)
    - Editorial serif typography ("Élégance Naturelle & Matières Nobles")
    - Subtitle highlighting summer linen, soft tailoring, timeless silhouettes
    - Primary CTA button: "Découvrir la Collection Femme" &rarr; `/women`
  - [x] **Right / Enfant Wing**:
    - Soft, joyful aesthetic with pastel badge accents (`kids-peach` / `kids-sage`)
    - Friendly font styling (`font-kids`) ("Douceur & Poésie du Quotidien")
    - Subtitle highlighting organic cotton, baby sets (0-12m), and playwear
    - Primary CTA button: "Découvrir la Collection Enfant" &rarr; `/kids`
- [x] **Seasonal Announcement Bar / Sub-banner**:
  - Highlights complimentary delivery in Tunisia on orders &ge; 200 TND and cash on delivery.

---

## 2. Curated Categories Showcase
- [x] **Quick Visual Category Carousel / Grid (4-6 tiles)**:
  - [x] "Robes en Lin" (Femme) &rarr; `/women?subcategory=Robes`
  - [x] "Bébé & Naissance" (0-12m) &rarr; `/kids?ageGroup=0-12m`
  - [x] "Tricots & Mailles Douces" &rarr; `/women?subcategory=Pulls & Mailles`
  - [x] "Ensembles & Salopettes" &rarr; `/kids?subcategory=Ensembles`
  - [x] "Vestes & Blazers Structurés" &rarr; `/women?subcategory=Vestes & Manteaux`
- [x] **Hover animations & tactile badge indicators**.

---

## 3. Featured Products Showcase (Interactive Tabs)
- [x] **Tab Switcher**: "Nouveautés" (New In) vs. "Coups de Cœur" (Bestsellers)
- [x] **Product Grid (4-8 items)**:
  - Rendered via `ProductCard.tsx` with:
    - Dual image hover transitions
    - Wishlist heart toggle with instant feedback
    - Color swatches selector
    - Formatted price in TND (`formatPrice`)
- [x] **"Voir Tout" (View All) direct links** to `/search?tag=new` and `/search?tag=bestseller`.

---

## 4. Editorial Storytelling Block ("L'Esprit Top Tendance")
- [x] **Split visual + editorial statement**:
  - Imagery of Mediterranean textures, authentic linen folds, and child-safe finishes
  - Brand manifesto: *"Conçu à Tunis, inspiré par la Méditerranée"*
  - 3 micro-pillars with icons:
    - 🌿 *100% Matières Naturelles* (Certified linen & organic cotton)
    - ✂️ *Coupes Intemporelles* (Designed to last beyond seasons)
    - 🇹🇳 *Savoir-Faire & Proximité Locale* (Boutique aux Berges du Lac 2, Tunis)
- [x] Link to `/about` ("En savoir plus sur notre histoire").

---

## 5. Trust & Assurance Strip (Tunisia Focused)
- [x] **4-Column Value Proposition Bar**:
  - [x] 🚚 **Livraison 24/48h** (Sur toute la Tunisie, offerte dès 200 TND)
  - [x] 💵 **Paiement à la Livraison** (Réglez en espèces à la réception de votre colis)
  - [x] 🔄 **Échanges & Retours 14 Jours** (Procédure simplifiée par livreur à domicile)
  - [x] 📞 **Service Client Tunisien** (Disponible par téléphone et WhatsApp 6j/7)

---

## 6. Newsletter / VIP Club Callout
- [x] High-contrast editorial card offering **-10% de réduction** on the first order.
- [x] Inline email input with instant validation feedback.
- [x] Linked terms & quick-link to `/register`.

---

## 7. Performance & Quality Standards
- [x] Next.js Image optimization (`next/image`, `priority` on hero banners, responsive `sizes`).
- [x] Full responsiveness across Mobile (`375px`), Tablet (`768px`), and Desktop (`1280px+`).
- [x] WCAG AA compliant contrast and accessible focus states.

