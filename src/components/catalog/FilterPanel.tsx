'use client';

import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Check,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { Product, KidsAgeGroup } from '@/types/product';
import { formatPrice } from '@/utils/currency';

export interface FilterState {
  ageGroup?: KidsAgeGroup | 'all';
  subcategories: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc';
}

interface FilterPanelProps {
  products: Product[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  minPossiblePrice: number;
  maxPossiblePrice: number;
  categoryVariant?: 'women' | 'kids';
  isMobileDrawer?: boolean;
}

// Ordered reference for natural size display
const SIZE_ORDER = [
  // Baby / Toddler
  '0-3m',
  '1-3m',
  '3-6m',
  '6-9m',
  '6-12m',
  '9-12m',
  '12-18m',
  '18-24m',
  '2-3y',
  // Kids
  '4-5y',
  '5-6y',
  '6-7y',
  '8-9y',
  '9-10y',
  '10-11y',
  '11-12y',
  // Women Alpha
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  // Women Numeric
  '34',
  '36',
  '38',
  '40',
  '42',
  '44',
];

export function FilterPanel({
  products,
  filters,
  onFilterChange,
  onResetFilters,
  minPossiblePrice,
  maxPossiblePrice,
  categoryVariant = 'women',
  isMobileDrawer = false,
}: FilterPanelProps) {
  const isKids = categoryVariant === 'kids';

  // Section accordion state: SIZE is at TOP and expanded by default
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isColorOpen, setIsColorOpen] = useState(true);

  // Temporary local price range input state
  const [priceInputMin, setPriceInputMin] = useState<number>(filters.priceRange[0]);
  const [priceInputMax, setPriceInputMax] = useState<number>(filters.priceRange[1]);

  // Sync inputs if filters change externally (e.g. reset)
  React.useEffect(() => {
    setPriceInputMin(filters.priceRange[0]);
    setPriceInputMax(filters.priceRange[1]);
  }, [filters.priceRange]);

  // 1. Gather all unique available subcategories in the current scope
  const availableSubcategories = useMemo(() => {
    const subs = new Set<string>();
    products.forEach((p) => {
      if (p.subcategory) subs.add(p.subcategory);
    });
    return Array.from(subs).sort();
  }, [products]);

  // 2. Gather all unique sizes in the current scope
  const availableSizes = useMemo(() => {
    const sizeSet = new Set<string>();
    products.forEach((p) => {
      p.sizes?.forEach((s) => sizeSet.add(s.size));
    });
    return Array.from(sizeSet).sort((a, b) => {
      const idxA = SIZE_ORDER.indexOf(a);
      const idxB = SIZE_ORDER.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [products]);

  // 3. Gather all unique colors with hex codes in the current scope
  const availableColors = useMemo(() => {
    const colorMap = new Map<string, string>();
    products.forEach((p) => {
      p.colors?.forEach((c) => {
        if (!colorMap.has(c.name)) {
          colorMap.set(c.name, c.hex);
        }
      });
    });
    return Array.from(colorMap.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products]);

  // Helper: check if a product matches filters excluding a specific facet
  const matchesFiltersExcept = (
    p: Product,
    skipFacet: 'size' | 'subcategory' | 'color' | 'price'
  ) => {
    // Subcategory check
    if (skipFacet !== 'subcategory' && filters.subcategories.length > 0) {
      if (!filters.subcategories.includes(p.subcategory)) return false;
    }

    // Size check (product must have inStock = true for one of selected sizes)
    if (skipFacet !== 'size' && filters.sizes.length > 0) {
      const hasSizeInStock = p.sizes?.some(
        (s) => filters.sizes.includes(s.size) && s.inStock
      );
      if (!hasSizeInStock) return false;
    }

    // Color check
    if (skipFacet !== 'color' && filters.colors.length > 0) {
      const hasColor = p.colors?.some((c) => filters.colors.includes(c.name));
      if (!hasColor) return false;
    }

    // Price check
    if (skipFacet !== 'price') {
      const effectivePrice = p.salePrice ?? p.price;
      if (
        effectivePrice < filters.priceRange[0] ||
        effectivePrice > filters.priceRange[1]
      ) {
        return false;
      }
    }

    return true;
  };

  // 4. Dynamic counts for Sizes
  const sizeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    availableSizes.forEach((size) => {
      const matchingCount = products.filter((p) => {
        if (!matchesFiltersExcept(p, 'size')) return false;
        // The product must contain this size and it must be in stock
        return p.sizes?.some((s) => s.size === size && s.inStock);
      }).length;
      counts[size] = matchingCount;
    });
    return counts;
  }, [products, availableSizes, filters]);

  // 5. Dynamic counts for Subcategories
  const subcategoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    availableSubcategories.forEach((sub) => {
      const count = products.filter((p) => {
        if (p.subcategory !== sub) return false;
        return matchesFiltersExcept(p, 'subcategory');
      }).length;
      counts[sub] = count;
    });
    return counts;
  }, [products, availableSubcategories, filters]);

  // 6. Dynamic counts for Colors
  const colorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    availableColors.forEach((color) => {
      const count = products.filter((p) => {
        const hasColor = p.colors?.some((c) => c.name === color.name);
        if (!hasColor) return false;
        return matchesFiltersExcept(p, 'color');
      }).length;
      counts[color.name] = count;
    });
    return counts;
  }, [products, availableColors, filters]);

  // Check if any filters are active
  const hasActiveFilters =
    filters.subcategories.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.priceRange[0] > minPossiblePrice ||
    filters.priceRange[1] < maxPossiblePrice;

  // Toggle Handlers
  const handleSizeToggle = (size: string) => {
    const nextSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ ...filters, sizes: nextSizes });
  };

  const handleSubcategoryToggle = (subcategory: string) => {
    const nextSubs = filters.subcategories.includes(subcategory)
      ? filters.subcategories.filter((s) => s !== subcategory)
      : [...filters.subcategories, subcategory];
    onFilterChange({ ...filters, subcategories: nextSubs });
  };

  const handleColorToggle = (colorName: string) => {
    const nextColors = filters.colors.includes(colorName)
      ? filters.colors.filter((c) => c !== colorName)
      : [...filters.colors, colorName];
    onFilterChange({ ...filters, colors: nextColors });
  };

  const handleApplyPrice = () => {
    const min = Math.max(minPossiblePrice, Math.min(priceInputMin, priceInputMax));
    const max = Math.min(maxPossiblePrice, Math.max(priceInputMin, priceInputMax));
    onFilterChange({ ...filters, priceRange: [min, max] });
  };

  const handlePresetPrice = (min: number, max: number) => {
    setPriceInputMin(min);
    setPriceInputMax(max);
    onFilterChange({ ...filters, priceRange: [min, max] });
  };

  return (
    <div className="w-full flex flex-col divide-y divide-border text-charcoal">
      {/* Header with active reset button */}
      <div className="pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-charcoal-700" />
          <h2 className="text-xs uppercase tracking-widest font-bold text-charcoal">
            Filtres
          </h2>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs text-charcoal-500 hover:text-sale transition focus:outline-hidden"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Réinitialiser</span>
          </button>
        )}
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="py-3 flex flex-wrap gap-1.5">
          {filters.sizes.map((size) => (
            <span
              key={`badge-size-${size}`}
              className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-charcoal-100 text-charcoal rounded-sm"
            >
              <span>Taille : {size}</span>
              <button
                type="button"
                onClick={() => handleSizeToggle(size)}
                aria-label={`Retirer filtre taille ${size}`}
                className="hover:text-sale"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.subcategories.map((sub) => (
            <span
              key={`badge-sub-${sub}`}
              className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-charcoal-100 text-charcoal rounded-sm"
            >
              <span>{sub}</span>
              <button
                type="button"
                onClick={() => handleSubcategoryToggle(sub)}
                aria-label={`Retirer filtre ${sub}`}
                className="hover:text-sale"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.colors.map((color) => (
            <span
              key={`badge-color-${color}`}
              className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-charcoal-100 text-charcoal rounded-sm"
            >
              <span>{color}</span>
              <button
                type="button"
                onClick={() => handleColorToggle(color)}
                aria-label={`Retirer filtre couleur ${color}`}
                className="hover:text-sale"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {(filters.priceRange[0] > minPossiblePrice ||
            filters.priceRange[1] < maxPossiblePrice) && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-charcoal-100 text-charcoal rounded-sm">
              <span>
                {formatPrice(filters.priceRange[0], { showDecimals: false })} -{' '}
                {formatPrice(filters.priceRange[1], { showDecimals: false })}
              </span>
              <button
                type="button"
                onClick={() => handlePresetPrice(minPossiblePrice, maxPossiblePrice)}
                aria-label="Réinitialiser filtre prix"
                className="hover:text-sale"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* SECTION 1: SIZE FILTER (Top & Expanded by default as required) */}
      <section className="py-4">
        <button
          type="button"
          onClick={() => setIsSizeOpen(!isSizeOpen)}
          className="w-full flex items-center justify-between text-left focus:outline-hidden group"
          aria-expanded={isSizeOpen}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold group-hover:text-charcoal-600">
              Tailles
            </span>
            {filters.sizes.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-charcoal text-white text-[10px] flex items-center justify-center font-bold">
                {filters.sizes.length}
              </span>
            )}
          </div>
          {isSizeOpen ? (
            <ChevronUp className="w-4 h-4 text-charcoal-400 group-hover:text-charcoal" />
          ) : (
            <ChevronDown className="w-4 h-4 text-charcoal-400 group-hover:text-charcoal" />
          )}
        </button>

        {isSizeOpen && (
          <div className="mt-3">
            <div className="grid grid-cols-4 sm:grid-cols-4 gap-1.5">
              {availableSizes.map((size) => {
                const isSelected = filters.sizes.includes(size);
                const count = sizeCounts[size] ?? 0;
                const isDisabled = count === 0;

                return (
                  <button
                    key={`size-btn-${size}`}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleSizeToggle(size)}
                    aria-label={`Taille ${size} (${count} articles)`}
                    title={
                      isDisabled
                        ? `Taille ${size} : Rupture de stock`
                        : `Taille ${size} (${count} disponibles)`
                    }
                    className={`relative py-2 px-1 text-xs font-medium transition-all text-center flex flex-col items-center justify-center min-h-[44px] ${
                      isKids ? 'rounded-lg' : 'rounded-xs'
                    } ${
                      isSelected
                        ? isKids
                          ? 'bg-kids-peach text-white shadow-xs font-bold'
                          : 'bg-charcoal text-white shadow-xs font-semibold'
                        : isDisabled
                        ? 'bg-charcoal-50 text-charcoal-300 border border-dashed border-charcoal-200 cursor-not-allowed opacity-50 line-through'
                        : 'bg-white border border-border text-charcoal hover:border-charcoal hover:bg-cream-50'
                    }`}
                  >
                    <span>{size}</span>
                    <span
                      className={`text-[9px] mt-0.5 ${
                        isSelected
                          ? 'opacity-80'
                          : isDisabled
                          ? 'text-charcoal-300'
                          : 'text-charcoal-400'
                      }`}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* SECTION 2: SUBCATEGORIES CHECKBOXES */}
      <section className="py-4">
        <button
          type="button"
          onClick={() => setIsSubcategoryOpen(!isSubcategoryOpen)}
          className="w-full flex items-center justify-between text-left focus:outline-hidden group"
          aria-expanded={isSubcategoryOpen}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold group-hover:text-charcoal-600">
              Sous-catégories
            </span>
            {filters.subcategories.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-charcoal text-white text-[10px] flex items-center justify-center font-bold">
                {filters.subcategories.length}
              </span>
            )}
          </div>
          {isSubcategoryOpen ? (
            <ChevronUp className="w-4 h-4 text-charcoal-400 group-hover:text-charcoal" />
          ) : (
            <ChevronDown className="w-4 h-4 text-charcoal-400 group-hover:text-charcoal" />
          )}
        </button>

        {isSubcategoryOpen && (
          <div className="mt-3 space-y-2 max-h-56 overflow-y-auto pr-1">
            {availableSubcategories.map((sub) => {
              const isSelected = filters.subcategories.includes(sub);
              const count = subcategoryCounts[sub] ?? 0;
              const isDisabled = count === 0;

              return (
                <label
                  key={`sub-${sub}`}
                  className={`flex items-center justify-between gap-2 p-1.5 text-xs transition cursor-pointer select-none rounded-xs ${
                    isDisabled
                      ? 'opacity-40 cursor-not-allowed text-charcoal-400'
                      : 'hover:bg-cream-50 text-charcoal-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={isDisabled}
                      onChange={() => handleSubcategoryToggle(sub)}
                      className={`w-4 h-4 rounded-xs border-charcoal-300 text-charcoal focus:ring-charcoal ${
                        isDisabled ? 'cursor-not-allowed' : ''
                      }`}
                    />
                    <span
                      className={`truncate ${
                        isDisabled ? 'line-through text-charcoal-400' : ''
                      } ${isSelected ? 'font-semibold text-charcoal' : ''}`}
                    >
                      {sub}
                    </span>
                  </div>
                  <span className="text-[11px] text-charcoal-400 font-normal shrink-0">
                    ({count})
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </section>

      {/* SECTION 3: PRICE RANGE SLIDER / INPUTS */}
      <section className="py-4">
        <button
          type="button"
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="w-full flex items-center justify-between text-left focus:outline-hidden group"
          aria-expanded={isPriceOpen}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold group-hover:text-charcoal-600">
              Prix (TND)
            </span>
            {(filters.priceRange[0] > minPossiblePrice ||
              filters.priceRange[1] < maxPossiblePrice) && (
              <span className="w-2 h-2 rounded-full bg-charcoal" />
            )}
          </div>
          {isPriceOpen ? (
            <ChevronUp className="w-4 h-4 text-charcoal-400 group-hover:text-charcoal" />
          ) : (
            <ChevronDown className="w-4 h-4 text-charcoal-400 group-hover:text-charcoal" />
          )}
        </button>

        {isPriceOpen && (
          <div className="mt-3 space-y-3">
            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handlePresetPrice(minPossiblePrice, maxPossiblePrice)}
                className={`px-2 py-1 text-[11px] rounded-xs border transition ${
                  filters.priceRange[0] === minPossiblePrice &&
                  filters.priceRange[1] === maxPossiblePrice
                    ? 'bg-charcoal text-white border-charcoal'
                    : 'bg-white border-border text-charcoal hover:border-charcoal'
                }`}
              >
                Tous
              </button>
              <button
                type="button"
                onClick={() => handlePresetPrice(minPossiblePrice, 100)}
                className={`px-2 py-1 text-[11px] rounded-xs border transition ${
                  filters.priceRange[0] === minPossiblePrice &&
                  filters.priceRange[1] === 100
                    ? 'bg-charcoal text-white border-charcoal'
                    : 'bg-white border-border text-charcoal hover:border-charcoal'
                }`}
              >
                &lt; 100 TND
              </button>
              <button
                type="button"
                onClick={() => handlePresetPrice(100, 200)}
                className={`px-2 py-1 text-[11px] rounded-xs border transition ${
                  filters.priceRange[0] === 100 && filters.priceRange[1] === 200
                    ? 'bg-charcoal text-white border-charcoal'
                    : 'bg-white border-border text-charcoal hover:border-charcoal'
                }`}
              >
                100 - 200 TND
              </button>
              <button
                type="button"
                onClick={() => handlePresetPrice(200, maxPossiblePrice)}
                className={`px-2 py-1 text-[11px] rounded-xs border transition ${
                  filters.priceRange[0] === 200 &&
                  filters.priceRange[1] === maxPossiblePrice
                    ? 'bg-charcoal text-white border-charcoal'
                    : 'bg-white border-border text-charcoal hover:border-charcoal'
                }`}
              >
                &gt; 200 TND
              </button>
            </div>

            {/* Inputs & Apply */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex-1">
                <label className="sr-only">Prix minimum</label>
                <div className="relative">
                  <input
                    type="number"
                    min={minPossiblePrice}
                    max={maxPossiblePrice}
                    value={priceInputMin}
                    onChange={(e) => setPriceInputMin(Number(e.target.value))}
                    className="w-full text-xs py-1.5 px-2 pr-7 border border-border rounded-xs text-charcoal focus:outline-hidden focus:border-charcoal"
                    placeholder="Min"
                  />
                  <span className="absolute right-2 top-1.5 text-[10px] text-charcoal-400">
                    TND
                  </span>
                </div>
              </div>

              <span className="text-charcoal-400 text-xs">-</span>

              <div className="flex-1">
                <label className="sr-only">Prix maximum</label>
                <div className="relative">
                  <input
                    type="number"
                    min={minPossiblePrice}
                    max={maxPossiblePrice}
                    value={priceInputMax}
                    onChange={(e) => setPriceInputMax(Number(e.target.value))}
                    className="w-full text-xs py-1.5 px-2 pr-7 border border-border rounded-xs text-charcoal focus:outline-hidden focus:border-charcoal"
                    placeholder="Max"
                  />
                  <span className="absolute right-2 top-1.5 text-[10px] text-charcoal-400">
                    TND
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleApplyPrice}
                className="px-2.5 py-1.5 bg-charcoal text-white text-xs font-medium rounded-xs hover:bg-charcoal-800 transition focus:outline-hidden"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 4: COLOR FILTER WITH VISUAL SWATCHES */}
      <section className="py-4">
        <button
          type="button"
          onClick={() => setIsColorOpen(!isColorOpen)}
          className="w-full flex items-center justify-between text-left focus:outline-hidden group"
          aria-expanded={isColorOpen}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold group-hover:text-charcoal-600">
              Couleurs
            </span>
            {filters.colors.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-charcoal text-white text-[10px] flex items-center justify-center font-bold">
                {filters.colors.length}
              </span>
            )}
          </div>
          {isColorOpen ? (
            <ChevronUp className="w-4 h-4 text-charcoal-400 group-hover:text-charcoal" />
          ) : (
            <ChevronDown className="w-4 h-4 text-charcoal-400 group-hover:text-charcoal" />
          )}
        </button>

        {isColorOpen && (
          <div className="mt-3">
            <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
              {availableColors.map((color) => {
                const isSelected = filters.colors.includes(color.name);
                const count = colorCounts[color.name] ?? 0;
                const isDisabled = count === 0;

                return (
                  <button
                    key={`color-filter-${color.name}`}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleColorToggle(color.name)}
                    aria-label={`Couleur ${color.name} (${count} articles)`}
                    title={
                      isDisabled
                        ? `${color.name} : non disponible`
                        : `${color.name} (${count})`
                    }
                    className={`flex items-center justify-between gap-1.5 p-1.5 rounded-xs border text-left text-xs transition min-h-[38px] ${
                      isSelected
                        ? isKids
                          ? 'border-kids-peach bg-kids-peach-light/40 font-semibold'
                          : 'border-charcoal bg-charcoal-50 font-semibold'
                        : isDisabled
                        ? 'border-border/50 bg-charcoal-50/50 opacity-40 cursor-not-allowed line-through'
                        : 'border-border bg-white hover:border-charcoal hover:bg-cream-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-4 h-4 rounded-full border border-black/15 shadow-xs shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: color.hex }}
                      >
                        {isSelected && (
                          <Check
                            className={`w-2.5 h-2.5 ${
                              ['#F8F7F2', '#FDFAF7', '#FFFFFF', '#F5EFE6'].includes(
                                color.hex.toUpperCase()
                              )
                                ? 'text-charcoal'
                                : 'text-white'
                            }`}
                          />
                        )}
                      </span>
                      <span className="truncate text-[11px]">{color.name}</span>
                    </div>
                    <span className="text-[10px] text-charcoal-400 shrink-0">
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

