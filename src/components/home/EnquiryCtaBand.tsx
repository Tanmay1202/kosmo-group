import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, MessageSquare } from "lucide-react";
import { SITE_CONFIG } from "@/config";

export function EnquiryCtaBand() {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] pointer-events-none rounded-full"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 blur-[100px] pointer-events-none rounded-full"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-8 sm:p-12 lg:p-16 rounded-3xl border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
          
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-3">
              One Unified Lead Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Looking for a New Ride or Authorized Service?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Connect directly with our dedicated Kosmo Tata and Kosmo Hero advisory teams for VIP doorstep test drives, transparent trade-in quotes, and fast finance approvals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-950 font-bold text-sm sm:text-base hover:bg-slate-100 transition shadow-md hover:shadow-lg active:scale-[0.99]"
            >
              <span>Submit General Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${SITE_CONFIG.office.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-white font-bold text-sm sm:text-base transition"
            >
              <PhoneCall className="w-4 h-4 text-slate-400" />
              <span>Call Group Desk</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
