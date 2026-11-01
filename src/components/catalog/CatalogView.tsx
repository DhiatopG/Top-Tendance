'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';
import { Product, KidsAgeGroup } from '@/types/product';
import { ProductCard } from './ProductCard';
import { FilterPanel, FilterState } from './FilterPanel';
import { MobileFilterDrawer } from './MobileFilterDrawer';
import { SortDropdown, SortOption } from './SortDropdown';

interface CatalogViewProps {
  category: 'women' | 'kids';
  initialProducts: Product[];
  ageGroup?: KidsAgeGroup | 'all';
  onAgeGroupChange?: (age: KidsAgeGroup | 'all') => void;
  headerSlot?: React.ReactNode;
}

export function CatalogView({
  category,
  initialProducts,
  ageGroup = 'all',
  onAgeGroupChange,
  headerSlot,
}: CatalogViewProps) {
  const isKids = category === 'kids';

  // 1. Min / Max prices in this category pool
  const { minPrice, maxPrice } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    initialProducts.forEach((p) => {
      const price = p.salePrice ?? p.price;
      if (price < min) min = price;
      if (price > max) max = price;
    });
    return {
      minPrice: min === Infinity ? 0 : Math.floor(min),
      maxPrice: max === -Infinity ? 500 : Math.ceil(max),
    };
  }, [initialProducts]);

  // 2. Filter State
  const [filters, setFilters] = useState<FilterState>({
    ageGroup: ageGroup,
    subcategories: [],
    sizes: [],
    colors: [],
    priceRange: [minPrice, maxPrice],
    sortBy: 'featured',
  });

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Sync external ageGroup changes with internal filter
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      ageGroup: ageGroup,
      // Reset selected sizes if they are incompatible with new age group
      sizes: [],
    }));
  }, [ageGroup]);

  // Update price range if pool min/max changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [minPrice, maxPrice],
    }));
  }, [minPrice, maxPrice]);

  // Base scope products: for kids, filter by ageGroup if selected
  const scopeProducts = useMemo(() => {
    if (isKids && filters.ageGroup && filters.ageGroup !== 'all') {
      return initialProducts.filter((p) => p.ageGroup === filters.ageGroup);
    }
    return initialProducts;
  }, [initialProducts, isKids, filters.ageGroup]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return scopeProducts
      .filter((p) => {
        // Subcategories filter
        if (
          filters.subcategories.length > 0 &&
          !filters.subcategories.includes(p.subcategory)
        ) {
          return false;
        }

        // Size filter (must have inStock = true for one of the selected sizes)
        if (filters.sizes.length > 0) {
          const hasInStockSize = p.sizes?.some(
            (s) => filters.sizes.includes(s.size) && s.inStock
          );
          if (!hasInStockSize) return false;
        }

        // Color filter
        if (filters.colors.length > 0) {
          const hasColor = p.colors?.some((c) =>
            filters.colors.includes(c.name)
          );
          if (!hasColor) return false;
        }

        // Price range filter
        const price = p.salePrice ?? p.price;
        if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = a.salePrice ?? a.price;
        const priceB = b.salePrice ?? b.price;

        switch (filters.sortBy) {
          case 'newest':
            if (a.isNew && !b.isNew) return -1;
            if (!a.isNew && b.isNew) return 1;
            return 0;
          case 'price-asc':
            return priceA - priceB;
          case 'price-desc':
            return priceB - priceA;
          case 'featured':
          default:
            if (a.isBestSeller && !b.isBestSeller) return -1;
            if (!a.isBestSeller && b.isBestSeller) return 1;
            if (a.isNew && !b.isNew) return -1;
            if (!a.isNew && b.isNew) return 1;
            return (b.rating ?? 0) - (a.rating ?? 0);
        }
      });
  }, [scopeProducts, filters]);

  const handleResetFilters = () => {
    setFilters({
      ageGroup: ageGroup,
      subcategories: [],
      sizes: [],
      colors: [],
      priceRange: [minPrice, maxPrice],
      sortBy: filters.sortBy,
    });
  };

  const activeFiltersCount =
    filters.subcategories.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.priceRange[0] > minPrice || filters.priceRange[1] < maxPrice ? 1 : 0);

  return (
    <div className="w-full pb-16">
      {/* Header Slot (Banners, Breadcrumbs, Editorial Intro) */}
      {headerSlot}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Top Control Bar (Mobile Filter Button & Desktop Toolbar) */}
        <div className="flex items-center justify-between gap-4 py-3 border-b border-border mb-6">
          {/* Left: Result Counter */}
          <div className="flex items-center gap-2">
            <p className="text-xs sm:text-sm text-charcoal-600">
              <span className="font-semibold text-charcoal">
                {filteredProducts.length}
              </span>{' '}
              {filteredProducts.length > 1 ? 'articles' : 'article'}
            </p>
            {activeFiltersCount > 0 && (
              <span className="hidden sm:inline-block text-xs text-charcoal-400">
                &bull; {activeFiltersCount} filtre{activeFiltersCount > 1 ? 's' : ''} actif{activeFiltersCount > 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Right: Mobile Trigger + Sort Dropdown */}
          <div className="flex items-center gap-3">
            {/* Mobile Filters Trigger Button */}
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              className={`lg:hidden flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider border transition ${
                isKids
                  ? 'border-kids-peach/30 bg-kids-peach-light text-kids-peach rounded-xl hover:bg-kids-peach-light/70'
                  : 'border-border bg-white text-charcoal rounded-xs hover:border-charcoal'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filtres</span>
              {activeFiltersCount > 0 && (
                <span
                  className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                    isKids
                      ? 'bg-kids-peach text-white'
                      : 'bg-charcoal text-white'
                  }`}
                >
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sorting Dropdown */}
            <SortDropdown
              value={filters.sortBy}
              onChange={(newSort: SortOption) =>
                setFilters((prev) => ({ ...prev, sortBy: newSort }))
              }
              variant={category}
            />
          </div>
        </div>

        {/* Main Catalog Layout: Sidebar + Product Grid */}
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-10 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block sticky top-28 bg-white border border-border p-5 rounded-sm">
            <FilterPanel
              products={scopeProducts}
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={handleResetFilters}
              minPossiblePrice={minPrice}
              maxPossiblePrice={maxPrice}
              categoryVariant={category}
            />
          </aside>

          {/* Product Grid or Empty State */}
          <main>
            {filteredProducts.length > 0 ? (
              <div
                className={`grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 ${
                  isKids ? 'kids-grid' : 'women-grid'
                }`}
              >
                {filteredProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant={category}
                    priority={idx < 4}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="py-20 px-4 text-center bg-cream-50 rounded-lg border border-dashed border-border flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-4 shadow-subtle text-charcoal-400">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-serif font-medium text-charcoal mb-2">
                  Aucun article trouvé
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-500 max-w-md mx-auto mb-6">
                  Aucune pièce ne correspond exactement à tous vos critères de
                  sélection. Essayez de réinitialiser ou d&apos;élargir vos filtres.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition shadow-subtle ${
                    isKids
                      ? 'bg-kids-peach hover:bg-kids-peach/90 rounded-xl'
                      : 'bg-charcoal hover:bg-charcoal-800 rounded-xs'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Réinitialiser les filtres</span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Floating Bottom Sticky Pill for quick access */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 lg:hidden shadow-floating">
        <button
          type="button"
          onClick={() => setIsMobileDrawerOpen(true)}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-floating backdrop-blur-md transition transform active:scale-95 ${
            isKids
              ? 'bg-kids-peach hover:bg-kids-peach/90'
              : 'bg-charcoal hover:bg-charcoal-900'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filtres</span>
          {activeFiltersCount > 0 && (
            <span className="ml-1 w-5 h-5 rounded-full bg-white text-charcoal text-[11px] font-bold flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Slide-Up Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        products={scopeProducts}
        matchingResultsCount={filteredProducts.length}
        filters={filters}
        onFilterChange={setFilters}
        onResetFilters={handleResetFilters}
        minPossiblePrice={minPrice}
        maxPossiblePrice={maxPrice}
        categoryVariant={category}
      />
    </div>
  );
}

