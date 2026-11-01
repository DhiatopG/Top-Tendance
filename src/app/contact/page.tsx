'use client';

import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2 
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function ContactPage() {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Question sur une commande',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Veuillez remplir les champs obligatoires.', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast('Votre message a bien été envoyé ! Nous vous répondrons sous 24h.', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Question sur une commande',
        message: '',
      });
    }, 1000);
  };

  return (
    <div className="bg-cream min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-charcoal-500 mb-2 block">
            Service Client Dédié
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-charcoal mb-3">
            Contact & Assistance
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-lg mx-auto">
            Une question sur une taille, un suivi de colis ou une commande spéciale ? Notre équipe tunisienne est à votre écoute.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Contact Information & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-border rounded-xs p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-lg font-serif text-charcoal pb-3 border-b border-border">
                Nos Coordonnées
              </h2>

              <div className="space-y-5 text-xs text-charcoal-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-charcoal shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal text-sm uppercase tracking-wider mb-1">
                      Téléphone
                    </h3>
                    <p className="text-charcoal-600">+216 52 293 651</p>
                    <p className="text-[11px] text-charcoal-400 mt-0.5">Du Lundi au Samedi, de 9h à 19h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal text-sm uppercase tracking-wider mb-1">
                      WhatsApp Direct
                    </h3>
                    <p className="text-charcoal-600">+216 52 293 651</p>
                    <a
                      href="https://wa.me/21652293651"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-1 text-[11px] text-emerald-700 font-semibold hover:underline"
                    >
                      Démarrer une conversation WhatsApp &rarr;
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-charcoal shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal text-sm uppercase tracking-wider mb-1">
                      Email
                    </h3>
                    <p className="text-charcoal-600">contact@top-tendance.tn</p>
                    <p className="text-[11px] text-charcoal-400 mt-0.5">Réponse garantie sous 24h ouvrées</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-charcoal shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal text-sm uppercase tracking-wider mb-1">
                      Boutique Flagship
                    </h3>
                    <p className="text-charcoal-600">
                      Rue El Hidaya, Ariana, Tunisie
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Boutique Hours widget */}
            <div className="bg-linen/50 border border-border rounded-xs p-5 text-xs text-charcoal-700">
              <h3 className="font-serif text-sm text-charcoal mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-charcoal-500" /> Horaires d&apos;Ouverture Boutique
              </h3>
              <div className="space-y-1 text-charcoal-600">
                <p className="flex justify-between">
                  <span>Lundi &ndash; Samedi :</span>
                  <span className="font-medium text-charcoal">09:30 &ndash; 19:30</span>
                </p>
                <p className="flex justify-between">
                  <span>Dimanche :</span>
                  <span className="text-charcoal-500 italic">Fermé</span>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white border border-border rounded-xs p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-serif text-charcoal pb-3 border-b border-border mb-6">
              Envoyez-nous un Message
            </h2>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl text-charcoal">Message envoyé avec succès !</h3>
                <p className="text-xs text-charcoal-600 max-w-sm mx-auto">
                  Merci de nous avoir contactés. Notre conseiller clientèle vous répondra très rapidement par email ou téléphone.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-charcoal-800 transition"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                      Nom & Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Yasmine Trabelsi"
                      className="w-full px-3.5 py-2.5 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                      Numéro de Téléphone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Ex: +216 98 123 456"
                      className="w-full px-3.5 py-2.5 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                    Adresse Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="yasmine@example.tn"
                    className="w-full px-3.5 py-2.5 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                    Objet de votre message
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden"
                  >
                    <option value="Question sur une commande">Question sur une commande existante</option>
                    <option value="Conseil taille ou matière">Conseil taille ou matière</option>
                    <option value="Échange ou Retour">Demande d&apos;échange ou de retour</option>
                    <option value="Partenariat ou Presse">Partenariat, collaboration ou presse</option>
                    <option value="Autre demande">Autre demande</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                    Votre Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Détaillez votre demande ici..."
                    className="w-full px-3.5 py-2.5 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-charcoal-800 disabled:opacity-50 transition rounded-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  {loading ? 'Envoi en cours...' : 'Envoyer le Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

