'use client';

import React, { Suspense, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';
import productsData from '@/data/products.json';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/catalog/ProductCard';

const POPULAR_SEARCHES = [
  'Robe en lin',
  'Blazer laine',
  'Cardigan bébé',
  'Barboteuse',
  'Ensemble bermuda',
  'Cachemire',
  'Combinaison',
  'Manteau'
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get('q') || '';
  const tag = searchParams.get('tag') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [inputVal, setInputVal] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const allProducts = productsData as Product[];

  // Filter products based on query, tag, and category
  const filteredProducts = useMemo(() => {
    let result = allProducts;

    // Filter by tag if present (new or bestseller)
    if (tag === 'new') {
      result = result.filter((p) => p.isNew);
    } else if (tag === 'bestseller') {
      result = result.filter((p) => p.isBestSeller);
    }

    // Filter by text query
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter((p) => {
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchSubcat = p.subcategory.toLowerCase().includes(q);
        const matchFabric = p.fabric.toLowerCase().includes(q);
        const matchColors = p.colors.some((c) => c.name.toLowerCase().includes(q));
        return matchName || matchDesc || matchSubcat || matchFabric || matchColors;
      });
    }

    // Filter by category tab
    if (selectedCategory === 'women') {
      result = result.filter((p) => p.category === 'women');
    } else if (selectedCategory === 'kids') {
      result = result.filter((p) => p.category === 'kids');
    }

    // Sort results
    if (sortBy === 'price-asc') {
      return [...result].sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    }
    if (sortBy === 'price-desc') {
      return [...result].sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    }

    return result;
  }, [allProducts, query, tag, selectedCategory, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      router.push(`/search?q=${encodeURIComponent(inputVal.trim())}`);
    }
  };

  const clearSearch = () => {
    setInputVal('');
    router.push('/search');
  };

  const getPageTitle = () => {
    if (tag === 'new') return 'Nouveautés de Saison';
    if (tag === 'bestseller') return 'Meilleures Ventes';
    if (query) return `Résultats pour « ${query} »`;
    return 'Recherche de Produits';
  };

  return (
    <div className="bg-cream min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header & Search Form */}
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-serif text-charcoal mb-4">
            {getPageTitle()}
          </h1>
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Rechercher par article, matière, couleur..."
              className="w-full bg-white border border-border py-3 pl-12 pr-12 text-sm text-charcoal placeholder-charcoal-400 focus:outline-hidden focus:border-charcoal transition rounded-xs shadow-xs"
            />
            <Search className="absolute left-4 w-4 h-4 text-charcoal-400" />
            {inputVal && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 p-1 text-charcoal-400 hover:text-charcoal"
                aria-label="Effacer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Popular search pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-charcoal-600">
            <span className="font-medium text-charcoal-500">Suggestions :</span>
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => {
                  setInputVal(term);
                  router.push(`/search?q=${encodeURIComponent(term)}`);
                }}
                className="px-2.5 py-1 bg-white border border-border rounded-full hover:border-charcoal transition text-[11px]"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Filters and Controls Strip */}
        <div className="bg-white border border-border rounded-xs p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-xs transition shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-charcoal text-white'
                  : 'bg-linen/40 text-charcoal-700 hover:bg-linen'
              }`}
            >
              Tous les articles ({tag ? filteredProducts.length : allProducts.length})
            </button>
            <button
              onClick={() => setSelectedCategory('women')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-xs transition shrink-0 ${
                selectedCategory === 'women'
                  ? 'bg-charcoal text-white'
                  : 'bg-linen/40 text-charcoal-700 hover:bg-linen'
              }`}
            >
              Femme
            </button>
            <button
              onClick={() => setSelectedCategory('kids')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-xs transition shrink-0 ${
                selectedCategory === 'kids'
                  ? 'bg-kids-peach text-white'
                  : 'bg-linen/40 text-charcoal-700 hover:bg-linen'
              }`}
            >
              Enfant
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <ArrowUpDown className="w-3.5 h-3.5 text-charcoal-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-medium text-charcoal bg-transparent border-0 focus:ring-0 cursor-pointer"
            >
              <option value="featured">Tri : En vedette</option>
              <option value="price-asc">Prix : Croissant</option>
              <option value="price-desc">Prix : Décroissant</option>
            </select>
          </div>
        </div>

        {/* Results grid or No Results state */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-border rounded-xs p-12 text-center max-w-xl mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mx-auto mb-4 text-charcoal-400">
              <Search className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="text-xl font-serif text-charcoal mb-2">Aucun résultat trouvé</h2>
            <p className="text-xs sm:text-sm text-charcoal-600 mb-6">
              Nous n&apos;avons trouvé aucun article correspondant à votre recherche. Vérifiez l&apos;orthographe ou essayez d&apos;autres termes.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['Robes', 'Lin', 'Bébé', 'Pulls', 'Pantalons'].map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => {
                    setInputVal(sug);
                    router.push(`/search?q=${encodeURIComponent(sug)}`);
                  }}
                  className="px-3 py-1.5 bg-cream border border-border text-xs text-charcoal rounded-full hover:border-charcoal transition"
                >
                  {sug}
                </button>
              ))}
            </div>
            <Link
              href="/women"
              className="inline-block px-6 py-3 bg-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-charcoal-800 transition"
            >
              Découvrir toute la collection
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-xs text-charcoal-500 mb-4">
              {filteredProducts.length} article{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-sm font-medium text-charcoal">Chargement des résultats...</p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}

