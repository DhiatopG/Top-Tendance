'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, ChevronDown, Check } from 'lucide-react';

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  variant?: 'women' | 'kids';
}

const SORT_LABELS: Record<SortOption, string> = {
  featured: 'En vedette',
  newest: 'Nouveautés',
  'price-asc': 'Prix : Croissant',
  'price-desc': 'Prix : Décroissant',
};

export function SortDropdown({
  value,
  onChange,
  variant = 'women',
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isKids = variant === 'kids';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (opt: SortOption) => {
    onChange(opt);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Trier les produits"
        className={`inline-flex items-center justify-between gap-2.5 px-3.5 py-2 text-xs font-medium text-charcoal bg-white border border-border transition focus:outline-hidden ${
          isKids
            ? 'rounded-xl hover:border-kids-peach'
            : 'rounded-xs hover:border-charcoal'
        }`}
      >
        <div className="flex items-center gap-1.5 text-charcoal-500">
          <ArrowUpDown className="w-3.5 h-3.5 text-charcoal-400" />
          <span>Trier par :</span>
        </div>
        <span className="font-semibold text-charcoal">
          {SORT_LABELS[value]}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-charcoal-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className={`absolute right-0 z-30 mt-1 w-48 bg-white border border-border shadow-floating py-1 focus:outline-hidden animate-in fade-in duration-150 ${
            isKids ? 'rounded-xl' : 'rounded-xs'
          }`}
        >
          {(Object.keys(SORT_LABELS) as SortOption[]).map((optionKey) => {
            const isSelected = value === optionKey;
            return (
              <button
                key={optionKey}
                role="option"
                aria-selected={isSelected}
                type="button"
                onClick={() => handleSelect(optionKey)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition ${
                  isSelected
                    ? isKids
                      ? 'bg-kids-peach-light/50 font-bold text-kids-peach'
                      : 'bg-cream-100 font-semibold text-charcoal'
                    : 'text-charcoal hover:bg-cream-50'
                }`}
              >
                <span>{SORT_LABELS[optionKey]}</span>
                {isSelected && (
                  <Check
                    className={`w-3.5 h-3.5 ${
                      isKids ? 'text-kids-peach' : 'text-charcoal'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

