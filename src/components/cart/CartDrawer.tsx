'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/currency';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    subtotal,
    totalItems,
    freeShippingThreshold,
  } = useCart();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercentage = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Panier">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-charcoal" />
              <h2 className="text-lg font-medium text-charcoal font-serif">
                Mon Panier ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-charcoal-500 hover:text-charcoal hover:bg-cream rounded transition"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-cream-50 px-5 py-3 border-b border-border">
            {remainingForFreeShipping > 0 ? (
              <p className="text-xs text-charcoal-700 font-medium">
                Plus que{' '}
                <span className="font-semibold text-charcoal">
                  {formatPrice(remainingForFreeShipping)}
                </span>{' '}
                pour la livraison gratuite en Tunisie !
              </p>
            ) : (
              <p className="text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                Félicitations ! La livraison est offerte pour cette commande.
              </p>
            )}
            <div className="w-full bg-linen h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-charcoal h-full transition-all duration-300"
                style={{ width: `${freeShippingPercentage}%` }}
              />
            </div>
          </div>

          {/* Items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center text-charcoal-400">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-lg text-charcoal">Votre panier est vide</p>
                  <p className="text-sm text-charcoal-500 max-w-xs">
                    Découvrez nos nouvelles collections Femme et Enfant et commencez votre sélection.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-6 py-2.5 bg-charcoal text-white text-xs uppercase tracking-widest font-medium hover:bg-charcoal-800 transition"
                >
                  Découvrir les collections
                </button>
              </div>
            ) : (
              items.map((item) => {
                const price = item.product.salePrice ?? item.product.price;
                return (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-border-DEFAULT last:border-0"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-24 bg-cream shrink-0 overflow-hidden rounded-xs border border-border">
                      <Image
                        src={item.product.images[item.selectedColor.imageIndex] || item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover object-top"
                        sizes="80px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <Link
                            href={`/product/${item.product.slug}`}
                            onClick={() => setIsCartOpen(false)}
                            className="font-medium text-sm text-charcoal hover:underline line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-charcoal-400 hover:text-sale transition p-0.5"
                            aria-label={`Supprimer ${item.product.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Variant attributes */}
                        <div className="flex items-center gap-2 mt-1 text-xs text-charcoal-500">
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-charcoal-300 inline-block"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                          <span>&bull;</span>
                          <span>Taille: <strong>{item.selectedSize}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity adjust */}
                        <div className="flex items-center border border-border rounded-xs">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-cream text-charcoal-600 transition"
                            aria-label="Diminuer la quantité"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-medium text-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-cream text-charcoal-600 transition"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <p className="text-sm font-semibold text-charcoal">
                          {formatPrice(price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer actions */}
          {items.length > 0 && (
            <div className="p-5 border-t border-border bg-cream-50 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-charcoal-600">
                  <span>Sous-total estimé</span>
                  <span className="font-semibold text-charcoal text-sm">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-charcoal-500">
                  <span>Livraison</span>
                  <span>
                    {remainingForFreeShipping === 0 ? (
                      <span className="text-emerald-700 font-medium">Offerte</span>
                    ) : (
                      'Calculée à la commande (7.000 TND)'
                    )}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-charcoal-800 transition"
                >
                  Commander <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full block text-center py-2.5 bg-white border border-border text-charcoal text-xs uppercase tracking-wider font-medium hover:bg-cream transition"
                >
                  Voir le panier complet
                </Link>
              </div>

              <p className="text-[11px] text-center text-charcoal-500">
                Paiement sécurisé en ligne ou à la livraison en Tunisie
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

