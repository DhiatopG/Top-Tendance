'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/catalog/ProductCard';

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState<'new' | 'bestseller'>('new');

  const newItems = products.filter((p) => p.isNew).slice(0, 8);
  const bestsellers = products.filter((p) => p.isBestSeller).slice(0, 8);

  const displayedProducts = activeTab === 'new' ? newItems : bestsellers;
  const viewAllLink = activeTab === 'new' ? '/search?tag=new' : '/search?tag=bestseller';
  const viewAllLabel = activeTab === 'new' ? 'Voir toutes les nouveautés' : 'Voir toutes les meilleures ventes';

  return (
    <section className="py-14 sm:py-20 border-t border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-charcoal-500 mb-2 block">
              Nos Créations
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-charcoal">
              La Sélection du Moment
            </h3>
          </div>

          {/* Interactive Tab Switcher */}
          <div className="flex items-center gap-2 bg-cream p-1 rounded-xs border border-border self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('new')}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-xs transition duration-200 flex items-center gap-1.5 ${
                activeTab === 'new'
                  ? 'bg-charcoal text-white shadow-xs'
                  : 'text-charcoal-600 hover:text-charcoal'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Nouveautés
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('bestseller')}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-xs transition duration-200 ${
                activeTab === 'bestseller'
                  ? 'bg-charcoal text-white shadow-xs'
                  : 'text-charcoal-600 hover:text-charcoal'
              }`}
            >
              Coups de Cœur
            </button>
          </div>
        </div>

        {/* Product Grid (up to 8 items) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA Link */}
        <div className="mt-12 text-center">
          <Link
            href={viewAllLink}
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-charcoal text-charcoal text-xs uppercase tracking-widest font-semibold hover:bg-charcoal hover:text-white transition duration-300"
          >
            {viewAllLabel} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

