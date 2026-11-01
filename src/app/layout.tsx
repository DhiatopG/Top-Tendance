import type { Metadata } from 'next';
import { Inter, Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ToastProvider } from '@/context/ToastContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://top-tendance.tn'),
  title: {
    default: 'Top Tendance | Prêt-à-porter Femme & Enfant en Tunisie',
    template: '%s | Top Tendance Tunisie',
  },
  description: 'Boutique en ligne moderne de mode femme et enfant en Tunisie. Pièces élégantes, lin pur, coton bio et livraison express sur l’ensemble des 24 gouvernorats tunisiens.',
  keywords: ['mode tunisie', 'prêt-à-porter femme tunis', 'vêtements enfant tunisie', 'robe lin tunisie', 'top tendance'],
  openGraph: {
    title: 'Top Tendance | Mode Femme & Enfant en Tunisie',
    description: 'Maison tunisienne de prêt-à-porter. L’élégance des matières nobles pour femme et enfant.',
    url: 'https://top-tendance.tn',
    siteName: 'Top Tendance Tunisie',
    locale: 'fr_TN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Tendance Tunisie',
    description: 'Prêt-à-porter femme et enfant en Tunisie. Livraison partout en Tunisie.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} ${outfit.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-white text-charcoal antialiased">
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              <CartDrawer />
              <main className="flex-1 flex flex-col">
                {children}
              </main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
