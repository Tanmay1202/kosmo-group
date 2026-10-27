import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { MapPin, Phone, Mail, Clock, ShieldAlert, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Kosmo Group | Dealership Enquiries & Head Office",
  description:
    "Contact Kosmo Group head office in Jalandhar or connect with Kosmo Tata and Kosmo Hero dealerships for sales, service, or test drive enquiries.",
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-16 lg:py-20 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Unified Customer Desk
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Connect With Kosmo Group
          </h1>
          <p className="mt-4 text-lg text-neutral-300 leading-relaxed">
            Have questions regarding new Tata passenger vehicles, Hero MotoCorp two-wheelers, authorized maintenance, or group relations? Our dedicated customer team is here to assist.
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Info + Enquiry Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Office Details & Emergency Assistance */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-white tracking-tight">Group Headquarters</h2>

              <div className="space-y-4 text-sm text-neutral-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">{SITE_CONFIG.office.address}</p>
                    <p className="text-neutral-400 text-xs mt-0.5">
                      {SITE_CONFIG.office.city}, {SITE_CONFIG.office.state} - {SITE_CONFIG.office.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <a
                      href={`tel:${SITE_CONFIG.office.phone.replace(/[\s\-\(\)]/g, "")}`}
                      className="text-white hover:text-amber-400 font-medium transition-colors"
                    >
                      {SITE_CONFIG.office.phone}
                    </a>
                    <p className="text-neutral-500 text-xs">Direct Office Line</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <a
                      href={`mailto:${SITE_CONFIG.office.email}`}
                      className="text-white hover:text-amber-400 font-medium transition-colors"
                    >
                      {SITE_CONFIG.office.email}
                    </a>
                    <p className="text-neutral-500 text-xs">General &amp; Corporate Correspondence</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-neutral-800">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Operating Hours</p>
                    <p className="text-neutral-400 text-xs mt-0.5">{SITE_CONFIG.office.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency RSA Card */}
            <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 p-6 space-y-3">
              <div className="flex items-center gap-2 text-rose-400">
                <ShieldAlert className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider">Emergency Breakdown</h3>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                If you are stranded on the road or need immediate towing / mechanical assistance across Punjab, dial our 24x7 helpline:
              </p>
              <a
                href={`tel:${SITE_CONFIG.emergencyRSA.tollFree.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-white font-semibold text-sm transition-colors w-full justify-center border border-neutral-700"
              >
                <Phone className="w-4 h-4 text-rose-400" />
                {SITE_CONFIG.emergencyRSA.tollFree} (Toll-Free)
              </a>
            </div>

            {/* Verification Guarantee */}
            <div className="rounded-xl bg-neutral-950/60 border border-neutral-800/80 p-5 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-neutral-400 leading-relaxed">
                <strong className="text-neutral-200">Guaranteed Response:</strong> All online test drive and service enquiries submitted here are routed directly to dedicated brand customer executives and verified within operating hours.
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <EnquiryForm
              title="Send Us An Enquiry"
              subtitle="Fill out the details below. Our team will coordinate your test drive, service appointment, or general request promptly."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
