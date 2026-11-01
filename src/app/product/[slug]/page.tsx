import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import productsData from '@/data/products.json';
import { Product } from '@/types/product';
import { PDPClient } from '@/components/product/PDPClient';

interface PageProps {
  params: { slug: string };
}

// Pre-generate all product slugs at build time
export function generateStaticParams() {
  return (productsData as Product[]).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = (productsData as Product[]).find((p) => p.slug === params.slug);
  if (!product) return {};

  const price = product.salePrice ?? product.price;
  const formattedPrice = `${price.toFixed(3)} TND`;
  const title = `${product.name} | Top Tendance Tunisie`;
  const description = `${product.description.slice(0, 155)}… Prix: ${formattedPrice}. Livraison express partout en Tunisie.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'fr_TN',
      siteName: 'Top Tendance Tunisie',
      images: product.images[0]
        ? [
            {
              url: product.images[0],
              width: 1000,
              height: 1333,
              alt: product.name,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}

export default function ProductPage({ params }: PageProps) {
  const product = (productsData as Product[]).find((p) => p.slug === params.slug);

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-white">
      <PDPClient product={product} />
    </div>
  );
}

