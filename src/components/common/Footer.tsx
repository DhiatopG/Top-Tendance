'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle2, Phone, MapPin, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Veuillez entrer une adresse email valide', 'error');
      return;
    }
    setIsSubscribed(true);
    showToast('Merci ! Vous recevrez 10% de réduction par email.', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-cream text-charcoal border-t border-border mt-auto">
      {/* Guarantees Strip */}
      <div className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-charcoal shrink-0">
                <Truck className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-charcoal uppercase tracking-wider font-sans">
                  Livraison 24/48h en Tunisie
                </h4>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  Partout en Tunisie, offerte dès 200 TND d'achat
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-charcoal shrink-0">
                <RefreshCw className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-charcoal uppercase tracking-wider font-sans">
                  Échanges & Retours 14 Jours
                </h4>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  Procédure simple et retour sans tracas
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-charcoal shrink-0">
                <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-charcoal uppercase tracking-wider font-sans">
                  Paiement à la Livraison
                </h4>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  Réglez en espèces directement auprès du livreur
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Presentation */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl tracking-[0.2em] font-medium text-charcoal">
                Top Tendance
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-charcoal-600 max-w-sm">
              Maison de prêt-à-porter tunisienne célébrant l'élégance naturelle de la femme
              et la douceur poétique de l'enfance. Des matières nobles, des coupes intemporelles
              et un savoir-faire soigné.
            </p>
            <div className="space-y-1.5 pt-2 text-xs text-charcoal-600">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-charcoal-400 shrink-0" />
                <span>Boutique : Rue El Hidaya, Ariana, Tunisie</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-charcoal-400 shrink-0" />
                <span>Service client : +216 52 293 651 (Lun - Sam, 9h-19h)</span>
              </p>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-charcoal font-sans">
              Boutique
            </h4>
            <ul className="space-y-2 text-xs text-charcoal-600">
              <li>
                <Link href="/women" className="hover:text-charcoal transition">
                  Collection Femme
                </Link>
              </li>
              <li>
                <Link href="/kids" className="hover:text-charcoal transition">
                  Collection Enfant
                </Link>
              </li>
              <li>
                <Link href="/kids?ageGroup=0-12m" className="hover:text-charcoal transition">
                  Bébé & Naissance (0-12m)
                </Link>
              </li>
              <li>
                <Link href="/search?tag=new" className="hover:text-charcoal transition">
                  Nouveautés de Saison
                </Link>
              </li>
              <li>
                <Link href="/search?tag=bestseller" className="hover:text-charcoal transition">
                  Meilleures Ventes
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-charcoal font-sans">
              Aide & Services
            </h4>
            <ul className="space-y-2 text-xs text-charcoal-600">
              <li>
                <Link href="/shipping-returns" className="hover:text-charcoal transition">
                  Livraison & Retours
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-charcoal transition">
                  À Propos de la Marque
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-charcoal transition">
                  Contact & Assistance
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-charcoal transition">
                  Suivi de Commande
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-charcoal transition">
                  Ma Liste d'Envies
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-charcoal font-sans">
              Newsletter
            </h4>
            <p className="text-xs text-charcoal-600">
              Inscrivez-vous pour bénéficier de <strong>-10%</strong> sur votre première commande et
              accéder à nos ventes privées.
            </p>
            {isSubscribed ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Inscription confirmée !</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    required
                    className="w-full bg-white border border-border py-2.5 pl-3 pr-9 text-xs text-charcoal placeholder-charcoal-400 focus:outline-hidden focus:border-charcoal transition"
                  />
                  <Mail className="absolute right-3 top-3 w-4 h-4 text-charcoal-400" />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-charcoal text-white text-xs uppercase tracking-widest font-medium hover:bg-charcoal-800 transition"
                >
                  S'inscrire
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Payments & Copyright */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
          <p>© {new Date().getFullYear()} Top Tendance Tunisie. Tous droits réservés.</p>

          {/* Payment badges */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-[11px] font-medium mr-1 text-charcoal-600">Moyens de paiement :</span>
            <span className="px-2.5 py-1 bg-white border border-border rounded text-[10px] font-semibold tracking-wider text-charcoal">
              PAIEMENT À LA LIVRAISON
            </span>
            <span className="px-2.5 py-1 bg-white border border-border rounded text-[10px] font-semibold tracking-wider text-charcoal">
              CARTE BANCAIRE
            </span>
            <span className="px-2.5 py-1 bg-white border border-border rounded text-[10px] font-semibold tracking-wider text-charcoal">
              E-DINAR
            </span>
            <span className="px-2.5 py-1 bg-white border border-border rounded text-[10px] font-semibold tracking-wider text-charcoal">
              KONNECT
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

