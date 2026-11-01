'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export function HomeNewsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Veuillez entrer une adresse email valide', 'error');
      return;
    }
    setIsSubscribed(true);
    showToast('Félicitations ! Votre code promo -10% vous a été envoyé.', 'success');
  };

  return (
    <section className="py-14 sm:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-charcoal text-white rounded-xs p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-xl">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto text-center space-y-4 relative z-10">
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-white/70 block">
              Club Privilège Top Tendance
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif leading-tight">
              Rejoignez notre cercle et profitez de -10%
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans max-w-lg mx-auto">
              Inscrivez-vous pour recevoir votre code de bienvenue exclusif, nos accès prioritaires aux ventes privées et les nouvelles collections en avant-première.
            </p>

            {isSubscribed ? (
              <div className="pt-4 max-w-md mx-auto">
                <div className="p-4 bg-white/10 border border-white/20 backdrop-blur-xs rounded-xs flex items-center justify-center gap-3 text-emerald-300 text-xs sm:text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Merci ! Votre code avantage : <strong>BIENVENUE10</strong></span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pt-4 max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre adresse email"
                      className="w-full bg-white text-charcoal py-3.5 pl-4 pr-10 text-xs placeholder-charcoal-400 focus:outline-hidden rounded-xs sm:rounded-r-none"
                    />
                    <Mail className="absolute right-3 top-3.5 w-4 h-4 text-charcoal-400" />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-charcoal-800 border sm:border-l-0 border-white/20 text-white text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-charcoal transition duration-300 rounded-xs sm:rounded-l-none flex items-center justify-center gap-2"
                  >
                    S&apos;inscrire <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* Terms and quick-link to account registration */}
            <p className="text-[11px] text-white/60 pt-3">
              En vous inscrivant, vous acceptez nos conditions générales.{' '}
              <Link href="/register" className="underline hover:text-white transition">
                Créer un compte complet &rarr;
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

