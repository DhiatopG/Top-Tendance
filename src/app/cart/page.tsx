'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/currency';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    freeShippingThreshold,
    totalItems,
  } = useCart();

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercentage = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const shippingCost = items.length === 0 ? 0 : subtotal >= freeShippingThreshold ? 0 : 7.0;
  const orderTotal = subtotal + shippingCost;

  if (items.length === 0) {
    return (
      <div className="bg-cream min-h-[70vh] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-white shadow-xs flex items-center justify-center text-charcoal mb-6">
            <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h1 className="text-3xl font-serif text-charcoal mb-3">Votre panier est vide</h1>
          <p className="text-charcoal-600 max-w-md mx-auto mb-8 text-sm">
            Vous n&apos;avez pas encore ajouté d&apos;articles à votre panier. Explorez nos collections Femme et Enfant pour trouver vos coups de cœur.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/women"
              className="w-full sm:w-auto px-8 py-3.5 bg-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-charcoal-800 transition"
            >
              Collection Femme
            </Link>
            <Link
              href="/kids"
              className="w-full sm:w-auto px-8 py-3.5 bg-white border border-charcoal text-charcoal text-xs uppercase tracking-widest font-semibold hover:bg-charcoal hover:text-white transition"
            >
              Collection Enfant
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-serif text-charcoal">
            Mon Panier <span className="text-lg font-sans font-normal text-charcoal-500">({totalItems} article{totalItems > 1 ? 's' : ''})</span>
          </h1>
        </div>

        {/* Free Shipping Alert Bar */}
        <div className="mb-8 bg-white border border-border p-4 sm:p-5 rounded-xs shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <span className="text-sm font-medium text-charcoal">
              {remainingForFreeShipping > 0 ? (
                <>
                  Ajoutez encore <strong className="text-charcoal font-semibold">{formatPrice(remainingForFreeShipping)}</strong> pour profiter de la{' '}
                  <span className="text-emerald-700 font-semibold">Livraison Gratuite</span>
                </>
              ) : (
                <span className="text-emerald-700 font-semibold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  Félicitations ! Vous bénéficiez de la livraison offerte en Tunisie.
                </span>
              )}
            </span>
            <span className="text-xs text-charcoal-500">
              Seuil livraison offerte: {formatPrice(freeShippingThreshold)}
            </span>
          </div>
          <div className="w-full bg-linen h-2 rounded-full overflow-hidden">
            <div
              className="bg-charcoal h-full transition-all duration-300"
              style={{ width: `${freeShippingPercentage}%` }}
            />
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Cart Table / Items List */}
          <div className="lg:col-span-8 bg-white border border-border rounded-xs shadow-xs p-4 sm:p-6">
            <div className="hidden sm:grid sm:grid-cols-12 gap-4 pb-4 border-b border-border text-xs uppercase tracking-wider text-charcoal-500 font-medium">
              <span className="col-span-6">Article</span>
              <span className="col-span-2 text-center">Quantité</span>
              <span className="col-span-2 text-right">Prix</span>
              <span className="col-span-2 text-right">Total</span>
            </div>

            <div className="divide-y divide-border">
              {items.map((item) => {
                const itemPrice = item.product.salePrice ?? item.product.price;
                const lineTotal = itemPrice * item.quantity;
                const isKids = item.product.category === 'kids';

                return (
                  <div key={item.id} className="py-5 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-start sm:items-center">
                    {/* Product & Variant */}
                    <div className="sm:col-span-6 flex items-center gap-4 w-full">
                      <div className="relative w-20 h-24 sm:w-24 sm:h-28 bg-cream shrink-0 border border-border rounded-xs overflow-hidden">
                        <Image
                          src={item.product.images[item.selectedColor.imageIndex] || item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 640px) 80px, 96px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`inline-block text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded-xs mb-1 ${
                          isKids ? 'bg-kids-peach-light text-kids-peach' : 'bg-linen text-charcoal-600'
                        }`}>
                          {isKids ? 'Enfant' : 'Femme'}
                        </span>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="block text-sm sm:text-base font-serif text-charcoal hover:underline truncate"
                        >
                          {item.product.name}
                        </Link>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-charcoal-500">
                          <span className="flex items-center gap-1.5">
                            <span
                              className="w-3 h-3 rounded-full border border-charcoal-300"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                          <span>&bull;</span>
                          <span>Taille: <strong className="text-charcoal">{item.selectedSize}</strong></span>
                        </div>
                        {/* Mobile unit price display */}
                        <div className="sm:hidden mt-2 font-medium text-xs text-charcoal">
                          {formatPrice(itemPrice)}
                        </div>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="sm:col-span-2 flex items-center justify-between sm:justify-center w-full">
                      <div className="flex items-center border border-border rounded-xs bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-cream text-charcoal transition"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-cream text-charcoal transition"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Mobile delete button */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="sm:hidden text-charcoal-400 hover:text-sale p-1"
                        aria-label="Supprimer l'article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Unit price (Desktop) */}
                    <div className="hidden sm:block sm:col-span-2 text-right text-xs text-charcoal-600 font-medium">
                      {formatPrice(itemPrice)}
                    </div>

                    {/* Line total & remove (Desktop) */}
                    <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-3 w-full">
                      <span className="sm:hidden text-xs text-charcoal-500">Total :</span>
                      <span className="text-sm font-semibold text-charcoal">
                        {formatPrice(lineTotal)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="hidden sm:block text-charcoal-400 hover:text-sale p-1 transition"
                        title="Supprimer l'article"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Link
                href="/women"
                className="text-xs font-semibold text-charcoal uppercase tracking-wider hover:underline"
              >
                &larr; Continuer mes achats
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-border rounded-xs shadow-xs p-6 space-y-5">
              <h2 className="text-lg font-serif text-charcoal pb-3 border-b border-border">
                Récapitulatif de la commande
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-charcoal-600">
                  <span>Sous-total articles</span>
                  <span className="font-medium text-charcoal">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-charcoal-600">
                  <span>Frais de livraison estimés</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-emerald-700 font-semibold">Gratuit</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>
                <p className="text-xs text-charcoal-500 italic">
                  Livraison partout en Tunisie sous 48h à 72h ouvrées.
                </p>
                <div className="pt-3 border-t border-border flex justify-between text-base font-semibold text-charcoal">
                  <span>Total TTC</span>
                  <span className="text-lg">{formatPrice(orderTotal)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 py-4 bg-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-charcoal-800 transition rounded-xs"
              >
                Passer la commande <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Guarantees */}
              <div className="pt-4 border-t border-border space-y-2.5 text-xs text-charcoal-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-charcoal-500 shrink-0" />
                  <span>Livraison express à domicile sur toute la Tunisie</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-charcoal-500 shrink-0" />
                  <span>Paiement à la livraison ou en ligne 100% sécurisé</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-charcoal-500 shrink-0" />
                  <span>Retours et échanges possibles sous 14 jours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

