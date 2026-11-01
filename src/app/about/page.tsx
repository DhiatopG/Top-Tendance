import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Heart, Shield, Award } from 'lucide-react';

export const metadata = {
  title: 'À Propos | Maison Top Tendance Tunisie',
  description: "Découvrez l'histoire, la vision et l'artisanat derrière la Maison Top Tendance en Tunisie.",
};

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-charcoal-500 mb-3 block">
            Maison Tunisienne Fondée en 2021
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal leading-tight mb-6">
            L&apos;élégance du lin, la douceur de l&apos;enfance.
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
            Top Tendance est née d&apos;un désir simple : réconcilier le prêt-à-porter contemporain avec les matières nobles et respirantes de la Méditerranée, pour les femmes modernes et les enfants épris de liberté.
          </p>
        </div>

        {/* Feature Grid with Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative aspect-4/5 rounded-xs overflow-hidden border border-border bg-white shadow-xs">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
              alt="Atelier Top Tendance"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-charcoal-500 font-semibold">
              Notre Démarche
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-charcoal">
              Un artisanat exigeant pensé pour le climat tunisien
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
              Chaque pièce est dessinée avec l&apos;amour des lignes nettes et de la fluidité naturelle. Nous privilégions les fibres pures : le lin européen certifié, le coton biologique peigné et la laine froide légère.
            </p>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
              Pour notre ligne enfant, le confort et la peau délicate de vos tout-petits guident chaque choix : finitions sans couture agressive, boutons en nacre ou en bois naturel, et coupes adaptées à leurs mouvements spontanés.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border">
              <div>
                <span className="text-2xl font-serif text-charcoal block">100%</span>
                <span className="text-xs text-charcoal-500">Matières naturelles et certifiées</span>
              </div>
              <div>
                <span className="text-2xl font-serif text-charcoal block">24/48h</span>
                <span className="text-xs text-charcoal-500">Livraison soignée partout en Tunisie</span>
              </div>
            </div>
          </div>
        </div>

        {/* Values pillars */}
        <div className="border-t border-border pt-16 mb-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl font-serif text-charcoal">Nos Piliers Fondateurs</h2>
            <p className="text-xs text-charcoal-500 mt-2">Ce qui rend chaque création Top Tendance unique</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 border border-border rounded-xs text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-cream mx-auto flex items-center justify-center text-charcoal">
                <Sparkles className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-base text-charcoal">Matières Nobles</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Lin lavé européen, popelines de coton douces et mailles hypoallergéniques choisies pour durer saison après saison.
              </p>
            </div>

            <div className="bg-white p-6 border border-border rounded-xs text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-cream mx-auto flex items-center justify-center text-charcoal">
                <Heart className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-base text-charcoal">Douceur Enfantine</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Une garde-robe poétique pensée dès la naissance (0-12m) jusqu&apos;à 12 ans, respectueuse des peaux les plus sensibles.
              </p>
            </div>

            <div className="bg-white p-6 border border-border rounded-xs text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-cream mx-auto flex items-center justify-center text-charcoal">
                <Award className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-base text-charcoal">Proximité Locale</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Une présence physique à Rue El Hidaya, Ariana, et un service client local dévoué au 52 293 651 joignable 6j/7.
              </p>
            </div>
          </div>
        </div>

        {/* CTA banner */}
        <div className="bg-charcoal text-white rounded-xs p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl font-serif">Rejoignez l&apos;univers Top Tendance</h2>
          <p className="text-xs sm:text-sm text-charcoal-300 max-w-md mx-auto">
            Découvrez nos nouvelles collections inspirées par la beauté brute du lin et des teintes méditerranéennes.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/women"
              className="px-6 py-3 bg-white text-charcoal text-xs uppercase tracking-widest font-semibold hover:bg-cream transition"
            >
              Collection Femme
            </Link>
            <Link
              href="/kids"
              className="px-6 py-3 border border-white text-white text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-charcoal transition"
            >
              Collection Enfant
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

