import type { Metadata } from "next";
import { BRANDS } from "@/config";
import { BrandCard } from "@/components/home/BrandCard";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Brand Portfolio | Kosmo Tata & Kosmo Hero",
  description:
    "Explore the authorized automobile dealerships of Kosmo Group in Punjab: Kosmo Tata passenger vehicles and Kosmo Hero MotoCorp two-wheelers.",
};

export default function BrandsPage() {
  return (
    <div className="py-12 sm:py-16 lg:py-20 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Direct Manufacturer Portals
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Our Brand Dealerships
          </h1>
          <p className="mt-4 text-lg text-neutral-300 leading-relaxed">
            Each brand within the Kosmo Group operates with dedicated showrooms, certified workshops, and factory-trained personnel tailored specifically to manufacturer guidelines.
          </p>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRANDS.map((brand) => (
            <BrandCard key={brand.slug} brand={brand} />
          ))}

          {/* Coming Soon Card */}
          <div className="rounded-2xl bg-neutral-900/40 border border-dashed border-neutral-800 p-8 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 text-neutral-400 text-xs font-medium uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Network Expansion
              </div>
              <h3 className="text-2xl font-bold text-neutral-200">Future Mobility Partnerships</h3>
              <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                Kosmo Group continues to evaluate emerging mobility and electric vehicle frontiers across Punjab. Additional brand partnerships will be announced here.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800/60">
              <span className="text-xs text-neutral-500 font-medium">
                Authorized dealership expansion inquiries welcome.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
