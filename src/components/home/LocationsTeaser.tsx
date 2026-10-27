import React from "react";
import Link from "next/link";
import { getVerifiedLocations } from "@/config";
import { MapPin, Phone, ArrowRight, ShieldCheck } from "lucide-react";

export function LocationsTeaser() {
  const verifiedLocations = getVerifiedLocations();

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-3">
              Network Presence
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Verified Outlets Across Punjab
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Visit our authorized digital showrooms and computerized workshops conveniently situated across major routes in Punjab.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-sm hover:bg-slate-800 transition"
            >
              <span>See All Locations & Directions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Verified Outlet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {verifiedLocations.map((loc) => {
            const isTata = loc.brand === "tata";
            const brandAccent = isTata ? "#2334f5" : "#ee2326";
            const brandLabel = isTata ? "Kosmo Tata" : "Kosmo Hero";

            return (
              <div
                key={loc.id}
                className="p-8 rounded-2xl border border-slate-200 bg-white shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: brandAccent }}
                    >
                      {brandLabel}
                    </span>

                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Outlet</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {loc.name}
                  </h3>

                  <p className="text-sm text-slate-600 mb-6 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                    <span>{loc.address}</span>
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <a
                    href={`tel:${loc.phone}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-slate-950 hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>{loc.phone}</span>
                  </a>

                  {loc.mapUrl && (
                    <a
                      href={loc.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 hover:underline flex items-center gap-1"
                    >
                      <span>Open in Google Maps</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
