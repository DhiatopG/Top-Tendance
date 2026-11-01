'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product, KidsAgeGroup } from '@/types/product';
import { CatalogView } from './CatalogView';
import { Sparkles, Heart, Baby, Smile, Users, Compass } from 'lucide-react';

interface KidsCatalogClientProps {
  initialProducts: Product[];
}

const AGE_TABS: {
  id: KidsAgeGroup | 'all';
  label: string;
  subLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'all',
    label: 'Tous les âges',
    subLabel: 'De 0 à 12 ans',
    icon: Sparkles,
  },
  {
    id: '0-12m',
    label: 'Bébé & Naissance',
    subLabel: '0 - 12 mois',
    icon: Baby,
  },
  {
    id: '1-3y',
    label: 'Tout-Petits',
    subLabel: '1 - 3 ans',
    icon: Smile,
  },
  {
    id: '4-7y',
    label: 'Petits Enfants',
    subLabel: '4 - 7 ans',
    icon: Users,
  },
  {
    id: '8-12y',
    label: 'Juniors',
    subLabel: '8 - 12 ans',
    icon: Compass,
  },
];

export function KidsCatalogClient({ initialProducts }: KidsCatalogClientProps) {
  const searchParams = useSearchParams();
  const urlAge = searchParams.get('age') as KidsAgeGroup | null;

  const validAge = urlAge && ['0-12m', '1-3y', '4-7y', '8-12y'].includes(urlAge)
    ? urlAge
    : 'all';

  const [activeAgeGroup, setActiveAgeGroup] = useState<KidsAgeGroup | 'all'>(validAge);

  // Compute counts per age group
  const ageCounts = React.useMemo(() => {
    const counts: Record<string, number> = { all: initialProducts.length };
    initialProducts.forEach((p) => {
      if (p.ageGroup) {
        counts[p.ageGroup] = (counts[p.ageGroup] || 0) + 1;
      }
    });
    return counts;
  }, [initialProducts]);

  return (
    <CatalogView
      category="kids"
      initialProducts={initialProducts}
      ageGroup={activeAgeGroup}
      onAgeGroupChange={setActiveAgeGroup}
      headerSlot={
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
          {/* Warmer Pastel Aesthetic Hero Banner */}
          <div className="relative overflow-hidden bg-gradient-to-br from-kids-peach-light/60 via-kids-sage-light/30 to-kids-sky-light/40 border border-kids-peach/25 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-xs border border-kids-peach/30 text-[11px] font-bold tracking-wider uppercase text-kids-peach rounded-full mb-3 shadow-xs font-kids">
                <Heart className="w-3.5 h-3.5 fill-kids-peach text-kids-peach" />
                <span>Vestiaire Enfant Douceur & Jeu</span>
              </div>

              <h1 className="font-kids text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal mb-3">
                Mode Enfant & Bébé
              </h1>

              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed max-w-xl mb-4 font-sans">
                Des matières hypoallergéniques certifiées Oeko-Tex, des coupes
                confortables pensées pour bouger librement et des teintes douces
                inspirées de la nature.
              </p>

              <div className="inline-flex items-center gap-2 text-xs font-medium text-charcoal-700 bg-white/70 px-3 py-1.5 rounded-full border border-kids-sage/20">
                <span className="w-2 h-2 rounded-full bg-kids-sage" />
                <span>Coton biologique & mailles ultra-douces garanties sans grattage</span>
              </div>
            </div>
          </div>

          {/* AGE-FIRST PRIMARY NAVIGATION TABS (0-12m, 1-3y, 4-7y, 8-12y) */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-xs uppercase tracking-wider font-bold text-charcoal-700 font-kids flex items-center gap-1.5">
                <span>Parcourir par tranche d&apos;âge</span>
                <span className="text-kids-peach font-semibold text-[11px]">
                  (Navigation prioritaire)
                </span>
              </h2>
            </div>

            {/* Horizontal Scrollable Tabs */}
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
              {AGE_TABS.map((tab) => {
                const isSelected = activeAgeGroup === tab.id;
                const count = ageCounts[tab.id] ?? 0;
                const IconComponent = tab.icon;

                return (
                  <button
                    key={`age-tab-${tab.id}`}
                    type="button"
                    onClick={() => setActiveAgeGroup(tab.id)}
                    aria-pressed={isSelected}
                    className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition-all duration-200 text-left min-h-[48px] focus:outline-hidden ${
                      isSelected
                        ? 'bg-kids-peach text-white border-kids-peach shadow-md scale-102 font-kids font-bold'
                        : 'bg-white text-charcoal border-kids-peach/20 hover:border-kids-peach/50 hover:bg-kids-peach-light/20'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-kids-peach-light text-kids-peach'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-bold leading-tight flex items-center gap-1.5">
                        <span>{tab.label}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                            isSelected
                              ? 'bg-white/25 text-white'
                              : 'bg-charcoal-100 text-charcoal-600'
                          }`}
                        >
                          {count}
                        </span>
                      </span>
                      <span
                        className={`text-[10px] ${
                          isSelected ? 'text-white/80' : 'text-charcoal-400'
                        }`}
                      >
                        {tab.subLabel}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </header>
      }
    />
  );
}

