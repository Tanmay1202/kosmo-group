import React from "react";
import { HomeHero } from "@/components/home/HomeHero";
import { BrandCard } from "@/components/home/BrandCard";
import { WhyKosmoSection } from "@/components/home/WhyKosmoSection";
import { StatStrip } from "@/components/home/StatStrip";
import { LocationsTeaser } from "@/components/home/LocationsTeaser";
import { EnquiryCtaBand } from "@/components/home/EnquiryCtaBand";
import { BRANDS } from "@/config";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HomeHero />

      {/* 2. Brand Cards Section (Driven by brands config) */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-3">
              Automotive Brands
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Our Automotive Dealerships
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Each brand operates under the Kosmo umbrella with dedicated flagship showrooms, certified technicians, and direct manufacturer certification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {BRANDS.map((brand) => (
              <BrandCard key={brand.slug} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why Kosmo Section */}
      <WhyKosmoSection />

      {/* 4. Numbers Strip (Renders only if all stats non-placeholder; hidden otherwise) */}
      <StatStrip />

      {/* 5. Locations Teaser Section */}
      <LocationsTeaser />

      {/* 6. Enquiry CTA Band */}
      <EnquiryCtaBand />
    </div>
  );
}
