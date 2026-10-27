"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
import { BRANDS } from "@/config";
import { getVerifiedLocations, type Location } from "@/config";
import {
  submitEnquiry,
  type EnquiryBrand,
  type EnquiryType,
  type EnquiryResponse,
} from "@/lib/lead-client";

interface EnquiryFormProps {
  defaultBrand?: EnquiryBrand;
  defaultType?: EnquiryType;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function EnquiryForm({
  defaultBrand = "general",
  defaultType = "test_drive",
  title,
  subtitle,
  className = "",
}: EnquiryFormProps) {
  const [brand, setBrand] = useState<EnquiryBrand>(defaultBrand);
  const [type, setType] = useState<EnquiryType>(defaultType);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(true);
  const [honeypot, setHoneypot] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<EnquiryResponse | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Filter locations according to the selected brand
  const locations: Location[] = getVerifiedLocations(brand === "general" ? undefined : brand);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setResponse(null);

    if (!consent) {
      setFormError("Please provide consent to contact you regarding your enquiry.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitEnquiry({
        name,
        phone,
        email: email || undefined,
        brand,
        type,
        preferredLocation: preferredLocation || undefined,
        message: message || undefined,
        consent,
        honeypot,
        source: "hub",
      });

      setResponse(res);
      if (res.success) {
        // Reset inputs on success
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
      } else {
        setFormError(res.message);
      }
    } catch {
      setFormError("An unexpected error occurred. Please try again or reach out directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl ${className}`}>
      {title && <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>}
      {subtitle && <p className="mt-2 text-sm text-neutral-400">{subtitle}</p>}

      {response?.success ? (
        <div className="mt-6 rounded-xl bg-emerald-950/60 border border-emerald-500/30 p-6 text-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h4 className="mt-3 text-lg font-semibold text-white">Enquiry Received Successfully</h4>
          <p className="mt-2 text-sm text-neutral-300">
            Thank you! Your enquiry has been routed to our dedicated {brand === "tata" ? "Tata Motors" : brand === "hero" ? "Hero MotoCorp" : "Kosmo Group"} team. A representative will contact you shortly.
          </p>
          {response.whatsappUrl && (
            <div className="mt-6">
              <a
                href={response.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Connect on WhatsApp Immediately
              </a>
            </div>
          )}
          <button
            type="button"
            onClick={() => setResponse(null)}
            className="mt-4 block mx-auto text-xs text-neutral-400 hover:text-white underline underline-offset-4"
          >
            Submit another enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {formError && (
            <div className="rounded-lg bg-rose-950/60 border border-rose-500/40 p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <p className="text-sm text-rose-200">{formError}</p>
            </div>
          )}

          {/* Hidden honeypot field for bot spam detection */}
          <input
            type="text"
            name="website_url"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            aria-hidden="true"
          />

          {/* Brand Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
              Select Brand / Division <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setBrand("general")}
                className={`py-2.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
                  brand === "general"
                    ? "bg-neutral-800 border-amber-500/60 text-white shadow-sm"
                    : "bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700"
                }`}
              >
                Kosmo Group
              </button>
              {BRANDS.map((b) => (
                <button
                  key={b.slug}
                  type="button"
                  onClick={() => setBrand(b.slug as EnquiryBrand)}
                  className={`py-2.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
                    brand === b.slug
                      ? "bg-neutral-800 border-amber-500/60 text-white shadow-sm"
                      : "bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700"
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          {/* Enquiry Type & Preferred Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="enquiry-type" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                Enquiry Purpose <span className="text-rose-400">*</span>
              </label>
              <select
                id="enquiry-type"
                value={type}
                onChange={(e) => setType(e.target.value as EnquiryType)}
                className="w-full bg-neutral-950/70 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 focus:outline-none focus:border-amber-500/70 transition-colors"
                required
              >
                <option value="test_drive">Book Test Drive (Car)</option>
                <option value="test_ride">Book Test Ride (Two-Wheeler)</option>
                <option value="service">Authorized Service / Workshop</option>
                <option value="finance">Vehicle Finance &amp; Exchange</option>
                <option value="exchange">Used Vehicle Trade-In</option>
                <option value="career">Career Application</option>
                <option value="other">General Enquiry</option>
              </select>
            </div>

            <div>
              <label htmlFor="enquiry-location" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                Preferred Outlet / Branch
              </label>
              <select
                id="enquiry-location"
                value={preferredLocation}
                onChange={(e) => setPreferredLocation(e.target.value)}
                className="w-full bg-neutral-950/70 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 focus:outline-none focus:border-amber-500/70 transition-colors"
              >
                <option value="">Any Convenient Outlet</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} ({loc.city})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Contact Details: Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="enquiry-name" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                Full Name <span className="text-rose-400">*</span>
              </label>
              <input
                id="enquiry-name"
                type="text"
                required
                placeholder="e.g. Gurpreet Singh"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-neutral-950/70 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/70 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="enquiry-phone" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                Mobile Number <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm font-medium text-neutral-500">+91</span>
                <input
                  id="enquiry-phone"
                  type="tel"
                  required
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-neutral-950/70 border border-neutral-800 rounded-lg pl-12 pr-3.5 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/70 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="enquiry-email" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
              Email Address <span className="text-neutral-500 text-xs font-normal normal-case">(optional)</span>
            </label>
            <input
              id="enquiry-email"
              type="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-950/70 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/70 transition-colors"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="enquiry-message" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
              Specific Requirements / Vehicle Model
            </label>
            <textarea
              id="enquiry-message"
              rows={3}
              placeholder="Mention vehicle model of interest, service requirements, or preferred consultation time..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-neutral-950/70 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/70 transition-colors resize-none"
            />
          </div>

          {/* DPDPA 2023 Consent Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-neutral-700 bg-neutral-900 text-amber-500 focus:ring-amber-500 focus:ring-offset-neutral-900"
              />
              <span className="text-xs text-neutral-400 leading-relaxed">
                I authorize Kosmo Group and its authorized brand dealerships to contact me via phone, SMS, WhatsApp, or email regarding this enquiry. In accordance with our{" "}
                <Link href="/privacy-policy" className="text-amber-400 hover:underline">
                  Privacy Policy
                </Link>
                , your data is handled securely and never sold to third parties.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-neutral-950 font-semibold text-sm transition-all shadow-md hover:shadow-amber-500/20"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                Submitting Enquiry...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Enquiry
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
