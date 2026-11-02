import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface StoreLocationProps {
  className?: string;
  showDetails?: boolean;
}

export function StoreLocation({ className = '', showDetails = true }: StoreLocationProps) {
  return (
    <section 
      aria-label="Localisation de notre boutique Top Tendance" 
      className={`w-full bg-cream/40 border-t border-border/80 ${className}`}
    >
      {showDetails && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white shadow-xs border border-border/60 flex items-center justify-center text-charcoal shrink-0">
                <MapPin className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-charcoal/60 font-semibold font-sans">
                  Boutique Physique
                </p>
                <h3 className="text-base sm:text-lg font-serif font-medium text-charcoal">
                  Visitez Notre Boutique Top Tendance
                </h3>
              </div>
            </div>

            <a
              href="https://maps.google.com/?cid=9573887034177233112"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start sm:self-center px-4 py-2 text-xs uppercase tracking-wider font-semibold border border-charcoal/20 bg-white text-charcoal hover:bg-charcoal hover:text-white transition duration-200"
            >
              <Navigation className="w-3.5 h-3.5" />
              Obtenir l&apos;itinéraire
            </a>
          </div>
        </div>
      )}

      {/* Map Embed Container */}
      <div className="w-full h-[300px] overflow-hidden bg-linen/50 relative border-t border-border/40">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.195525579566!2d10.095792075550067!3d36.837793065580136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd330062af6b4b%3A0x84dd0c6e31ae20d8!2sTop%20Tendance!5e0!3m2!1sen!2stn!4v1793578256561!5m2!1sen!2stn"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Top Tendance Google Maps Location"
          className="w-full h-full"
        />
      </div>
    </section>
  );
}

