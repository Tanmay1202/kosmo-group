"use client";

import React, { useState, useMemo } from "react";
import { MapPin, Phone, Clock, ExternalLink, MessageSquare, CheckCircle, Navigation } from "lucide-react";
import { getVerifiedLocations, type Location, BRANDS } from "@/config";

export function LocationsExplorer() {
  const verifiedLocations = useMemo(() => getVerifiedLocations(), []);

  // Filter states
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [activeLocationId, setActiveLocationId] = useState<string>(
    verifiedLocations[0]?.id || ""
  );

  // Extract unique cities from verified locations
  const availableCities = useMemo(() => {
    const set = new Set<string>();
    verifiedLocations.forEach((l) => set.add(l.city));
    return Array.from(set);
  }, [verifiedLocations]);

  // Filtered locations
  const filteredLocations = useMemo(() => {
    return verifiedLocations.filter((loc) => {
      if (selectedBrand !== "all" && loc.brand !== selectedBrand) return false;
      if (selectedCity !== "all" && loc.city !== selectedCity) return false;
      return true;
    });
  }, [verifiedLocations, selectedBrand, selectedCity]);

  // Active location for map preview
  const activeLocation = useMemo(() => {
    return (
      filteredLocations.find((l) => l.id === activeLocationId) ||
      filteredLocations[0] ||
      verifiedLocations[0]
    );
  }, [filteredLocations, activeLocationId, verifiedLocations]);

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800">
        {/* Brand Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400 mr-1">Brand:</span>
          <button
            onClick={() => setSelectedBrand("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedBrand === "all"
                ? "bg-amber-500 text-neutral-950 font-semibold"
                : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
            }`}
          >
            All Brands
          </button>
          {BRANDS.map((b) => (
            <button
              key={b.slug}
              onClick={() => setSelectedBrand(b.slug)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedBrand === b.slug
                  ? "bg-amber-500 text-neutral-950 font-semibold"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>

        {/* City Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400 mr-1">City:</span>
          <button
            onClick={() => setSelectedCity("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedCity === "all"
                ? "bg-amber-500 text-neutral-950 font-semibold"
                : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
            }`}
          >
            All Cities
          </button>
          {availableCities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCity === city
                  ? "bg-amber-500 text-neutral-950 font-semibold"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Location Cards + Interactive Map Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Outlets List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-medium text-neutral-400">
            Showing {filteredLocations.length} verified {filteredLocations.length === 1 ? "outlet" : "outlets"}
          </div>

          {filteredLocations.map((loc) => {
            const isSelected = activeLocation?.id === loc.id;
            const isTata = loc.brand === "tata";

            return (
              <div
                key={loc.id}
                onClick={() => setActiveLocationId(loc.id)}
                className={`cursor-pointer rounded-2xl p-6 transition-all border ${
                  isSelected
                    ? "bg-neutral-900 border-amber-500/80 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/20"
                    : "bg-neutral-900/60 border-neutral-800/80 hover:bg-neutral-900 hover:border-neutral-700"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md ${
                        isTata
                          ? "bg-blue-950/80 text-blue-300 border border-blue-500/30"
                          : "bg-red-950/80 text-red-300 border border-red-500/30"
                      }`}
                    >
                      {isTata ? "Tata Motors" : "Hero MotoCorp"}
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                      {loc.type === "both"
                        ? "Sales & Certified Service"
                        : loc.type === "service"
                        ? "Service Only"
                        : "Sales Showroom"}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Verified Facility
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-white tracking-tight">{loc.name}</h3>

                <div className="mt-3 space-y-2 text-sm text-neutral-300">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span className="text-xs text-neutral-400">{loc.hours}</span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="mt-5 pt-4 border-t border-neutral-800 flex flex-wrap items-center gap-3">
                  <a
                    href={`tel:${loc.phone.replace(/[\s\-\(\)]/g, "")}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    Call {loc.phone}
                  </a>

                  {loc.whatsapp && (
                    <a
                      href={`https://wa.me/${loc.whatsapp.replace(/[\s\+\-]/g, "")}?text=${encodeURIComponent(
                        `Hello, I would like to enquire about ${loc.name}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      WhatsApp
                    </a>
                  )}

                  {loc.mapUrl && (
                    <a
                      href={loc.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-800/60 hover:bg-neutral-700/60 text-neutral-300 hover:text-white text-xs font-medium transition-colors ml-auto"
                    >
                      <Navigation className="w-3.5 h-3.5 text-neutral-400" />
                      Get Directions
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Map Preview Panel */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-400">Map Overview</span>
                <h4 className="text-sm font-bold text-white truncate max-w-[240px]">
                  {activeLocation ? activeLocation.name : "Select an outlet"}
                </h4>
              </div>
              {activeLocation?.mapUrl && (
                <a
                  href={activeLocation.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-neutral-300 hover:text-white bg-neutral-800 px-2.5 py-1 rounded-md transition-colors"
                >
                  Open in Maps
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              )}
            </div>

            {/* Map Frame / Fallback */}
            <div className="relative aspect-4/3 w-full bg-neutral-950 flex items-center justify-center">
              {activeLocation ? (
                <iframe
                  title={`Map showing ${activeLocation.name}`}
                  width="100%"
                  height="100%"
                  className="border-0 filter grayscale contrast-125 opacity-90 hover:filter-none transition-all duration-300"
                  loading="lazy"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    `${activeLocation.name}, ${activeLocation.address}`
                  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                />
              ) : (
                <div className="text-center p-6 text-neutral-500">
                  <MapPin className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-xs">Select an outlet to view directions and location</p>
                </div>
              )}
            </div>

            {/* Selected Location Summary Strip */}
            {activeLocation && (
              <div className="p-4 bg-neutral-950/80 text-xs text-neutral-300 border-t border-neutral-800 space-y-1">
                <p className="font-medium text-white">{activeLocation.name}</p>
                <p className="text-neutral-400 text-[11px] leading-relaxed">{activeLocation.address}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
