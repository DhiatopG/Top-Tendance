'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Product } from '@/types/product';
import { formatPrice, getDiscountPercentage } from '@/utils/currency';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';

interface ProductCardProps {
  product: Product;
  variant?: 'women' | 'kids';
  priority?: boolean;
}

export function ProductCard({
  product,
  variant,
  priority = false,
}: ProductCardProps) {
  const cardVariant = variant || product.category;
  const isKids = cardVariant === 'kids';

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const isWishlisted = isInWishlist(product.id);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  // Auto-cycle state for mobile viewports
  const [isMobileAlt, setIsMobileAlt] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const primaryImageIndex = activeColor?.imageIndex ?? 0;
  const primaryImage = product.images[primaryImageIndex] || product.images[0];

  // Pick secondary image for hover/auto-cycle effect
  const secondaryImage =
    product.images[primaryImageIndex + 1] ||
    (primaryImageIndex !== 1 && product.images[1]) ||
    primaryImage;

  const hasSecondaryImage = secondaryImage && secondaryImage !== primaryImage;
  const discountPercent = product.salePrice
    ? getDiscountPercentage(product.price, product.salePrice)
    : 0;

  // Viewport observer to only run auto-cycle when card is on-screen
  useEffect(() => {
    if (!hasSecondaryImage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    const currentCard = cardRef.current;
    if (currentCard) observer.observe(currentCard);

    return () => {
      if (currentCard) observer.unobserve(currentCard);
    };
  }, [hasSecondaryImage]);

  // Mobile auto-cycle interval (staggered 3.5s)
  useEffect(() => {
    if (!hasSecondaryImage || !isIntersecting) {
      setIsMobileAlt(false);
      return;
    }

    // Only activate auto-cycle on mobile / touch screen viewports (< 768px)
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    // Stagger based on product id character hash to avoid synchronized flips
    const hash = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const staggerDelay = (hash % 6) * 200; // 0 to 1000ms offset

    let intervalId: NodeJS.Timeout;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setIsMobileAlt((prev) => !prev);
      }, 3500);
    }, staggerDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [hasSecondaryImage, isIntersecting, product.id, selectedColorIndex]);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const wasAdded = toggleWishlist(product);
    if (wasAdded) {
      showToast(`« ${product.name} » ajouté à vos favoris`, 'success');
    } else {
      showToast(`« ${product.name} » retiré de vos favoris`, 'info');
    }
  };

  const handleColorSelect = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedColorIndex(index);
    setIsMobileAlt(false);
  };

  return (
    <article
      ref={cardRef}
      className={`group relative flex flex-col h-full transition-all duration-300 ${
        isKids
          ? 'bg-white rounded-kids p-3 border border-kids-peach/15 hover:shadow-floating hover:border-kids-peach/40'
          : 'bg-white rounded-women hover:shadow-subtle'
      }`}
    >
      {/* Product Image Container */}
      <div
        className={`relative aspect-[3/4] w-full overflow-hidden bg-cream-100 ${
          isKids ? 'rounded-kids' : 'rounded-women'
        }`}
      >
        <Link
          href={`/product/${product.slug}`}
          className="block w-full h-full relative"
          aria-label={`Voir les détails de ${product.name}`}
        >
          {/* Primary Image */}
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className={`object-cover object-center transition-opacity duration-700 ease-in-out md:transition-all md:duration-500 md:ease-out ${
              hasSecondaryImage
                ? isMobileAlt
                  ? 'opacity-0 md:opacity-100 md:group-hover:opacity-0 md:group-hover:scale-105'
                  : 'opacity-100 md:group-hover:opacity-0 md:group-hover:scale-105'
                : 'md:group-hover:scale-105'
            }`}
          />

          {/* Secondary Auto-cycling (Mobile) & Hover (Desktop) Image */}
          {hasSecondaryImage && (
            <Image
              src={secondaryImage}
              alt={`${product.name} - vue alternative`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover object-center transition-opacity duration-700 ease-in-out md:transition-all md:duration-500 md:ease-out ${
                isMobileAlt
                  ? 'opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-hover:scale-105'
                  : 'opacity-0 md:group-hover:opacity-100 md:group-hover:scale-105'
              }`}
            />
          )}

          {/* Discreet Mobile 2-dot indicator */}
          {hasSecondaryImage && (
            <div className="md:hidden absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-charcoal/20 backdrop-blur-xs pointer-events-none">
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  !isMobileAlt ? 'bg-white scale-110' : 'bg-white/40'
                }`}
              />
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isMobileAlt ? 'bg-white scale-110' : 'bg-white/40'
                }`}
              />
            </div>
          )}
        </Link>

        {/* Badges Container (Top Left) */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5 items-start pointer-events-none">
          {product.isNew && (
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 shadow-xs ${
                isKids
                  ? 'bg-kids-sage text-white rounded-full'
                  : 'bg-charcoal text-white rounded-none tracking-widest'
              }`}
            >
              Nouveau
            </span>
          )}

          {discountPercent > 0 && (
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 shadow-xs bg-sale text-white ${
                isKids ? 'rounded-full' : 'rounded-none'
              }`}
            >
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-label={
            isWishlisted
              ? `Retirer ${product.name} des favoris`
              : `Ajouter ${product.name} aux favoris`
          }
          className="absolute top-2.5 right-2.5 z-10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-xs text-charcoal shadow-sm hover:bg-white hover:scale-110 active:scale-95 transition-all focus:outline-hidden"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted
                ? 'fill-sale text-sale stroke-sale'
                : 'text-charcoal hover:text-sale'
            }`}
          />
        </button>

        {/* Stock Badge if low stock */}
        {product.sizes.some((s) => s.stockCount !== undefined && s.stockCount > 0 && s.stockCount <= 3) && (
          <div className="absolute bottom-2 left-2 z-10">
            <span className="text-[10px] font-medium bg-charcoal/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-xs">
              Stock limité
            </span>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className={`flex flex-col flex-1 pt-3 ${isKids ? 'px-1' : ''}`}>
        {/* Category / Subcategory */}
        <div className="flex items-center justify-between text-[11px] text-charcoal-400 mb-1">
          <span className="uppercase tracking-wider truncate">
            {product.subcategory}
          </span>
          {isKids && product.ageGroup && (
            <span className="px-1.5 py-0.2 bg-kids-peach-light text-kids-peach text-[10px] font-bold rounded-full">
              {product.ageGroup}
            </span>
          )}
        </div>

        {/* Product Title */}
        <Link
          href={`/product/${product.slug}`}
          className="group/title block mb-1.5 focus:outline-hidden"
        >
          <h3
            className={`text-sm line-clamp-1 transition-colors ${
              isKids
                ? 'font-kids font-semibold text-charcoal group-hover/title:text-kids-peach'
                : 'font-serif text-charcoal-900 group-hover/title:text-charcoal-600'
            }`}
            title={product.name}
          >
            {product.name}
          </h3>
        </Link>

        {/* Price Display */}
        <div className="flex items-baseline gap-2 mb-2.5">
          {product.salePrice ? (
            <>
              <span className="text-sm sm:text-base font-semibold text-sale">
                {formatPrice(product.salePrice)}
              </span>
              <span className="text-xs text-charcoal-400 line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-sm sm:text-base font-semibold text-charcoal">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Color Swatches (Clickable to switch photo) */}
        {product.colors && product.colors.length > 0 && (
          <div className="mt-auto pt-1 flex items-center gap-1.5 flex-wrap">
            {product.colors.map((color, index) => {
              const isSelected = index === selectedColorIndex;
              return (
                <button
                  key={`${product.id}-color-${color.name}-${index}`}
                  type="button"
                  onClick={(e) => handleColorSelect(e, index)}
                  title={color.name}
                  aria-label={`Sélectionner la couleur ${color.name}`}
                  className="relative p-1 -m-0.5 flex items-center justify-center focus:outline-hidden rounded-full min-w-[28px] min-h-[28px]"
                >
                  <span
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-black/10 transition-all ${
                      isSelected
                        ? isKids
                          ? 'ring-2 ring-kids-peach ring-offset-1 scale-110'
                          : 'ring-2 ring-charcoal ring-offset-1 scale-110'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                  {isSelected && (
                    <span className="sr-only">({color.name} sélectionné)</span>
                  )}
                </button>
              );
            })}
            {product.colors.length > 1 && (
              <span className="text-[11px] text-charcoal-400 ml-0.5">
                {product.colors[selectedColorIndex]?.name}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

