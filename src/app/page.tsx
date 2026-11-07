import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Truck, ShieldCheck, Leaf, Scissors, MapPin, Banknote, RotateCcw, Headphones } from 'lucide-react';
import productsData from '@/data/products.json';
import { Product } from '@/types/product';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { HomeNewsletter } from '@/components/home/HomeNewsletter';
import { CustomerReviews } from '@/components/home/CustomerReviews';
import { getCustomerReviews } from '@/utils/reviews';

export default async function Home() {
  const products = productsData as Product[];
  const reviewsData = await getCustomerReviews();
  return (
    <div className="bg-cream min-h-screen">
      {/* 1. Dual Split Hero Section */}
      <section className="relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[550px] lg:min-h-[720px]">
          {/* Left / Femme Wing */}
          <div className="relative group overflow-hidden flex flex-col justify-end p-8 sm:p-12 lg:p-16 text-white min-h-[460px] lg:min-h-[720px]">
            {/* Background Image */}
            <Image
              src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1600&q=85"
              alt="Collection Femme Top Tendance — Lin et Silhouettes Épurées"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top transition duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay for Editorial Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />

            <div className="relative z-10 max-w-lg space-y-4">
              <span className="inline-block text-[11px] uppercase tracking-[0.25em] font-semibold text-white/90 border border-white/30 px-3 py-1 backdrop-blur-xs">
                Collection Femme
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight">
                Élégance Naturelle &amp; Matières Nobles
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans max-w-md">
                L&apos;art du lin pur méditerranéen, des mailles légères et des coupes contemporaines dessinées pour sublimer le quotidien.
              </p>
              <div className="pt-2">
                <Link
                  href="/women"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-charcoal text-xs uppercase tracking-widest font-semibold hover:bg-cream transition group-hover:translate-x-1 duration-300"
                >
                  Découvrir la Collection Femme <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right / Enfant Wing */}
          <div className="relative group overflow-hidden flex flex-col justify-end p-8 sm:p-12 lg:p-16 text-white min-h-[460px] lg:min-h-[720px]">
            {/* Background Image */}
            <Image
              src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1600&q=85"
              alt="Collection Enfant Top Tendance — Douceur et Poésie"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition duration-700 group-hover:scale-105"
            />
            {/* Warm Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent" />

            <div className="relative z-10 max-w-lg space-y-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold text-white bg-kids-peach/90 px-3 py-1 rounded-full backdrop-blur-xs font-kids">
                  <Sparkles className="w-3 h-3" />
                  Univers Enfant (0-12 ans)
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-kids font-bold leading-tight">
                Douceur &amp; Poésie du Quotidien
              </h2>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans max-w-md">
                Trousseau de naissance soigné, cotons biologiques peignés et vêtements confortables conçus pour accompagner chaque aventure.
              </p>
              <div className="pt-2">
                <Link
                  href="/kids"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-kids-peach text-white text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-kids-peach/90 transition group-hover:translate-x-1 duration-300 shadow-md"
                >
                  Découvrir la Collection Enfant <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Seasonal Announcement Bar / Sub-banner */}
        <div className="bg-charcoal text-white border-t border-b border-charcoal-700 py-3.5 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs tracking-wider text-center sm:text-left">
            <div className="flex items-center gap-2.5 justify-center">
              <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Livraison offerte</strong> partout en Tunisie dès 200 TND d&apos;achats
              </span>
            </div>
            <div className="flex items-center gap-2.5 justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Paiement en espèces à la livraison disponible sur les 24 gouvernorats</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Curated Categories Showcase */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-charcoal-500 mb-2 block">
              Sélection Thématique
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-charcoal">
              Nos Univers à Découvrir
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-500 max-w-md">
            Des essentiels intemporels pensés pour la femme moderne et les premiers moments de l&apos;enfance.
          </p>
        </div>

        {/* 5-tile curated category grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {/* Tile 1: Robes en Lin */}
          <Link
            href="/women?subcategory=Robes"
            className="group relative aspect-3/4 rounded-xs overflow-hidden border border-border bg-white shadow-xs block"
          >
            <Image
              src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"
              alt="Robes en Lin Femme"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover object-top transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-white/80 block mb-1">
                Femme
              </span>
              <h4 className="text-sm sm:text-base font-serif font-medium leading-snug">
                Robes en Lin
              </h4>
              <span className="text-[11px] text-white/70 inline-flex items-center gap-1 mt-1 group-hover:translate-x-1 transition duration-300">
                Explorer &rarr;
              </span>
            </div>
          </Link>

          {/* Tile 2: Bébé & Naissance (0-12m) */}
          <Link
            href="/kids?ageGroup=0-12m"
            className="group relative aspect-3/4 rounded-xs overflow-hidden border border-border bg-white shadow-xs block"
          >
            <Image
              src="https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80"
              alt="Bébé & Naissance (0-12m)"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover object-center transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <span className="inline-block text-[10px] uppercase tracking-wider font-semibold bg-kids-peach text-white px-2 py-0.5 rounded-full mb-1 font-kids">
                0 &ndash; 12 mois
              </span>
              <h4 className="text-sm sm:text-base font-kids font-bold leading-snug">
                Bébé &amp; Naissance
              </h4>
              <span className="text-[11px] text-white/80 inline-flex items-center gap-1 mt-1 group-hover:translate-x-1 transition duration-300">
                Découvrir &rarr;
              </span>
            </div>
          </Link>

          {/* Tile 3: Tricots & Mailles Douces */}
          <Link
            href="/women?subcategory=Pulls & Mailles"
            className="group relative aspect-3/4 rounded-xs overflow-hidden border border-border bg-white shadow-xs block"
          >
            <Image
              src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80"
              alt="Tricots & Mailles Douces"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover object-center transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-white/80 block mb-1">
                Femme
              </span>
              <h4 className="text-sm sm:text-base font-serif font-medium leading-snug">
                Tricots &amp; Mailles
              </h4>
              <span className="text-[11px] text-white/70 inline-flex items-center gap-1 mt-1 group-hover:translate-x-1 transition duration-300">
                Explorer &rarr;
              </span>
            </div>
          </Link>

          {/* Tile 4: Ensembles & Salopettes */}
          <Link
            href="/kids?subcategory=Ensembles"
            className="group relative aspect-3/4 rounded-xs overflow-hidden border border-border bg-white shadow-xs block"
          >
            <Image
              src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=800&q=80"
              alt="Ensembles & Salopettes Enfant"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover object-center transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <span className="inline-block text-[10px] uppercase tracking-wider font-semibold bg-kids-sage text-white px-2 py-0.5 rounded-full mb-1 font-kids">
                Enfant
              </span>
              <h4 className="text-sm sm:text-base font-kids font-bold leading-snug">
                Ensembles &amp; Salopettes
              </h4>
              <span className="text-[11px] text-white/80 inline-flex items-center gap-1 mt-1 group-hover:translate-x-1 transition duration-300">
                Découvrir &rarr;
              </span>
            </div>
          </Link>

          {/* Tile 5: Vestes & Blazers Structurés */}
          <Link
            href="/women?subcategory=Vestes & Manteaux"
            className="group relative aspect-3/4 rounded-xs overflow-hidden border border-border bg-white shadow-xs block col-span-2 sm:col-span-1"
          >
            <Image
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80"
              alt="Vestes & Blazers Structurés"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover object-top transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-white/80 block mb-1">
                Femme
              </span>
              <h4 className="text-sm sm:text-base font-serif font-medium leading-snug">
                Vestes &amp; Blazers
              </h4>
              <span className="text-[11px] text-white/70 inline-flex items-center gap-1 mt-1 group-hover:translate-x-1 transition duration-300">
                Explorer &rarr;
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Featured Products Showcase (Interactive Tabs) */}
      <FeaturedProducts products={products} />

      {/* 4. Editorial Storytelling Block ("L'Esprit Top Tendance") */}
      <section className="py-16 sm:py-24 bg-linen/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Visual: Split editorial images */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="relative h-72 sm:h-96 lg:h-[480px] w-full rounded-xs overflow-hidden border border-border shadow-xs">
                <Image
                  src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80"
                  alt="Détail lin et matières naturelles Top Tendance"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="relative h-72 sm:h-96 lg:h-[480px] w-full rounded-xs overflow-hidden border border-border shadow-xs mt-6 sm:mt-10">
                <Image
                  src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80"
                  alt="Atelier et douceur textile enfant"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Right Content: Manifesto & 3 Pillars */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-charcoal-500 mb-2 block">
                  L&apos;Esprit Top Tendance
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-charcoal leading-tight">
                  Conçu à Tunis, inspiré par la Méditerranée
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-sans">
                Chaque vêtement Top Tendance est le fruit d&apos;une réflexion dédiée au confort et à la distinction. Nous célébrons l&apos;authenticité des matières pures qui respirent au fil des saisons, tout en veillant à la douceur absolue nécessaire à la peau délicate de vos enfants.
              </p>

              {/* 3 Micro-pillars */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-cream border border-border flex items-center justify-center text-charcoal shrink-0 mt-0.5">
                    <Leaf className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-charcoal">
                      100% Matières Naturelles
                    </h4>
                    <p className="text-xs text-charcoal-500 mt-0.5">
                      Lin européen certifié, coton peigné biologique et tricots hypoallergéniques.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-cream border border-border flex items-center justify-center text-charcoal shrink-0 mt-0.5">
                    <Scissors className="w-4 h-4 text-charcoal" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-charcoal">
                      Coupes Intemporelles &amp; Finitions Soignées
                    </h4>
                    <p className="text-xs text-charcoal-500 mt-0.5">
                      Des silhouettes épurées conçues pour durer au-delà des tendances éphémères.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-cream border border-border flex items-center justify-center text-charcoal shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-rose-600" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-charcoal">
                      Savoir-Faire &amp; Proximité Locale
                    </h4>
                    <p className="text-xs text-charcoal-500 mt-0.5">
                      Boutique physique Rue El Hidaya, Ariana, et service client dédié joignable au 52 293 651 6j/7.
                    </p>
                  </div>
                </div>
              </div>

              {/* Link to About page */}
              <div className="pt-4 border-t border-border/80">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-charcoal hover:underline group"
                >
                  En savoir plus sur notre histoire
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition duration-200" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Trust & Assurance Strip (Tunisia Focused) */}
      <section className="py-12 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 1. Livraison 24/48h */}
            <div className="flex items-center gap-4 p-4 rounded-xs border border-border/60 bg-cream/30 hover:border-charcoal/30 transition">
              <div className="w-12 h-12 rounded-full bg-white shadow-xs flex items-center justify-center text-charcoal shrink-0">
                <Truck className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Livraison 24/48h
                </h4>
                <p className="text-xs text-charcoal-500 mt-1">
                  Partout en Tunisie, offerte dès 200 TND d&apos;achats.
                </p>
              </div>
            </div>

            {/* 2. Paiement à la Livraison */}
            <div className="flex items-center gap-4 p-4 rounded-xs border border-border/60 bg-cream/30 hover:border-charcoal/30 transition">
              <div className="w-12 h-12 rounded-full bg-white shadow-xs flex items-center justify-center text-emerald-700 shrink-0">
                <Banknote className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Paiement à la Livraison
                </h4>
                <p className="text-xs text-charcoal-500 mt-1">
                  Réglez en espèces directement auprès du livreur.
                </p>
              </div>
            </div>

            {/* 3. Échanges & Retours 14 Jours */}
            <div className="flex items-center gap-4 p-4 rounded-xs border border-border/60 bg-cream/30 hover:border-charcoal/30 transition">
              <div className="w-12 h-12 rounded-full bg-white shadow-xs flex items-center justify-center text-charcoal shrink-0">
                <RotateCcw className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Échanges 14 Jours
                </h4>
                <p className="text-xs text-charcoal-500 mt-1">
                  Procédure simplifiée avec reprise à domicile.
                </p>
              </div>
            </div>

            {/* 4. Service Client Tunisien */}
            <div className="flex items-center gap-4 p-4 rounded-xs border border-border/60 bg-cream/30 hover:border-charcoal/30 transition">
              <div className="w-12 h-12 rounded-full bg-white shadow-xs flex items-center justify-center text-sky-700 shrink-0">
                <Headphones className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Assistance Locale
                </h4>
                <p className="text-xs text-charcoal-500 mt-1">
                  Conseillers joignables par WhatsApp &amp; tél 6j/7.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Customer Reviews Section */}
      <CustomerReviews initialData={reviewsData} />

      {/* 7. Newsletter / VIP Club Callout */}
      <HomeNewsletter />
    </div>
  );
}
