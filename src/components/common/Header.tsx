'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const router = useRouter();
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border transition-all">
        {/* Top notification bar */}
        <div className="bg-charcoal text-white text-[11px] sm:text-xs tracking-wider py-2 px-4 text-center font-medium">
          <p className="flex items-center justify-center gap-2">
            <span>Livraison offerte en Tunisie dès 200 TND</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline">Paiement à la livraison disponible</span>
          </p>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-charcoal hover:text-charcoal-600 transition"
                aria-label="Ouvrir le menu de navigation"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Desktop Navigation Links (Left) */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/women"
                className="text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-charcoal-500 transition py-1 relative group"
              >
                Femme
                <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-charcoal transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/kids"
                className="text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-kids-peach transition py-1 relative group"
              >
                Enfant
                <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-kids-peach transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/search?tag=new"
                className="text-xs uppercase tracking-widest font-semibold text-charcoal-700 hover:text-charcoal transition py-1 relative group"
              >
                Nouveautés
                <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-charcoal transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/search?tag=bestseller"
                className="text-xs uppercase tracking-widest font-semibold text-charcoal-700 hover:text-charcoal transition py-1 relative group"
              >
                Bestsellers
                <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-charcoal transition-all duration-300 group-hover:w-full" />
              </Link>
            </nav>

            {/* Brand Logo (Center) */}
            <div className="flex-1 lg:flex-initial text-center lg:text-left">
              <Link href="/" className="inline-block group focus:outline-hidden">
                <Image
                  src="/images/logo.jpg"
                  alt="Top Tendance"
                  width={140}
                  height={48}
                  className="h-10 sm:h-12 w-auto object-contain group-hover:opacity-90 transition"
                  priority
                />
              </Link>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-1 sm:gap-4">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-charcoal hover:text-charcoal-600 transition"
                aria-label="Recherche"
              >
                <Search className="w-5 h-5 stroke-[1.75]" />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                className="p-2 text-charcoal hover:text-charcoal-600 transition relative"
                aria-label={`Mes favoris (${wishlistCount})`}
              >
                <Heart className="w-5 h-5 stroke-[1.75]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-charcoal text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in-50">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-charcoal hover:text-charcoal-600 transition relative"
                aria-label={`Panier (${totalItems})`}
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-charcoal text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in-50">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-border bg-cream-50/90 backdrop-blur-sm px-4 py-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher une robe en lin, cardigan bébé, blazer..."
                  autoFocus
                  className="w-full bg-white border border-border py-3 pl-11 pr-12 text-sm text-charcoal placeholder-charcoal-400 focus:outline-hidden focus:border-charcoal transition"
                />
                <Search className="absolute left-3.5 w-4 h-4 text-charcoal-400" />
                {searchQuery ? (
                  <button
                    type="submit"
                    className="absolute right-3 p-1 text-charcoal hover:text-charcoal-600"
                    aria-label="Lancer la recherche"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-3 p-1 text-charcoal-400 hover:text-charcoal"
                    aria-label="Fermer la recherche"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>
              <div className="flex items-center gap-2 mt-2 text-xs text-charcoal-500 overflow-x-auto py-1">
                <span className="font-medium shrink-0">Populaire :</span>
                {['Robe en lin', 'Barboteuse bébé', 'Cachemire', 'Ensemble bermuda'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      router.push(`/search?q=${encodeURIComponent(term)}`);
                      setIsSearchOpen(false);
                    }}
                    className="px-2.5 py-0.5 bg-white border border-border rounded-full hover:border-charcoal transition shrink-0"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

