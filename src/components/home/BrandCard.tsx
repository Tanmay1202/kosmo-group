import React from "react";
import type { Brand } from "@/config";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export function BrandCard({ brand }: { brand: Brand }) {
  const brandUrlWithUtm = `${brand.url}?utm_source=kosmo-hub&utm_medium=brand-card`;

  return (
    <div
      className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1"
      style={{
        borderTopColor: brand.accent,
        borderTopWidth: "4px",
      }}
    >
      <div className="p-7 sm:p-8 flex-grow">
        {/* Brand Header */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white"
            style={{ backgroundColor: brand.accent }}
          >
            {brand.slug === "tata" ? "Passenger Cars & EVs" : "Motorcycles & Scooters"}
          </span>

          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {brand.status === "live" ? "Authorized Dealer" : "Coming Soon"}
          </span>
        </div>

        {/* Brand Name */}
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
          {brand.name}
        </h3>

        {/* Brand Tagline */}
        <p className="text-sm font-medium text-slate-500 mb-4 italic">
          &ldquo;{brand.tagline}&rdquo;
        </p>

        {/* Description */}
        {brand.description && (
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            {brand.description}
          </p>
        )}

        {/* Key Services as Chips */}
        <div className="space-y-2 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Core Facilities
          </span>
          <div className="flex flex-wrap gap-2">
            {brand.services.map((service) => (
              <span
                key={service}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{service}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-7 sm:p-8 pt-0 border-t border-slate-100 bg-slate-50/50">
        <a
          href={brandUrlWithUtm}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-white font-bold text-sm shadow-sm transition-all duration-200 hover:shadow-md hover:opacity-95 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-slate-900"
          style={{ backgroundColor: brand.accent }}
        >
          <span>Visit {brand.name} Portal</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
