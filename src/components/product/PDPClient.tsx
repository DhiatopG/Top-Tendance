'use client';

import React, { useState } from 'react';
import { ShoppingBag, Heart, Ruler, ShieldCheck, Truck } from 'lucide-react';
import { Product, ProductColor } from '@/types/product';
import { formatPrice, getDiscountPercentage } from '@/utils/currency';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { ImageGallery } from './ImageGallery';
import { SizeGuideModal } from './SizeGuideModal';
import { Accordion } from './Accordion';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

interface PDPClientProps {
  product: Product;
}

export function PDPClient({ product }: PDPClientProps) {
  const isKids = product.category === 'kids';
  const { addItem, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const isWishlisted = isInWishlist(product.id);
  const discountPercent = product.salePrice
    ? getDiscountPercentage(product.price, product.salePrice)
    : 0;

  // Images following the selected color's imageIndex
  const colorImages = (() => {
    const ci = selectedColor?.imageIndex ?? 0;
    const reordered = [...product.images];
    if (ci > 0 && ci < reordered.length) {
      const [primary] = reordered.splice(ci, 1);
      reordered.unshift(primary);
    }
    return reordered;
  })();

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      document.getElementById('size-selector')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSizeError(false);
    addItem(product, selectedColor, selectedSize);
    showToast(`« ${product.name} » ajouté au panier`, 'success');
    setIsCartOpen(true);
  };

  const handleWishlist = () => {
    const added = toggleWishlist(product);
    showToast(
      added
        ? `« ${product.name} » ajouté aux favoris`
        : `« ${product.name} » retiré des favoris`,
      added ? 'success' : 'info'
    );
  };

  const breadcrumbItems = [
    { label: isKids ? 'Enfant' : 'Femme', href: isKids ? '/kids' : '/women' },
    { label: product.subcategory, href: isKids ? `/kids?sub=${product.subcategory}` : `/women?sub=${product.subcategory}` },
    { label: product.name },
  ];

  // Accordion items: Fabric & Care
  const accordionItems = [
    {
      title: 'Composition & Matière',
      content: (
        <p className="text-sm text-charcoal-600">{product.fabric}</p>
      ),
    },
    {
      title: 'Entretien',
      content: (
        <ul className="space-y-1.5">
          {product.care.map((instruction, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-charcoal-600">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-charcoal-300 shrink-0" />
              {instruction}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Livraison & Retours',
      content: (
        <div className="space-y-2 text-sm text-charcoal-600">
          <p className="flex items-start gap-2"><Truck className="w-4 h-4 shrink-0 mt-0.5 text-charcoal-500" /> Livraison standard sous 2–5 jours ouvrés sur toute la Tunisie.</p>
          <p className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-charcoal-500" /> Retours gratuits acceptés dans les 14 jours suivant la réception en Tunisie.</p>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-14 xl:gap-20 items-start">

          {/* ── 1. IMAGE GALLERY ── */}
          <div className="lg:sticky lg:top-28">
            <ImageGallery
              images={colorImages}
              productName={product.name}
              isKids={isKids}
            />
          </div>

          {/* ── RIGHT COLUMN: All product info ── */}
          <div className="mt-8 lg:mt-0 space-y-6">

            {/* ── 2. Product name & rating badge ── */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <div>
                  {(product.isNew || product.isBestSeller) && (
                    <div className="flex gap-2 mb-2">
                      {product.isNew && (
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${
                          isKids ? 'bg-kids-sage text-white rounded-full' : 'bg-charcoal text-white'
                        }`}>
                          Nouveau
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${
                          isKids ? 'bg-kids-peach-light text-kids-peach rounded-full' : 'bg-cream-200 text-charcoal-700'
                        }`}>
                          Best-seller
                        </span>
                      )}
                    </div>
                  )}

                  <h1 className={`text-2xl sm:text-3xl font-medium leading-tight text-charcoal ${
                    isKids ? 'font-kids font-bold' : 'font-serif'
                  }`}>
                    {product.name}
                  </h1>

                  <p className="text-xs text-charcoal-500 mt-1 uppercase tracking-wider">
                    {product.subcategory}
                    {isKids && product.ageGroup && ` · ${product.ageGroup}`}
                  </p>
                </div>

                {/* Wishlist toggle */}
                <button
                  type="button"
                  onClick={handleWishlist}
                  aria-label={isWishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full border border-border hover:border-charcoal transition focus:outline-hidden"
                >
                  <Heart className={`w-5 h-5 transition-colors ${
                    isWishlisted ? 'fill-sale text-sale' : 'text-charcoal'
                  }`} />
                </button>
              </div>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(product.rating!) ? 'text-amber-400' : 'text-charcoal-200'
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-charcoal-500">
                    {product.rating.toFixed(1)} ({product.reviewCount} avis)
                  </span>
                </div>
              )}
            </div>

            {/* ── 3. PRICE ── */}
            <div className="flex items-baseline gap-3">
              {product.salePrice ? (
                <>
                  <span className="text-2xl font-bold text-sale">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="text-base text-charcoal-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs font-bold text-white bg-sale px-2 py-0.5 rounded-xs">
                    -{discountPercent}%
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-charcoal">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* ── 4. COLOR SELECTOR ── */}
            {product.colors.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-charcoal mb-2.5">
                  Couleur :{' '}
                  <span className="font-normal normal-case tracking-normal text-charcoal-600">
                    {selectedColor.name}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((color) => {
                    const isSelected = color.name === selectedColor.name;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        title={color.name}
                        aria-label={`Couleur ${color.name}`}
                        aria-pressed={isSelected}
                        className={`w-8 h-8 rounded-full border-2 transition-all focus:outline-hidden ${
                          isSelected
                            ? isKids
                              ? 'border-kids-peach ring-2 ring-kids-peach ring-offset-2 scale-110'
                              : 'border-charcoal ring-2 ring-charcoal ring-offset-2 scale-110'
                            : 'border-transparent hover:scale-105 hover:border-charcoal-300'
                        }`}
                        style={{ backgroundColor: color.hex, boxShadow: '0 0 0 1px rgba(0,0,0,0.1) inset' }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── 5 & 6. SIZE SELECTOR + out-of-stock crossed out ── */}
            <div id="size-selector">
              <div className="flex items-center justify-between mb-2.5">
                <p className={`text-xs uppercase tracking-wider font-semibold text-charcoal ${sizeError ? 'text-sale' : ''}`}>
                  Taille {selectedSize && <span className="font-normal normal-case tracking-normal text-charcoal-600">: {selectedSize}</span>}
                  {sizeError && <span className="ml-1 font-normal normal-case text-sale">— Veuillez sélectionner une taille</span>}
                </p>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className={`flex items-center gap-1 text-xs underline underline-offset-2 transition ${
                    isKids ? 'text-kids-peach hover:text-kids-peach/70' : 'text-charcoal-500 hover:text-charcoal'
                  }`}
                >
                  <Ruler className="w-3.5 h-3.5" />
                  Trouver ma taille
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => {
                  const isSelected = selectedSize === s.size;
                  const oos = !s.inStock;

                  return (
                    <button
                      key={s.size}
                      type="button"
                      disabled={oos}
                      onClick={() => {
                        if (!oos) {
                          setSelectedSize(s.size);
                          setSizeError(false);
                        }
                      }}
                      aria-pressed={isSelected}
                      aria-label={oos ? `${s.size} — Rupture de stock` : `Taille ${s.size}`}
                      className={`relative min-w-[48px] h-11 px-3 text-sm transition-all focus:outline-hidden flex items-center justify-center ${
                        isKids ? 'rounded-xl' : 'rounded-xs'
                      } ${
                        isSelected
                          ? isKids
                            ? 'bg-kids-peach text-white font-bold shadow-sm'
                            : 'bg-charcoal text-white font-semibold shadow-sm'
                          : oos
                          ? 'border border-dashed border-charcoal-200 text-charcoal-300 cursor-not-allowed line-through bg-charcoal-50/50'
                          : sizeError
                          ? 'border border-sale/50 text-charcoal hover:border-charcoal bg-white'
                          : 'border border-border text-charcoal hover:border-charcoal bg-white'
                      }`}
                    >
                      {s.size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── 7. ADD TO CART BUTTON ── */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-3 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all shadow-subtle active:scale-[0.98] focus:outline-hidden ${
                isKids
                  ? 'bg-kids-peach hover:bg-kids-peach/90 rounded-2xl'
                  : 'bg-charcoal hover:bg-charcoal-800 rounded-xs'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              Ajouter au panier
            </button>

            {/* ── 8. RETURN POLICY ── */}
            <p className="flex items-center justify-center gap-1.5 text-xs text-charcoal-500 -mt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-charcoal-400 shrink-0" />
              Retours gratuits sous 14 jours sur toute la Tunisie
            </p>

            {/* ── 9. PRODUCT DESCRIPTION ── */}
            <div className="pt-1 border-t border-border">
              <p className="text-sm text-charcoal-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* ── 10. FABRIC & CARE ACCORDION ── */}
            <div className="border-t border-border pt-1">
              <Accordion items={accordionItems} isKids={isKids} />
            </div>

            {/* ── 11. CUSTOMER REVIEWS PREVIEW ── */}
            {product.rating && product.reviewCount && (
              <div className="border-t border-border pt-5">
                <h2 className={`text-sm font-semibold text-charcoal mb-3 ${isKids ? 'font-kids' : ''}`}>
                  Avis clients
                </h2>

                {/* Summary bar */}
                <div className="flex items-center gap-4 p-4 bg-cream-50 rounded-xs mb-4">
                  <div className="text-center">
                    <span className="block text-3xl font-bold text-charcoal">{product.rating.toFixed(1)}</span>
                    <div className="flex justify-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className={`w-3.5 h-3.5 ${i < Math.round(product.rating!) ? 'text-amber-400' : 'text-charcoal-200'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs text-charcoal-400 mt-1">{product.reviewCount} avis</p>
                  </div>

                  {/* Mock rating bars */}
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct = star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1;
                      return (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-[10px] text-charcoal-400 w-4 text-right shrink-0">{star}</span>
                          <div className="flex-1 h-1.5 bg-charcoal-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-400 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-charcoal-400 w-6 shrink-0">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sample review */}
                <div className="p-4 border border-border rounded-xs">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-xs font-semibold text-charcoal">Amel B. — Tunis</p>
                      <div className="flex gap-0.5 mt-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} className="w-3 h-3 text-amber-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span className="text-[11px] text-charcoal-400">Il y a 3 jours</span>
                  </div>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    Qualité exceptionnelle, la matière est vraiment douce et le tombé est parfait.
                    La taille est fidèle au guide. Très satisfaite de mon achat, je recommande !
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── MOBILE STICKY ACTION BAR (< md) ── */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white border-t border-border shadow-floating px-4 py-3 safe-area-inset-bottom">
        <div className="flex items-center gap-3">
          {/* Price summary */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1.5">
              {product.salePrice ? (
                <>
                  <span className="text-base font-bold text-sale">{formatPrice(product.salePrice)}</span>
                  <span className="text-xs text-charcoal-400 line-through">{formatPrice(product.price)}</span>
                </>
              ) : (
                <span className="text-base font-bold text-charcoal">{formatPrice(product.price)}</span>
              )}
            </div>
            <p className="text-[11px] text-charcoal-400 truncate">
              {selectedColor.name}
              {selectedSize ? ` · ${selectedSize}` : ' · Sélectionnez une taille'}
            </p>
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`shrink-0 flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white transition-all active:scale-95 focus:outline-hidden ${
              isKids
                ? 'bg-kids-peach hover:bg-kids-peach/90 rounded-2xl'
                : 'bg-charcoal hover:bg-charcoal-800 rounded-xs'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Ajouter
          </button>
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        variant={product.category}
      />
    </>
  );
}

