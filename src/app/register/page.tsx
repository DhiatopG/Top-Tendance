'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function RegisterPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
      showToast('Veuillez remplir tous les champs obligatoires.', 'error');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast('Les mots de passe ne correspondent pas.', 'error');
      return;
    }

    if (formData.password.length < 6) {
      showToast('Le mot de passe doit comporter au moins 6 caractères.', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Compte créé avec succès ! Bienvenue chez Top Tendance.', 'success');
      router.push('/account');
    }, 1000);
  };

  return (
    <div className="bg-cream min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white border border-border p-8 rounded-xs shadow-xs">
        <div className="text-center mb-8">
          <span className="text-[11px] uppercase tracking-widest font-semibold text-charcoal-500">
            Rejoignez-nous
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-charcoal mt-1">Créer un Compte</h1>
          <p className="text-xs text-charcoal-600 mt-2">
            Profitez de -10% sur votre première commande et suivez vos achats.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Prénom *
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Ex: Yasmine"
                className="w-full px-3 py-2 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Nom *
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Ex: Trabelsi"
                className="w-full px-3 py-2 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
              Adresse Email *
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="yasmine@example.tn"
                className="w-full pl-3.5 pr-10 py-2 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden"
              />
              <Mail className="absolute right-3 top-2.5 w-4 h-4 text-charcoal-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
              Numéro de téléphone (+216) *
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ex: 98 123 456"
                className="w-full pl-3.5 pr-10 py-2 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden"
              />
              <Phone className="absolute right-3 top-2.5 w-4 h-4 text-charcoal-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
              Mot de Passe *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Au moins 6 caractères"
                className="w-full pl-3.5 pr-10 py-2 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-charcoal-400 hover:text-charcoal"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
              Confirmer le Mot de Passe *
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Répétez votre mot de passe"
              className="w-full px-3.5 py-2 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-2 cursor-pointer text-xs text-charcoal-600">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mt-0.5 rounded-xs border-border text-charcoal focus:ring-charcoal"
              />
              <span>J&apos;accepte les conditions générales de vente et la politique de confidentialité.</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3.5 bg-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-charcoal-800 disabled:opacity-50 transition rounded-xs flex items-center justify-center gap-2"
          >
            {loading ? 'Création en cours...' : 'Créer Mon Compte'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-charcoal-600">
            Déjà inscrit ?{' '}
            <Link
              href="/login"
              className="font-semibold text-charcoal hover:underline inline-flex items-center gap-1"
            >
              Se connecter <ArrowRight className="w-3 h-3" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

