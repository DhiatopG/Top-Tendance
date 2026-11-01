'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { formatPrice } from '@/utils/currency';
import { ProductCard } from '@/components/catalog/ProductCard';
import productsData from '@/data/products.json';
import { Product } from '@/types/product';

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const allProducts = productsData as Product[];
  // Recommend 4 popular or new items when wishlist is empty or below 4
  const recommendedProducts = allProducts.filter((p) => p.isBestSeller || p.isNew).slice(0, 4);

  const handleMoveToCart = (product: Product) => {
    const defaultColor = product.colors[0];
    const availableSize = product.sizes.find((s) => s.inStock)?.size || product.sizes[0]?.size || 'U';

    addItem(product, defaultColor, availableSize, 1);
    removeFromWishlist(product.id);
    showToast(`"${product.name}" a été déplacé dans votre panier.`);
  };

  if (items.length === 0) {
    return (
      <div className="bg-cream min-h-screen py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-md mx-auto mb-16">
            <div className="w-16 h-16 rounded-full bg-white shadow-xs flex items-center justify-center mx-auto mb-4 text-charcoal-400">
              <Heart className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-charcoal mb-2">
              Votre liste d&apos;envies est vide
            </h1>
            <p className="text-sm text-charcoal-600 mb-6">
              Enregistrez vos pièces favorites en cliquant sur l&apos;icône cœur sur nos fiches articles.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/women"
                className="px-6 py-3 bg-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-charcoal-800 transition"
              >
                Collection Femme
              </Link>
              <Link
                href="/kids"
                className="px-6 py-3 bg-white border border-charcoal text-charcoal text-xs uppercase tracking-widest font-semibold hover:bg-charcoal hover:text-white transition"
              >
                Collection Enfant
              </Link>
            </div>
          </div>

          {/* Recommended products */}
          <div className="pt-12 border-t border-border">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif text-charcoal">
                  Nos coups de cœur du moment
                </h2>
                <p className="text-xs text-charcoal-500 mt-1">
                  Sélectionnés avec soin parmi nos collections phares
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {recommendedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-border gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif text-charcoal">
              Ma Liste d&apos;Envies
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
              {items.length} article{items.length > 1 ? 's' : ''} sauvegardé{items.length > 1 ? 's' : ''}
            </p>
          </div>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-charcoal hover:underline"
          >
            Accéder au panier <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => {
            const price = product.salePrice ?? product.price;
            const primaryColor = product.colors[0];
            const defaultImage = product.images[0];
            const hasStock = product.sizes.some((s) => s.inStock);

            return (
              <div
                key={product.id}
                className="bg-white border border-border rounded-xs overflow-hidden flex flex-col group transition hover:shadow-md"
              >
                {/* Product Image */}
                <div className="relative aspect-3/4 bg-cream overflow-hidden">
                  <Link href={`/product/${product.slug}`} className="block w-full h-full">
                    <Image
                      src={defaultImage}
                      alt={product.name}
                      fill
                      className="object-cover object-top transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </Link>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => {
                      removeFromWishlist(product.id);
                      showToast(`Article retiré de votre liste d'envies.`, 'info');
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-charcoal-500 hover:text-sale hover:bg-white transition shadow-xs"
                    title="Retirer de la wishlist"
                    aria-label={`Retirer ${product.name} de la wishlist`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Category tag */}
                  <span className="absolute bottom-3 left-3 px-2 py-1 bg-white/90 text-[10px] uppercase font-semibold tracking-wider text-charcoal rounded-xs backdrop-blur-xs">
                    {product.category === 'kids' ? 'Enfant' : 'Femme'}
                  </span>
                </div>

                {/* Details & Actions */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-sm text-charcoal line-clamp-1 mb-1">
                      <Link href={`/product/${product.slug}`} className="hover:underline">
                        {product.name}
                      </Link>
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="font-medium text-sm text-charcoal">
                        {formatPrice(price)}
                      </span>
                      {product.salePrice && (
                        <span className="text-xs text-charcoal-400 line-through">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Move to Cart CTA */}
                  <button
                    type="button"
                    disabled={!hasStock}
                    onClick={() => handleMoveToCart(product)}
                    className="w-full py-2.5 px-4 bg-charcoal text-white text-xs uppercase tracking-wider font-semibold hover:bg-charcoal-800 disabled:bg-charcoal-300 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 rounded-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    {hasStock ? 'Déplacer dans le panier' : 'Épuisé'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

