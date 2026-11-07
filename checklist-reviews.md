# Checklist: Customer Reviews Integration (Featurable API)

**Widget ID:** `94267520-354f-4c2a-9087-ebddd8fb8323`  
**Endpoint:** `https://api.featurable.com/v1/widgets/94267520-354f-4c2a-9087-ebddd8fb8323`  
**Status:** Completed & Verified (Build passing 32/32 pages)

---

## 1. Preparation & Configuration
- [x] Configure `next.config.mjs` to authorize Google user avatar domains (`lh3.googleusercontent.com` in `remotePatterns`).
- [x] Create TypeScript interfaces (`src/types/review.ts`):
  - [x] `Reviewer` (displayName, profilePhotoUrl)
  - [x] `ReviewReply` (comment, updateTime)
  - [x] `CustomerReview` (reviewId, reviewer, starRating, comment, createTime, reviewReply)
  - [x] `FeaturableWidgetData` (widget, averageRating, totalReviewCount, profileUrl, reviews)

## 2. Data Fetching & Caching Strategy
- [x] Create API fetcher utility (`src/utils/reviews.ts`):
  - [x] Fetch from direct endpoint `https://api.featurable.com/v1/widgets/94267520-354f-4c2a-9087-ebddd8fb8323`
  - [x] Set ISR caching (`next: { revalidate: 3600 }` / 1 hour)
  - [x] Implement fallback static dataset in case the external API fails or is rate-limited

## 3. UI Component Development
- [x] Create `src/components/home/CustomerReviews.tsx`:
  - [x] Section Header:
    - [x] Editorial title (*"Ce que disent nos clientes"* / *"Avis Vérifiés"*)
    - [x] Overall score badge (4.9 / 5.0 with gold stars)
    - [x] Official Google Verified Reviews badge
    - [x] "Laisser un avis" link button directing to Google Business place ID
  - [x] Review Cards Carousel / Grid:
    - [x] Customer avatar image with fallback monogram initials
    - [x] Star rating (5-star visual display)
    - [x] Relative or formatted date
    - [x] Review comment text with clean line clamping and optional expansion
    - [x] Owner reply badge / note (styled subtly)
  - [x] Navigation controls (Previous / Next arrows, scroll-snap for mobile gestures)

## 4. Homepage Integration
- [x] Import and place `<CustomerReviews />` into `src/app/page.tsx` (between Trust & Assurances strip and the Newsletter section).
- [x] Ensure full responsive design (mobile, tablet, desktop).

## 5. Verification & Testing
- [x] Run Next.js build (`npm run build`) to verify type correctness and image domain permissions.
- [x] Verify fast page load with zero Cumulative Layout Shift (CLS).
- [x] Test avatar fallbacks when Google images fail or are blocked.
- [x] Validate responsive behavior across desktop and mobile screens.

