import React from "react";
import Link from "next/link";
import { BRANDS, SITE_CONFIG } from "@/config";
import { Phone, Mail, MapPin, ShieldAlert, Clock, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f1216] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Group Assurance Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-12 border-b border-slate-800/80">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-slate-800/60 text-slate-300 shrink-0">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white uppercase tracking-wider">24x7 Roadside Assistance</h4>
              <p className="text-xs text-slate-400 mt-1">
                Toll-Free Punjab Support:{" "}
                <a href={`tel:${SITE_CONFIG.emergencyRSA.tollFree}`} className="text-white font-semibold hover:underline">
                  {SITE_CONFIG.emergencyRSA.tollFree}
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-slate-800/60 text-slate-300 shrink-0">
              <Clock className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white uppercase tracking-wider">Working Hours</h4>
              <p className="text-xs text-slate-400 mt-1">{SITE_CONFIG.office.hours}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-slate-800/60 text-slate-300 shrink-0">
              <MapPin className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white uppercase tracking-wider">Punjab Regional Office</h4>
              <p className="text-xs text-slate-400 mt-1">
                {SITE_CONFIG.office.address}, {SITE_CONFIG.office.city} - {SITE_CONFIG.office.pincode}
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-slate-800/80">
          
          {/* Col 1: Group Description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-white text-slate-950 flex items-center justify-center font-bold text-sm">
                K
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white uppercase">
                {SITE_CONFIG.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Punjab&apos;s trusted multi-brand automotive network. Uniting authorized passenger car and two-wheeler dealerships with certified workshops, transparent finance, and doorstep customer care.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500" />
                <a href={`tel:${SITE_CONFIG.office.phone}`} className="hover:text-white transition">
                  {SITE_CONFIG.office.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500" />
                <a href={`mailto:${SITE_CONFIG.office.email}`} className="hover:text-white transition">
                  {SITE_CONFIG.office.email}
                </a>
              </p>
            </div>
          </div>

          {/* Col 2: Brand Dealerships */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">
              Our Brands
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {BRANDS.map((brand) => (
                <li key={brand.slug}>
                  <a
                    href={brand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition flex items-center gap-1.5 group"
                  >
                    <span>{brand.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-white transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">
              Explore Group
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Kosmo Group
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white transition">
                  Brand Portfolios
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-white transition">
                  Dealership Locations
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition">
                  Careers & Hiring
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Group Enquiry Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate Governance & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">
              Governance & Policies
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Corporate Grievances
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Disclaimer Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {currentYear} {SITE_CONFIG.legalEntity}. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-500 text-center md:text-right max-w-md">
            Kosmo Group operates authorized dealerships for independent automotive manufacturers. All brand trademarks, logos, and vehicle nomenclature belong to their respective OEM owners.
          </p>
        </div>

      </div>
    </footer>
  );
}
