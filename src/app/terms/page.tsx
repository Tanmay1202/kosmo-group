import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config";

export const metadata: Metadata = {
  title: "Terms & Conditions | Kosmo Group",
  description:
    "Terms and conditions governing the use of Kosmo Group digital portals, vehicle bookings, test drives, and dealership services in Punjab.",
};

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Terms of Use
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Terms &amp; Conditions
          </h1>
          <p className="mt-2 text-xs text-neutral-400">
            Last updated: October 2026 • Governed by Kosmo Group ({SITE_CONFIG.legalEntity})
          </p>
        </div>

        <div className="text-sm text-neutral-300 leading-relaxed space-y-6 pt-4 border-t border-neutral-800">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Agreement to Terms</h2>
            <p>
              By accessing or using the digital websites of Kosmo Group (including {SITE_CONFIG.domain} and its subdomains), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please discontinue use of this website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. OEM Trademarks &amp; Authorised Dealership Status</h2>
            <p>
              Kosmo Group operates authorized franchised dealerships for <strong className="text-white">Tata Motors Limited</strong> (Passenger Vehicles &amp; EV) and <strong className="text-white">Hero MotoCorp Limited</strong>.
            </p>
            <p>
              All manufacturer brand names, brand marks, vehicle model designations, product logos, and design trademarks (including but not limited to Tata, Tata Motors, Nexon, Curvv, Harrier, Safari, Punch, Altroz, Tiago, Hero, Hero MotoCorp, Splendor, HF Deluxe, Glamour, Xtreme, and related badges) are the exclusive intellectual property of their respective manufacturers.
            </p>
            <p>
              Use of these trademarks on our digital portals is strictly for accurate descriptive identification of authorized dealership inventory and certified services. Kosmo Group does not claim proprietary rights in OEM trademarks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Vehicle Test Drives &amp; Test Rides</h2>
            <p>
              Booking requests for test drives or test rides submitted via this website are subject to vehicle availability, scheduling confirmation by dealership personnel, and geographic delivery feasibility.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
              <li>Customers must present an original, valid Indian Driving Licence permitting operation of the relevant vehicle class (LMV for cars; MCWG/Two-Wheeler for motorcycles and scooters) prior to commencing any test drive.</li>
              <li>Dealership staff reserve the right to decline or terminate a test drive in the event of adverse weather, unsafe traffic conditions, or driver impairment.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Pricing, Quotations &amp; Specifications</h2>
            <p>
              Prices, features, specifications, and color swatches displayed on this website or in automated quotes are indicative and based on manufacturer published details.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
              <li>Ex-showroom and on-road prices are subject to revision by the manufacturer, statutory tax variations, insurance rate changes, and local RTO registration levies without prior notice.</li>
              <li>The definitive purchase price and applicable schemes are those prevailing on the official date of vehicle invoicing.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. Vehicle Bookings &amp; Allocations</h2>
            <p>
              An online enquiry or booking request does not constitute a guaranteed delivery allocation until formal booking documents and prescribed booking deposits are accepted at an authorized Kosmo dealership showroom. Delivery timeframes are contingent upon manufacturer supply chains and factory allotments.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">6. Limitation of Liability</h2>
            <p>
              Kosmo Group makes every effort to keep digital information up to date. However, we do not guarantee that the portal will be uninterrupted or error-free. To the fullest extent permitted under Indian law, Kosmo Group shall not be liable for incidental, indirect, or consequential damages resulting from digital portal usage.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">7. Governing Law &amp; Jurisdiction</h2>
            <p>
              These Terms and Conditions are governed by and construed in accordance with the laws of the Republic of India. Any disputes arising in connection with these terms or dealership services shall be subject to the exclusive jurisdiction of the competent courts in Jalandhar, Punjab.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
