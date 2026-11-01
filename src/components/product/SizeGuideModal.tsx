'use client';

import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';
import { useEffect } from 'react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: 'women' | 'kids';
}

const WOMEN_SIZES = [
  { label: 'XS / 34', bust: '80–83', waist: '62–65', hips: '88–91' },
  { label: 'S / 36',  bust: '84–87', waist: '66–69', hips: '92–95' },
  { label: 'M / 38',  bust: '88–91', waist: '70–73', hips: '96–99' },
  { label: 'L / 40',  bust: '92–95', waist: '74–77', hips: '100–103' },
  { label: 'XL / 42', bust: '96–99', waist: '78–81', hips: '104–107' },
];

const KIDS_SIZES = [
  { label: '0–3m',   height: '50–62',  weight: '3–5 kg',   chest: '40–44' },
  { label: '3–6m',   height: '62–68',  weight: '5–8 kg',   chest: '44–46' },
  { label: '6–12m',  height: '68–80',  weight: '8–10 kg',  chest: '46–50' },
  { label: '12–18m', height: '80–86',  weight: '10–12 kg', chest: '50–52' },
  { label: '18–24m', height: '86–92',  weight: '12–14 kg', chest: '52–54' },
  { label: '2–3y',   height: '92–98',  weight: '14–16 kg', chest: '54–56' },
  { label: '4–5y',   height: '104–110', weight: '16–19 kg', chest: '57–60' },
  { label: '5–6y',   height: '110–116', weight: '19–22 kg', chest: '60–63' },
  { label: '6–7y',   height: '116–122', weight: '22–25 kg', chest: '63–66' },
  { label: '8–9y',   height: '128–134', weight: '26–31 kg', chest: '67–70' },
  { label: '9–10y',  height: '134–140', weight: '31–36 kg', chest: '70–74' },
  { label: '10–11y', height: '140–146', weight: '36–41 kg', chest: '74–78' },
  { label: '11–12y', height: '146–152', weight: '41–46 kg', chest: '78–82' },
];

export function SizeGuideModal({ isOpen, onClose, variant }: SizeGuideModalProps) {
  const isKids = variant === 'kids';

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/50 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Guide des tailles"
        className={`relative z-10 w-full sm:max-w-xl bg-white shadow-floating animate-in slide-in-from-bottom duration-300 sm:animate-in sm:fade-in sm:zoom-in-95 ${
          isKids ? 'rounded-t-3xl sm:rounded-2xl' : 'rounded-t-none sm:rounded-xs'
        }`}
      >
        {/* Header */}
        <div className={`px-5 py-4 border-b border-border flex items-center justify-between ${isKids ? 'bg-kids-peach-light/40 rounded-t-3xl sm:rounded-t-2xl' : ''}`}>
          <div className="flex items-center gap-2">
            <Ruler className={`w-4 h-4 ${isKids ? 'text-kids-peach' : 'text-charcoal'}`} />
            <h2 className={`font-semibold text-sm ${isKids ? 'font-kids text-charcoal' : 'font-sans text-charcoal'}`}>
              Guide des tailles — {isKids ? 'Enfant' : 'Femme'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le guide des tailles"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-charcoal-100 transition"
          >
            <X className="w-4 h-4 text-charcoal" />
          </button>
        </div>

        {/* Tip */}
        <div className="px-5 pt-3 pb-1">
          <p className="text-xs text-charcoal-500 leading-relaxed">
            {isKids
              ? 'Mesurez la taille et le poids de votre enfant pour trouver la taille idéale. En cas de doute entre deux tailles, prenez la taille supérieure.'
              : 'Mesurez-vous avec un mètre ruban souple, bras le long du corps. Toutes les mesures sont en centimètres (cm).'}
          </p>
        </div>

        {/* Table */}
        <div className="px-5 pb-5 pt-3 overflow-x-auto max-h-[60vh] overflow-y-auto">
          {isKids ? (
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 pr-3 text-left font-semibold text-charcoal-700 whitespace-nowrap">Taille</th>
                  <th className="py-2 pr-3 text-left font-semibold text-charcoal-700 whitespace-nowrap">Hauteur (cm)</th>
                  <th className="py-2 pr-3 text-left font-semibold text-charcoal-700 whitespace-nowrap">Poids</th>
                  <th className="py-2 text-left font-semibold text-charcoal-700 whitespace-nowrap">Tour de poitrine (cm)</th>
                </tr>
              </thead>
              <tbody>
                {KIDS_SIZES.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? 'bg-kids-peach-light/20' : ''}>
                    <td className="py-2 pr-3 font-semibold text-charcoal whitespace-nowrap">{row.label}</td>
                    <td className="py-2 pr-3 text-charcoal-600">{row.height}</td>
                    <td className="py-2 pr-3 text-charcoal-600">{row.weight}</td>
                    <td className="py-2 text-charcoal-600">{row.chest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 pr-3 text-left font-semibold text-charcoal-700">Taille</th>
                  <th className="py-2 pr-3 text-left font-semibold text-charcoal-700">Poitrine (cm)</th>
                  <th className="py-2 pr-3 text-left font-semibold text-charcoal-700">Taille (cm)</th>
                  <th className="py-2 text-left font-semibold text-charcoal-700">Hanches (cm)</th>
                </tr>
              </thead>
              <tbody>
                {WOMEN_SIZES.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? 'bg-cream-50' : ''}>
                    <td className="py-2 pr-3 font-semibold text-charcoal">{row.label}</td>
                    <td className="py-2 pr-3 text-charcoal-600">{row.bust}</td>
                    <td className="py-2 pr-3 text-charcoal-600">{row.waist}</td>
                    <td className="py-2 text-charcoal-600">{row.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

