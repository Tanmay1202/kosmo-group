import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import { BRANDS } from "@/config";

export function HomeHero() {
  const tataBrand = BRANDS.find((b) => b.slug === "tata") || BRANDS[0];
  const heroBrand = BRANDS.find((b) => b.slug === "hero") || BRANDS[1];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-20 sm:py-28 lg:py-36 border-b border-slate-800">
      {/* Subtle Ambient Radial Lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-red-500/10 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Group Badging */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-semibold tracking-wider uppercase mb-8 shadow-inner">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>One Group • Multi-Brand Dealership Network • Punjab</span>
        </div>

        {/* Primary Group Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] sm:leading-[1.1]">
          Two Automotive Icons. <br />
          <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            One Trusted Group.
          </span>
        </h1>

        {/* Subcopy */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
          Kosmo Group unifies Punjab&apos;s leading automotive dealerships under one standard of excellence. Explore passenger cars with <strong>Kosmo Tata</strong> and two-wheelers with <strong>Kosmo Hero</strong>.
        </p>

        {/* Dual Primary Brand Entry CTAs */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          {/* Tata Brand CTA */}
          <a
            href={`${tataBrand.url}?utm_source=kosmo-hub&utm_medium=hero-cta`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-1/2 flex items-center justify-between px-6 py-4 rounded-xl bg-[#2334f5] hover:bg-blue-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-900/30 transition-all hover:scale-[1.02] active:scale-[0.98] group"
          >
            <span>Explore Kosmo Tata</span>
            <ArrowUpRight className="w-5 h-5 text-white/80 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Hero Brand CTA */}
          <a
            href={`${heroBrand.url}?utm_source=kosmo-hub&utm_medium=hero-cta`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-1/2 flex items-center justify-between px-6 py-4 rounded-xl bg-[#ee2326] hover:bg-red-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-red-900/30 transition-all hover:scale-[1.02] active:scale-[0.98] group"
          >
            <span>Explore Kosmo Hero</span>
            <ArrowUpRight className="w-5 h-5 text-white/80 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Quick Micro-Assurance */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-500" />
            <span>Outlets Across Jalandhar & Punjab</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Authorized Manufacturer Facilities</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/locations" className="text-white hover:underline flex items-center gap-1">
              <span>View All Locations</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
