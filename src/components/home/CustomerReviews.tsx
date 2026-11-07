'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, MessageSquareQuote, CheckCircle2, ExternalLink } from 'lucide-react';
import { CustomerReview, FeaturableWidgetData } from '@/types/review';

interface CustomerReviewsProps {
  initialData: FeaturableWidgetData;
}

export function CustomerReviews({ initialData }: CustomerReviewsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

  const reviews = initialData?.reviews || [];
  const averageRating = initialData?.averageRating ?? 4.9;
  const totalReviews = initialData?.totalReviewCount ?? reviews.length;
  const profileUrl = initialData?.profileUrl || 'https://search.google.com/local/writereview?placeid=ChIJS2uvYgAz_RIR2CCuMW4M3YQ';

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const cardWidth = 340;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  const toggleExpand = (reviewId: string) => {
    setExpandedMap((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const getInitials = (name: string) => {
    if (!name) return 'TT';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat('fr-FR', {
        month: 'short',
        year: 'numeric',
      }).format(date);
    } catch {
      return '';
    }
  };

  return (
    <section className="py-20 bg-[#FBF9F5] border-t border-border/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border/80 rounded-full text-[11px] font-medium tracking-wider uppercase text-charcoal-700 shadow-2xs">
              <span className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
              </span>
              <span>{averageRating.toFixed(1)} / 5</span>
              <span className="text-charcoal-300">•</span>
              <span className="text-charcoal-500 font-sans">{totalReviews} Avis Google</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-0.5" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-charcoal tracking-tight">
              Ce que disent nos clientes
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 max-w-xl font-sans">
              La satisfaction et l&apos;élégance de notre communauté sont au cœur de chaque pièce confectionnée chez Top Tendance.
            </p>
          </div>

          {/* Actions & Navigation Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xs bg-white border border-border/80 text-xs font-semibold tracking-wider uppercase text-charcoal hover:bg-cream hover:border-charcoal/40 transition shadow-2xs"
            >
              <span>Donner votre avis</span>
              <ExternalLink className="w-3.5 h-3.5 text-charcoal-400" />
            </a>

            <div className="flex items-center gap-1.5 ml-2">
              <button
                onClick={() => scroll('left')}
                aria-label="Avis précédents"
                className="w-10 h-10 rounded-full bg-white border border-border/80 flex items-center justify-center text-charcoal hover:border-charcoal/60 hover:bg-cream transition shadow-2xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="Avis suivants"
                className="w-10 h-10 rounded-full bg-white border border-border/80 flex items-center justify-center text-charcoal hover:border-charcoal/60 hover:bg-cream transition shadow-2xs cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel / Cards Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviews.map((review: CustomerReview) => {
            const isExpanded = expandedMap[review.reviewId] || false;
            const isLong = review.comment.length > 170;
            const displayComment = isLong && !isExpanded
              ? `${review.comment.slice(0, 170)}...`
              : review.comment;

            return (
              <div
                key={review.reviewId}
                className="snap-start shrink-0 w-[300px] sm:w-[350px] bg-white border border-border/70 rounded-xs p-6 flex flex-col justify-between shadow-xs hover:border-charcoal/30 hover:shadow-sm transition-all duration-300"
              >
                <div>
                  {/* Card Header: Avatar + Name + Rating */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden bg-cream flex items-center justify-center text-xs font-semibold text-charcoal border border-border/60 shrink-0">
                        {review.reviewer?.profilePhotoUrl ? (
                          <Image
                            src={review.reviewer.profilePhotoUrl}
                            alt={review.reviewer.displayName}
                            fill
                            sizes="44px"
                            className="object-cover"
                            onError={(e) => {
                              // Fallback on image error
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : null}
                        <span>{getInitials(review.reviewer?.displayName)}</span>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-charcoal leading-tight">
                          {review.reviewer?.displayName || 'Cliente vérifiée'}
                        </h3>
                        <p className="text-[11px] text-charcoal-400 mt-0.5">
                          {formatDate(review.createTime)} • Avis Google
                        </p>
                      </div>
                    </div>

                    <MessageSquareQuote className="w-5 h-5 text-charcoal-200 shrink-0" />
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.starRating
                            ? 'fill-amber-400 stroke-amber-500'
                            : 'fill-transparent stroke-charcoal-200'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment Text */}
                  <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-sans whitespace-pre-line">
                    &ldquo;{displayComment}&rdquo;
                  </p>

                  {isLong && (
                    <button
                      onClick={() => toggleExpand(review.reviewId)}
                      className="text-[11px] font-semibold text-charcoal hover:underline mt-2 cursor-pointer"
                    >
                      {isExpanded ? 'Réduire' : 'Lire la suite'}
                    </button>
                  )}
                </div>

                {/* Owner Reply Note */}
                {review.reviewReply && (
                  <div className="mt-5 pt-4 border-t border-border/50 bg-[#FBF9F5]/80 -mx-6 -mb-6 p-4 rounded-b-xs">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-700 mb-1">
                      Réponse de Top Tendance
                    </p>
                    <p className="text-[11px] text-charcoal-500 line-clamp-2 italic">
                      &ldquo;{review.reviewReply.comment}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

