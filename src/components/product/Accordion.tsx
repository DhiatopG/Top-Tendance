'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  isKids?: boolean;
}

export function Accordion({ items, isKids = false }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="divide-y divide-border">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx}>
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between py-4 text-left focus:outline-hidden group"
            >
              <span className={`text-sm font-semibold group-hover:opacity-70 transition ${isKids ? 'font-kids text-charcoal' : 'text-charcoal'}`}>
                {item.title}
              </span>
              {isOpen
                ? <ChevronUp className="w-4 h-4 text-charcoal-400 shrink-0" />
                : <ChevronDown className="w-4 h-4 text-charcoal-400 shrink-0" />
              }
            </button>
            {isOpen && (
              <div className="pb-4 text-sm text-charcoal-600 leading-relaxed animate-in fade-in duration-150">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

