'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
  isKids?: boolean;
}

export function ImageGallery({ images, productName, isKids = false }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const mainImageRef = useRef<HTMLDivElement>(null);

  // Mobile swipe
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const validImages = images.filter(Boolean);
  const total = validImages.length;

  const goTo = useCallback((index: number) => {
    setActiveIndex(Math.max(0, Math.min(index, total - 1)));
  }, [total]);

  const prev = () => goTo(activeIndex - 1);
  const next = () => goTo(activeIndex + 1);

  // Desktop zoom mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current) return;
    const rect = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 40) {
      if (delta > 0 && activeIndex < total - 1) next();
      if (delta < 0 && activeIndex > 0) prev();
    }
  };

  return (
    <>
      <div className="w-full">
        {/* ── DESKTOP LAYOUT: Thumbnails left + Large main image ── */}
        <div className="hidden md:flex gap-3">
          {/* Thumbnail strip */}
          {total > 1 && (
            <div className="flex flex-col gap-2 w-16 lg:w-20 shrink-0">
              {validImages.map((src, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-label={`Image ${idx + 1}`}
                  className={`relative aspect-[3/4] w-full overflow-hidden border-2 transition-all focus:outline-hidden ${
                    isKids ? 'rounded-xl' : 'rounded-xs'
                  } ${
                    idx === activeIndex
                      ? isKids
                        ? 'border-kids-peach'
                        : 'border-charcoal'
                      : 'border-transparent hover:border-charcoal-300'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${productName} — vue ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main image with zoom */}
          <div className="flex-1 relative">
            <div
              ref={mainImageRef}
              className={`relative aspect-[3/4] w-full overflow-hidden bg-cream-100 cursor-zoom-in select-none ${
                isKids ? 'rounded-2xl' : 'rounded-xs'
              }`}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={validImages[activeIndex]}
                alt={`${productName} — image principale`}
                fill
                sizes="(max-width: 1280px) 55vw, 700px"
                priority
                className={`object-cover object-center transition-transform duration-300 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }
                    : undefined
                }
              />

              {/* Zoom indicator */}
              {!isZoomed && (
                <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-xs rounded-full p-1.5 pointer-events-none">
                  <ZoomIn className="w-4 h-4 text-charcoal-600" />
                </div>
              )}
            </div>

            {/* Arrow navigation */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  disabled={activeIndex === 0}
                  aria-label="Image précédente"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 shadow-subtle hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition focus:outline-hidden"
                >
                  <ChevronLeft className="w-5 h-5 text-charcoal" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={activeIndex === total - 1}
                  aria-label="Image suivante"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 shadow-subtle hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition focus:outline-hidden"
                >
                  <ChevronRight className="w-5 h-5 text-charcoal" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* ── MOBILE LAYOUT: Touch-swipeable carousel ── */}
        <div className="md:hidden">
          <div
            className={`relative aspect-[3/4] w-full overflow-hidden bg-cream-100 ${
              isKids ? 'rounded-2xl' : 'rounded-xs'
            }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {validImages.map((src, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-300 ${
                  idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <Image
                  src={src}
                  alt={`${productName} — vue ${idx + 1}`}
                  fill
                  sizes="100vw"
                  priority={idx === 0}
                  className="object-cover object-center"
                />
              </div>
            ))}

            {/* Mobile navigation arrows */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  disabled={activeIndex === 0}
                  aria-label="Image précédente"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-xs disabled:opacity-30 disabled:cursor-not-allowed transition focus:outline-hidden"
                >
                  <ChevronLeft className="w-4 h-4 text-charcoal" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={activeIndex === total - 1}
                  aria-label="Image suivante"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-xs disabled:opacity-30 disabled:cursor-not-allowed transition focus:outline-hidden"
                >
                  <ChevronRight className="w-4 h-4 text-charcoal" />
                </button>
              </>
            )}

            {/* Pagination dots */}
            {total > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
                {validImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goTo(idx)}
                    aria-label={`Aller à l'image ${idx + 1}`}
                    className={`transition-all rounded-full focus:outline-hidden ${
                      idx === activeIndex
                        ? isKids
                          ? 'w-5 h-2 bg-kids-peach'
                          : 'w-5 h-2 bg-charcoal'
                        : 'w-2 h-2 bg-white/70'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Image counter */}
            <div className="absolute top-3 right-3 z-20 bg-charcoal/60 backdrop-blur-xs text-white text-xs px-2 py-0.5 rounded-full">
              {activeIndex + 1}/{total}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

