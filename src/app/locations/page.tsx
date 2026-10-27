import type { Metadata } from "next";
import { LocationsExplorer } from "@/components/locations/LocationsExplorer";
import { SITE_CONFIG } from "@/config";
import { PhoneCall } from "lucide-react";

export const metadata: Metadata = {
  title: "Dealership Locations | Kosmo Tata & Kosmo Hero Showrooms",
  description:
    "Find authorized Kosmo Group showrooms and service centers across Jalandhar and Punjab. Direct phone, WhatsApp, and Google Maps directions.",
};

export default function LocationsPage() {
  return (
    <div className="py-12 sm:py-16 lg:py-20 space-y-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Authorized Network
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Our Dealership Locations
          </h1>
          <p className="mt-4 text-lg text-neutral-300 leading-relaxed">
            Visit our authorized showrooms and state-of-the-art service workshops. Filter by brand or city, explore direct contact numbers, and get instant GPS navigation.
          </p>
        </div>
      </section>

      {/* Explorer Component */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LocationsExplorer />
      </section>

      {/* Roadside Assistance Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Emergency Assistance
            </span>
            <h3 className="text-xl font-bold text-white mt-1">24x7 Roadside Assistance</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Vehicle breakdown or emergency assistance across Punjab highways and cities.
            </p>
          </div>
          <a
            href={`tel:${SITE_CONFIG.emergencyRSA.tollFree.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-white font-semibold text-sm transition-colors border border-neutral-700"
          >
            <PhoneCall className="w-4 h-4 text-amber-400" />
            Toll-Free: {SITE_CONFIG.emergencyRSA.tollFree}
          </a>
        </div>
      </section>
    </div>
  );
}
