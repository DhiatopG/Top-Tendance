'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ShoppingBag, 
  ArrowLeft, 
  Lock,
  Banknote
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { formatPrice } from '@/utils/currency';

// The 24 Governorates of Tunisia
const TUNISIA_GOVERNORATES = [
  'Ariana',
  'Béja',
  'Ben Arous',
  'Bizerte',
  'Gabès',
  'Gafsa',
  'Jendouba',
  'Kairouan',
  'Kasserine',
  'Kébili',
  'Le Kef',
  'Mahdia',
  'La Manouba',
  'Médenine',
  'Monastir',
  'Nabeul',
  'Sfax',
  'Sidi Bouzid',
  'Siliana',
  'Sousse',
  'Tataouine',
  'Tozeur',
  'Tunis',
  'Zaghouan'
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, freeShippingThreshold, clearCart } = useCart();
  const { showToast } = useToast();

  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    governorate: 'Tunis',
    city: '',
    address: '',
    postalCode: '',
    notes: '',
    paymentMethod: 'cod', // 'cod' (Cash on delivery) or 'online' (Konnect / Bank card)
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const shippingCost = items.length === 0 ? 0 : subtotal >= freeShippingThreshold ? 0 : 7.0;
  const orderTotal = subtotal + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.address || !formData.city) {
      showToast('Veuillez remplir tous les champs obligatoires.', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      const generatedOrderNum = `TT-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrderNum);
      setOrderPlaced(true);
      clearCart();
      setIsSubmitting(false);
      showToast('Votre commande a été confirmée avec succès !', 'success');
    }, 1200);
  };

  // Order Confirmed State
  if (orderPlaced) {
    return (
      <div className="bg-cream min-h-[75vh] py-16 px-4">
        <div className="max-w-xl mx-auto bg-white border border-border p-8 text-center rounded-xs shadow-sm">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-10 h-10 stroke-[2]" />
          </div>
          <h1 className="text-2xl font-serif text-charcoal mb-2">Merci pour votre commande !</h1>
          <p className="text-sm text-charcoal-600 mb-6">
            Votre commande numéro <strong className="text-charcoal font-semibold">{orderNumber}</strong> a été enregistrée avec succès.
          </p>

          <div className="bg-linen/50 p-4 rounded-xs text-left text-xs text-charcoal-700 space-y-2 mb-6">
            <p><strong>Destinataire :</strong> {formData.firstName} {formData.lastName}</p>
            <p><strong>Téléphone :</strong> +216 {formData.phone}</p>
            <p><strong>Adresse :</strong> {formData.address}, {formData.city}, {formData.governorate}</p>
            <p><strong>Mode de paiement :</strong> {formData.paymentMethod === 'cod' ? 'Paiement en espèces à la livraison' : 'Carte bancaire / Konnect'}</p>
            <p><strong>Montant total :</strong> {formatPrice(orderTotal)}</p>
          </div>

          <p className="text-xs text-charcoal-500 mb-8">
            Notre équipe de préparation vous contactera par téléphone ou SMS dès l&apos;expédition de votre colis (délai moyen: 48h).
          </p>

          <Link
            href="/women"
            className="inline-block px-8 py-3.5 bg-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-charcoal-800 transition"
          >
            Retourner à la boutique
          </Link>
        </div>
      </div>
    );
  }

  // Empty cart fallback
  if (items.length === 0) {
    return (
      <div className="bg-cream min-h-[60vh] py-16 px-4 text-center">
        <ShoppingBag className="w-12 h-12 text-charcoal-400 mx-auto mb-4" />
        <h1 className="text-2xl font-serif text-charcoal mb-2">Votre panier est vide</h1>
        <p className="text-sm text-charcoal-500 mb-6">Ajoutez des articles avant de procéder au paiement.</p>
        <Link
          href="/women"
          className="inline-block px-6 py-3 bg-charcoal text-white text-xs uppercase tracking-wider font-semibold"
        >
          Découvrir nos créations
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation link */}
        <div className="mb-6">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-charcoal-600 hover:text-charcoal transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Retourner au panier
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Checkout Steps Form */}
          <div className="lg:col-span-7 bg-white border border-border rounded-xs p-6 sm:p-8 shadow-xs">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Customer Contact Details */}
              <section>
                <div className="flex items-center gap-3 pb-3 border-b border-border mb-4">
                  <span className="w-6 h-6 rounded-full bg-charcoal text-white text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  <h2 className="text-lg font-serif text-charcoal">Coordonnées de contact</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 uppercase tracking-wide mb-1.5">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Ex: Yasmine"
                      className="w-full px-3.5 py-2.5 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 uppercase tracking-wide mb-1.5">
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Ex: Ben Salem"
                      className="w-full px-3.5 py-2.5 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 uppercase tracking-wide mb-1.5">
                      Numéro de téléphone (Tunisie) *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 border border-r-0 border-border bg-linen/50 text-xs text-charcoal-600 rounded-l-xs">
                        +216
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Ex: 98 123 456"
                        className="w-full px-3.5 py-2.5 text-sm bg-cream/40 border border-border rounded-r-xs focus:border-charcoal focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 uppercase tracking-wide mb-1.5">
                      Adresse email (pour le suivi)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="yasmine@example.tn"
                      className="w-full px-3.5 py-2.5 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden"
                    />
                  </div>
                </div>
              </section>

              {/* Step 2: Shipping address in Tunisia */}
              <section>
                <div className="flex items-center gap-3 pb-3 border-b border-border mb-4">
                  <span className="w-6 h-6 rounded-full bg-charcoal text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  <h2 className="text-lg font-serif text-charcoal">Adresse de livraison (Tunisie)</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 uppercase tracking-wide mb-1.5">
                      Gouvernorat *
                    </label>
                    <select
                      name="governorate"
                      value={formData.governorate}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden"
                    >
                      {TUNISIA_GOVERNORATES.map((gov) => (
                        <option key={gov} value={gov}>
                          {gov}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 uppercase tracking-wide mb-1.5">
                      Ville / Délégation *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Ex: La Marsa, Menzah, Hammamet..."
                      className="w-full px-3.5 py-2.5 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-charcoal-700 uppercase tracking-wide mb-1.5">
                      Adresse complète (Rue, Immeuble, Étage...) *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Ex: 12 Rue des Oliviers, Apt 4"
                      className="w-full px-3.5 py-2.5 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 uppercase tracking-wide mb-1.5">
                      Code postal
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="Ex: 2070"
                      className="w-full px-3.5 py-2.5 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 uppercase tracking-wide mb-1.5">
                      Instructions de livraison (optionnel)
                    </label>
                    <input
                      type="text"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Ex: Appeler avant d'arriver"
                      className="w-full px-3.5 py-2.5 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden"
                    />
                  </div>
                </div>
              </section>

              {/* Step 3: Payment method selector */}
              <section>
                <div className="flex items-center gap-3 pb-3 border-b border-border mb-4">
                  <span className="w-6 h-6 rounded-full bg-charcoal text-white text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  <h2 className="text-lg font-serif text-charcoal">Mode de paiement</h2>
                </div>

                <div className="space-y-3">
                  {/* COD */}
                  <label
                    className={`flex items-start gap-4 p-4 border rounded-xs cursor-pointer transition ${
                      formData.paymentMethod === 'cod'
                        ? 'border-charcoal bg-linen/30'
                        : 'border-border hover:border-charcoal-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="mt-1 text-charcoal focus:ring-charcoal"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Banknote className="w-5 h-5 text-emerald-700" />
                          <span className="text-sm font-semibold text-charcoal">
                            Paiement à la livraison (Espèces)
                          </span>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-xs">
                          Populaire en Tunisie
                        </span>
                      </div>
                      <p className="text-xs text-charcoal-500 mt-1">
                        Réglez le montant exact en espèces auprès du livreur à la réception de votre colis.
                      </p>
                    </div>
                  </label>

                  {/* Konnect / Card Preview */}
                  <label
                    className={`flex items-start gap-4 p-4 border rounded-xs cursor-pointer transition ${
                      formData.paymentMethod === 'online'
                        ? 'border-charcoal bg-linen/30'
                        : 'border-border hover:border-charcoal-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={formData.paymentMethod === 'online'}
                      onChange={handleChange}
                      className="mt-1 text-charcoal focus:ring-charcoal"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-sky-700" />
                          <span className="text-sm font-semibold text-charcoal">
                            Carte Bancaire / Konnect (e-Dinar, GDA, Visa, Mastercard)
                          </span>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider bg-sky-50 text-sky-700 px-2 py-0.5 rounded-xs">
                          En ligne sécurisé
                        </span>
                      </div>
                      <p className="text-xs text-charcoal-500 mt-1">
                        Paiement sécurisé et instantané via passerelle de paiement tunisienne (Konnect).
                      </p>
                    </div>
                  </label>
                </div>
              </section>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-charcoal-800 disabled:opacity-50 transition rounded-xs flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                {isSubmitting ? 'Traitement en cours...' : `Confirmer la commande (${formatPrice(orderTotal)})`}
              </button>
            </form>
          </div>

          {/* Sticky Order Summary Sidebar with Product Miniatures */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white border border-border rounded-xs p-6 shadow-xs space-y-5">
              <h2 className="text-base font-serif text-charcoal pb-3 border-b border-border flex items-center justify-between">
                <span>Votre commande</span>
                <span className="text-xs font-sans text-charcoal-500 font-normal">
                  {items.length} article{items.length > 1 ? 's' : ''}
                </span>
              </h2>

              {/* Product Miniatures List */}
              <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1 divide-y divide-border/60">
                {items.map((item) => {
                  const price = item.product.salePrice ?? item.product.price;
                  return (
                    <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3.5">
                      <div className="relative w-14 h-16 bg-cream border border-border rounded-xs overflow-hidden shrink-0">
                        <Image
                          src={item.product.images[item.selectedColor.imageIndex] || item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover object-top"
                          sizes="56px"
                        />
                        <span className="absolute top-0 right-0 bg-charcoal text-white text-[10px] w-4 h-4 flex items-center justify-center font-bold rounded-bl-xs">
                          {item.quantity}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-serif text-charcoal truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-[11px] text-charcoal-500 mt-0.5">
                          Taille: {item.selectedSize} &bull; {item.selectedColor.name}
                        </p>
                      </div>

                      <div className="text-xs font-semibold text-charcoal text-right">
                        {formatPrice(price * item.quantity)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Calculations breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-border text-xs">
                <div className="flex justify-between text-charcoal-600">
                  <span>Sous-total articles</span>
                  <span className="font-medium text-charcoal">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-charcoal-600">
                  <span>Livraison (Tunisie)</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-emerald-700 font-semibold">Gratuit</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>
                <div className="pt-3 border-t border-border flex justify-between text-base font-semibold text-charcoal">
                  <span>Total à payer</span>
                  <span className="text-lg">{formatPrice(orderTotal)}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-border text-[11px] text-charcoal-500 space-y-2">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-charcoal-400 shrink-0" />
                  <span>Livraison assurée par nos transporteurs partenaires agréés</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-charcoal-400 shrink-0" />
                  <span>Vérification du colis avant paiement possible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

