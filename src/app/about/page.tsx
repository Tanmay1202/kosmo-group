import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/config";
import { ShieldCheck, Award, Users, Wrench, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Kosmo Group | Automotive Leadership in Punjab",
  description:
    "Learn about Kosmo Group, authorized dealer group for Tata Motors and Hero MotoCorp in Jalandhar and Punjab, led by Managing Director Mr. Raghav Ahuja.",
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Direct OEM Partnerships",
    description:
      "Every vehicle, component, and procedure strictly follows official manufacturer standards from Tata Motors and Hero MotoCorp.",
  },
  {
    icon: Wrench,
    title: "Master Certified Service",
    description:
      "Our technicians receive rigorous, factory-authorized training and operate with manufacturer-prescribed diagnostic technologies.",
  },
  {
    icon: Users,
    title: "Lifelong Customer Commitment",
    description:
      "We believe buying a vehicle is not a one-time transaction, but the start of an ongoing relationship supporting you through every kilometer.",
  },
  {
    icon: Award,
    title: "Transparent Dealership Culture",
    description:
      "No hidden fees, no ambiguous promises. We provide clear pricing, honest exchange evaluations, and fair finance options.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16 lg:py-20 space-y-16 sm:space-y-24">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Authorized Dealer Group
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Connecting Punjab with Automotive Excellence
          </h1>
          <p className="mt-6 text-lg text-neutral-300 leading-relaxed">
            Kosmo Group operates authorized flagship automotive dealerships across Punjab, representing India&apos;s most respected mobility brands:{" "}
            <span className="text-white font-medium">Tata Motors Passenger Vehicles</span> and{" "}
            <span className="text-white font-medium">Hero MotoCorp Two-Wheelers</span>.
          </p>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-400">
              Leadership Perspective
            </span>
            <blockquote className="mt-4 text-xl sm:text-2xl text-neutral-100 font-medium leading-relaxed italic">
              &ldquo;{SITE_CONFIG.managingDirector.quote}&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-lg">
                RA
              </div>
              <div>
                <h4 className="text-base font-bold text-white">{SITE_CONFIG.managingDirector.name}</h4>
                <p className="text-xs text-neutral-400">{SITE_CONFIG.managingDirector.title}, Kosmo Group</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Group Story & Operations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              One Corporate Umbrella, Specialized Dealership Teams
            </h2>
            <div className="mt-6 space-y-4 text-neutral-300 text-base leading-relaxed">
              <p>
                Founded to serve automotive buyers in Punjab with transparency and reliability, Kosmo Group unites multi-brand capability under unified governance.
              </p>
              <p>
                Whether a customer walks into <strong className="text-white">Kosmo Tata</strong> on GT Road for an electric or ICE SUV, or visits <strong className="text-white">Kosmo Hero</strong> at Lamba Pind Chowk for India&apos;s most reliable two-wheelers, they experience certified facilities, factory-original parts, and authentic service protocols.
              </p>
              <p>
                Our digital hub connects all branches, making test drive bookings, service appointments, and corporate communications seamless across the region.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="rounded-2xl bg-neutral-900/70 border border-neutral-800 p-6 flex flex-col justify-between"
                >
                  <Icon className="w-8 h-8 text-amber-400 mb-4" />
                  <div>
                    <h3 className="text-base font-bold text-white mb-2">{val.title}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">{val.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Explore Our Dealership Network</h3>
            <p className="mt-2 text-sm text-neutral-400">
              Visit our dedicated brand websites or discover our authorized showroom locations.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-sm transition-colors"
            >
              Our Brands
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-sm transition-colors"
            >
              View Locations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
