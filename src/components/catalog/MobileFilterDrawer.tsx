'use client';

import React, { useEffect } from 'react';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { Product } from '@/types/product';
import { FilterPanel, FilterState } from './FilterPanel';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  matchingResultsCount: number;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  minPossiblePrice: number;
  maxPossiblePrice: number;
  categoryVariant?: 'women' | 'kids';
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  products,
  matchingResultsCount,
  filters,
  onFilterChange,
  onResetFilters,
  minPossiblePrice,
  maxPossiblePrice,
  categoryVariant = 'women',
}: MobileFilterDrawerProps) {
  const isKids = categoryVariant === 'kids';

  // Count active filters
  const activeFiltersCount =
    filters.subcategories.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.priceRange[0] > minPossiblePrice ||
    filters.priceRange[1] < maxPossiblePrice
      ? 1
      : 0);

  // Close on Escape & Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-Up Bottom Sheet */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Filtres de produits"
        className={`fixed inset-x-0 bottom-0 z-50 flex flex-col max-h-[88vh] bg-white rounded-t-2xl shadow-floating animate-in slide-in-from-bottom duration-300 ${
          isKids ? 'border-t-2 border-kids-peach/30' : ''
        }`}
      >
        {/* Pull tab handle */}
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1 bg-charcoal-200 rounded-full" />
        </div>

        {/* Sheet Header */}
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-charcoal" />
            <h2 className="text-sm uppercase tracking-wider font-bold text-charcoal">
              Filtres
            </h2>
            {activeFiltersCount > 0 && (
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  isKids
                    ? 'bg-kids-peach text-white'
                    : 'bg-charcoal text-white'
                }`}
              >
                {activeFiltersCount}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer les filtres"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream-100 text-charcoal transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Sheet Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <FilterPanel
            products={products}
            filters={filters}
            onFilterChange={onFilterChange}
            onResetFilters={onResetFilters}
            minPossiblePrice={minPossiblePrice}
            maxPossiblePrice={maxPossiblePrice}
            categoryVariant={categoryVariant}
            isMobileDrawer={true}
          />
        </div>

        {/* Sticky Sheet Footer Actions */}
        <div className="p-4 border-t border-border bg-white flex items-center gap-3">
          <button
            type="button"
            onClick={onResetFilters}
            disabled={activeFiltersCount === 0}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 px-4 border border-border text-charcoal text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-cream-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Réinitialiser</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className={`flex-2 py-3 px-4 text-white text-xs font-semibold uppercase tracking-wider text-center shadow-subtle transition ${
              isKids
                ? 'bg-kids-peach hover:bg-kids-peach/90 rounded-xl'
                : 'bg-charcoal hover:bg-charcoal-800 rounded-xs'
            }`}
          >
            {matchingResultsCount === 0
              ? 'Aucun résultat'
              : `Afficher ${matchingResultsCount} ${
                  matchingResultsCount > 1 ? 'résultats' : 'résultat'
                }`}
          </button>
        </div>
      </aside>
    </div>
  );
}

