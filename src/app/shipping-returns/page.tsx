import React from 'react';
import Link from 'next/link';
import { Truck, RotateCcw, Clock, ShieldCheck, HelpCircle } from 'lucide-react';
import { formatPrice } from '@/utils/currency';

export const metadata = {
  title: 'Livraison & Retours | Top Tendance Tunisie',
  description: "Découvrez notre politique de livraison rapide en Tunisie et nos conditions d'échange et retour 14 jours.",
};

const GOVERNORATE_DELIVERY = [
  { region: 'Grand Tunis', governorates: 'Tunis, Ariana, Ben Arous, La Manouba', delay: '24h à 48h', cost: '7.000 TND (Offert dès 200 TND)' },
  { region: 'Nord & Cap Bon', governorates: 'Bizerte, Nabeul, Béja, Zaghouan', delay: '24h à 48h', cost: '7.000 TND (Offert dès 200 TND)' },
  { region: 'Sahel & Centre', governorates: 'Sousse, Monastir, Mahdia, Sfax, Kairouan', delay: '48h', cost: '7.000 TND (Offert dès 200 TND)' },
  { region: 'Nord-Ouest & Centre-Ouest', governorates: 'Jendouba, Le Kef, Siliana, Kasserine, Sidi Bouzid', delay: '48h à 72h', cost: '7.000 TND (Offert dès 200 TND)' },
  { region: 'Sud Tunisien', governorates: 'Gabès, Médenine, Tataouine, Gafsa, Tozeur, Kébili', delay: '48h à 72h', cost: '7.000 TND (Offert dès 200 TND)' },
];

export default function ShippingReturnsPage() {
  return (
    <div className="bg-cream min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-charcoal-500 mb-2 block">
            Engagements Top Tendance
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-charcoal mb-3">
            Livraison & Retours
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600">
            Une expédition soignée, rapide et sécurisée sur l&apos;ensemble des 24 gouvernorats tunisiens.
          </p>
        </div>

        {/* Section 1: Shipping */}
        <div className="bg-white border border-border rounded-xs p-6 sm:p-8 shadow-xs mb-10 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-charcoal">
              <Truck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h2 className="text-lg font-serif text-charcoal">
                1. Modalités & Délais de Livraison en Tunisie
              </h2>
              <p className="text-xs text-charcoal-500">
                Livraison à domicile assurée par des livreurs certifiés.
              </p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-charcoal-700 leading-relaxed space-y-3">
            <p>
              Toutes nos commandes sont préparées dans notre atelier à Tunis avec le plus grand soin. Les articles sont emballés dans du papier de soie protecteur pour préserver la qualité des matières.
            </p>
            <div className="p-4 bg-cream rounded-xs border border-border">
              <p className="font-semibold text-charcoal">
                🌟 Offre permanente : La livraison est 100% GRATUITE pour toute commande égale ou supérieure à {formatPrice(200)} !
              </p>
              <p className="text-xs text-charcoal-500 mt-1">
                Pour les commandes inférieures à 200 TND, un forfait unique de 7.000 TND s&apos;applique à toute la Tunisie.
              </p>
            </div>
          </div>

          {/* Table of delivery times by governorates */}
          <div className="mt-6">
            <h3 className="text-xs uppercase font-semibold tracking-wider text-charcoal mb-3">
              Délais indicatifs par gouvernorat :
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-border">
                <thead className="bg-linen/50 text-charcoal font-semibold border-b border-border">
                  <tr>
                    <th className="p-3">Région</th>
                    <th className="p-3">Gouvernorats couverts</th>
                    <th className="p-3">Délai estimé</th>
                    <th className="p-3">Tarif</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {GOVERNORATE_DELIVERY.map((row, idx) => (
                    <tr key={idx} className="hover:bg-cream/40 transition">
                      <td className="p-3 font-semibold text-charcoal">{row.region}</td>
                      <td className="p-3 text-charcoal-600">{row.governorates}</td>
                      <td className="p-3 text-charcoal">{row.delay}</td>
                      <td className="p-3 text-charcoal-600 font-medium">{row.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 2: Returns & Exchanges */}
        <div className="bg-white border border-border rounded-xs p-6 sm:p-8 shadow-xs mb-10 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-charcoal">
              <RotateCcw className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h2 className="text-lg font-serif text-charcoal">
                2. Politique d&apos;Échanges & Retours (14 Jours)
              </h2>
              <p className="text-xs text-charcoal-500">
                Vous avez le droit de changer d&apos;avis ou d&apos;échanger de taille en toute sérénité.
              </p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-charcoal-700 leading-relaxed space-y-4">
            <p>
              Si une pièce ne vous convient pas ou si vous souhaitez changer de taille, vous disposez d&apos;un délai de <strong>14 jours calendaires</strong> à compter de la réception de votre colis pour demander un échange ou un remboursement.
            </p>

            <h3 className="font-serif text-sm text-charcoal">Conditions pour accepter un retour :</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-charcoal-600">
              <li>L&apos;article doit être neuf, non porté, non lavé et dans son emballage d&apos;origine.</li>
              <li>Toutes les étiquettes de marque et de composition doivent être intactes et attachées au vêtement.</li>
              <li>Pour les bodies et sous-vêtements bébé/enfant, les articles doivent demeurer sous blister scellé pour des raisons d&apos;hygiène.</li>
            </ul>

            <h3 className="font-serif text-sm text-charcoal pt-2">Comment effectuer un retour ?</h3>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-charcoal-600">
              <li>Contactez notre service client par téléphone au <strong>+216 52 293 651</strong> ou via WhatsApp au <strong>+216 52 293 651</strong> avec votre numéro de commande.</li>
              <li>Nous programmons un livreur qui passera récupérer votre colis directement à votre adresse.</li>
              <li>Dès réception et inspection de l&apos;article, nous expédions la nouvelle taille ou procédons au remboursement selon votre souhait.</li>
            </ol>
          </div>
        </div>

        {/* Section 3: Need Help FAQ */}
        <div className="bg-linen/40 border border-border rounded-xs p-6 sm:p-8 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-white shadow-xs mx-auto flex items-center justify-center text-charcoal">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base text-charcoal">Une question spécifique sur votre livraison ?</h3>
          <p className="text-xs text-charcoal-600 max-w-md mx-auto">
            Notre service client est à votre disposition du Lundi au Samedi pour répondre à vos demandes de suivi.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-block px-6 py-2.5 bg-charcoal text-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-charcoal-800 transition"
            >
              Contactez-nous
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

