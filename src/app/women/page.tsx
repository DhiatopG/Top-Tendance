import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import productsData from '@/data/products.json';
import { Product } from '@/types/product';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { CatalogView } from '@/components/catalog/CatalogView';
import { Sparkles, ShieldCheck, Truck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Collection Femme | Top Tendance Tunisie',
  description:
    'Découvrez notre collection prêt-à-porter femme en Tunisie. Robes en lin pur, blazers structurés, mailles douces et pièces intemporelles de saison.',
};

export default function WomenPage() {
  const womenProducts = (productsData as Product[]).filter(
    (p) => p.category === 'women'
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Femme', href: '/women' },
        ]}
      />

      <CatalogView
        category="women"
        initialProducts={womenProducts}
        headerSlot={
          <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
            {/* Aesthetic Editorial Banner */}
            <div className="relative overflow-hidden bg-[#F6F3ED] border border-border/70 rounded-xs p-8 sm:p-12 lg:p-16">
              {/* Subtle ambient decorative gradient */}
              <div
                className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-cream-200/60 blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 backdrop-blur-xs border border-border text-[11px] font-semibold tracking-widest uppercase text-charcoal-700 rounded-xs mb-4">
                  <Sparkles className="w-3 h-3 text-charcoal-600" />
                  <span>Vestiaire Printemps - Été</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-charcoal leading-tight mb-4">
                  Collection Femme
                </h1>

                <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-sans max-w-xl mb-6">
                  L&apos;élégance méditerranéenne réinventée : lin pur, soies
                  délicates et coupes fluides conçues pour sublimer le quotidien
                  avec une grâce sans effort.
                </p>

                {/* Micro guarantees */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs text-charcoal-700 border-t border-charcoal-200/60">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-charcoal-500" />
                    <span>Livraison sur toute la Tunisie</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-charcoal-500" />
                    <span>Paiement à la livraison & retours 14j</span>
                  </div>
                </div>
              </div>
            </div>
          </header>
        }
      />
    </div>
  );
}

