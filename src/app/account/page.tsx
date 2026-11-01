'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Plus
} from 'lucide-react';
import { formatPrice } from '@/utils/currency';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';

// Mock order data
const MOCK_ORDERS = [
  {
    id: 'TT-892401',
    date: '28 Octobre 2026',
    total: 189.0,
    status: 'In Transit',
    statusLabel: 'En cours de livraison',
    statusColor: 'bg-amber-50 text-amber-800 border-amber-200',
    itemsCount: 1,
    itemsPreview: 'Robe Longue Ceinturée en Lin Pur (Taille M, Sable Doré)',
    deliveryAddress: 'Les Berges du Lac 2, Tunis',
  },
  {
    id: 'TT-814920',
    date: '14 Octobre 2026',
    total: 247.0,
    status: 'Delivered',
    statusLabel: 'Livrée',
    statusColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    itemsCount: 2,
    itemsPreview: 'Cardigan Côtelé en Maille Douce + Ensemble Salopette Bébé',
    deliveryAddress: 'Ennasr 2, Ariana',
  },
  {
    id: 'TT-763102',
    date: '02 Septembre 2026',
    total: 285.0,
    status: 'Delivered',
    statusLabel: 'Livrée',
    statusColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    itemsCount: 1,
    itemsPreview: 'Blazer Structuré en Laine Froide (Taille 38)',
    deliveryAddress: 'Kantaoui, Sousse',
  },
];

export default function AccountPage() {
  const { wishlistCount } = useWishlist();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      title: 'Domicile (Principal)',
      name: 'Yasmine Trabelsi',
      phone: '+216 98 123 456',
      address: 'Résidence Les Jasmins, Apt 4B, Les Berges du Lac 2',
      city: 'Tunis',
      postalCode: '1053',
      governorate: 'Tunis',
      isDefault: true,
    },
    {
      id: 2,
      title: 'Bureau',
      name: 'Yasmine Trabelsi',
      phone: '+216 98 123 456',
      address: 'Immeuble Le Grand Boulevard, 3ème étage',
      city: 'Centre Urbain Nord',
      postalCode: '1082',
      governorate: 'Tunis',
      isDefault: false,
    },
  ]);

  const handleLogout = () => {
    showToast('Déconnexion effectuée avec succès.', 'info');
  };

  return (
    <div className="bg-cream min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-white border border-border rounded-xs p-6 sm:p-8 mb-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-cream flex items-center justify-center text-charcoal font-serif text-xl border border-border">
              YT
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-charcoal-500 font-semibold">
                Bienvenue dans votre espace
              </span>
              <h1 className="text-xl sm:text-2xl font-serif text-charcoal">
                Yasmine Trabelsi
              </h1>
              <p className="text-xs text-charcoal-500">Membre Privilège Top Tendance &bull; Tunis, Tunisie</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/wishlist"
              className="px-4 py-2 bg-cream text-charcoal text-xs uppercase tracking-wider font-semibold hover:bg-linen rounded-xs transition flex items-center gap-2"
            >
              <Heart className="w-3.5 h-3.5 text-sale" />
              Favoris ({wishlistCount})
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 text-charcoal-400 hover:text-sale transition rounded-xs"
              title="Se déconnecter"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Account layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Tabs Sidebar */}
          <div className="lg:col-span-3 bg-white border border-border rounded-xs shadow-xs p-2 space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider font-semibold rounded-xs transition text-left ${
                activeTab === 'orders'
                  ? 'bg-charcoal text-white'
                  : 'text-charcoal-700 hover:bg-cream'
              }`}
            >
              <span className="flex items-center gap-3">
                <Package className="w-4 h-4" /> Mes Commandes
              </span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
                {MOCK_ORDERS.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider font-semibold rounded-xs transition text-left ${
                activeTab === 'addresses'
                  ? 'bg-charcoal text-white'
                  : 'text-charcoal-700 hover:bg-cream'
              }`}
            >
              <span className="flex items-center gap-3">
                <MapPin className="w-4 h-4" /> Carnet d&apos;Adresses
              </span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
                {addresses.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider font-semibold rounded-xs transition text-left ${
                activeTab === 'profile'
                  ? 'bg-charcoal text-white'
                  : 'text-charcoal-700 hover:bg-cream'
              }`}
            >
              <span className="flex items-center gap-3">
                <User className="w-4 h-4" /> Informations Personnelles
              </span>
            </button>
          </div>

          {/* Tab Content Panel */}
          <div className="lg:col-span-9 bg-white border border-border rounded-xs shadow-xs p-6 sm:p-8">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-lg font-serif text-charcoal pb-4 border-b border-border mb-6">
                  Historique de vos commandes
                </h2>

                <div className="space-y-4">
                  {MOCK_ORDERS.map((order) => (
                    <div
                      key={order.id}
                      className="border border-border rounded-xs p-5 hover:border-charcoal-300 transition"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border/60 gap-2 mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-sm text-charcoal">{order.id}</span>
                          <span className="text-xs text-charcoal-500">&bull; {order.date}</span>
                        </div>
                        <span
                          className={`inline-block text-[11px] font-semibold tracking-wider px-2.5 py-1 rounded-full border ${order.statusColor}`}
                        >
                          {order.statusLabel}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs text-charcoal-600 mb-3">
                        <p><strong>Articles :</strong> {order.itemsPreview}</p>
                        <p><strong>Livraison à :</strong> {order.deliveryAddress}</p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border/60">
                        <div className="text-xs text-charcoal-500">
                          Total payé : <strong className="text-charcoal text-sm">{formatPrice(order.total)}</strong>
                        </div>
                        <span className="text-xs text-charcoal-600 font-medium hover:underline cursor-pointer flex items-center gap-1">
                          Voir détails <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
                  <h2 className="text-lg font-serif text-charcoal">
                    Mes adresses enregistrées
                  </h2>
                  <button
                    onClick={() => showToast('Formulaire d&apos;ajout d&apos;adresse ouvert.')}
                    className="px-3.5 py-1.5 bg-charcoal text-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-charcoal-800 transition flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Nouvelle adresse
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`border rounded-xs p-5 relative ${
                        addr.isDefault ? 'border-charcoal bg-linen/20' : 'border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-xs uppercase tracking-wider text-charcoal">
                          {addr.title}
                        </span>
                        {addr.isDefault && (
                          <span className="text-[10px] bg-charcoal text-white px-2 py-0.5 rounded-xs font-semibold">
                            Par défaut
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-charcoal-600 space-y-1 leading-relaxed">
                        <p className="font-semibold text-charcoal">{addr.name}</p>
                        <p>{addr.address}</p>
                        <p>{addr.postalCode} {addr.city}, {addr.governorate}</p>
                        <p className="text-charcoal-500">{addr.phone}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-border flex items-center gap-4 text-xs font-medium text-charcoal-600">
                        <button className="hover:underline">Modifier</button>
                        {!addr.isDefault && <button className="hover:underline text-sale">Supprimer</button>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-lg font-serif text-charcoal pb-4 border-b border-border mb-6">
                  Informations du compte
                </h2>

                <form onSubmit={(e) => { e.preventDefault(); showToast('Modifications enregistrées !'); }} className="space-y-4 max-w-lg">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1">
                        Prénom
                      </label>
                      <input
                        type="text"
                        defaultValue="Yasmine"
                        className="w-full px-3 py-2 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1">
                        Nom
                      </label>
                      <input
                        type="text"
                        defaultValue="Trabelsi"
                        className="w-full px-3 py-2 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="yasmine.trabelsi@top-tendance.tn"
                      className="w-full px-3 py-2 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      defaultValue="+216 98 123 456"
                      className="w-full px-3 py-2 text-sm bg-cream/40 border border-border rounded-xs focus:border-charcoal focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-charcoal-800 rounded-xs transition"
                  >
                    Enregistrer les modifications
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

