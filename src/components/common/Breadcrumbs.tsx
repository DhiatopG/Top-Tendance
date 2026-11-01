import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-charcoal-500">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-charcoal transition"
            aria-label="Accueil"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only sm:not-sr-only sm:inline">Accueil</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              <li aria-hidden="true">
                <ChevronRight className="w-3.5 h-3.5 text-charcoal-400" />
              </li>
              <li>
                {isLast || !item.href ? (
                  <span
                    className="font-medium text-charcoal max-w-[200px] sm:max-w-xs truncate inline-block align-bottom"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-charcoal transition"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

