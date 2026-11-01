import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import productsData from '@/data/products.json';
import { Product } from '@/types/product';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { KidsCatalogClient } from '@/components/catalog/KidsCatalogClient';

export const metadata: Metadata = {
  title: 'Collection Enfant & Bébé | Top Tendance Tunisie',
  description:
    'Découvrez les collections bébé et enfant par tranche d’âge (0-12m, 1-3 ans, 4-7 ans, 8-12 ans) en Tunisie. Vêtements doux, confortables et durables.',
};

export default function KidsPage() {
  const kidsProducts = (productsData as Product[]).filter(
    (p) => p.category === 'kids'
  );

  return (
    <div className="min-h-screen bg-cream-50/40">
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Enfant', href: '/kids' },
        ]}
      />

      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 py-16 text-center text-charcoal-400">
            Chargement de la collection enfant...
          </div>
        }
      >
        <KidsCatalogClient initialProducts={kidsProducts} />
      </Suspense>
    </div>
  );
}

