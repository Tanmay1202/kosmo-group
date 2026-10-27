import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config";

export const metadata: Metadata = {
  title: "Privacy Policy | Kosmo Group",
  description:
    "Privacy Policy and customer data protection standards for Kosmo Group and its authorized dealership portals under the Digital Personal Data Protection Act (DPDPA), 2023.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Legal &amp; Compliance
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-neutral-400">
            Last updated: October 2026 • Governed by Kosmo Group ({SITE_CONFIG.legalEntity})
          </p>
        </div>

        <div className="text-sm text-neutral-300 leading-relaxed space-y-6 pt-4 border-t border-neutral-800">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Introduction &amp; Scope</h2>
            <p>
              Kosmo Group (operating through &quot;{SITE_CONFIG.legalEntity}&quot; and its authorized brand dealerships including Kosmo Tata and Kosmo Hero) is committed to safeguarding the privacy and personal data of our customers, website visitors, and service users.
            </p>
            <p>
              This Privacy Policy explains how we collect, process, store, and protect your personal information when you visit our digital hub ({SITE_CONFIG.domain}), request test drives or test rides, book vehicle servicing, apply for financing, or submit employment applications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Compliance with DPDPA 2023</h2>
            <p>
              We process personal data strictly in compliance with India&apos;s Digital Personal Data Protection Act, 2023 (DPDPA 2023). We only collect data with your voluntary, informed consent for specified dealership purposes, and retain information only as long as necessary to fulfill those automotive service or regulatory requirements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Information We Collect</h2>
            <p>When you interact with our websites and showrooms, we may collect:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
              <li>
                <strong className="text-neutral-200">Contact Details:</strong> Full name, telephone/mobile number, email address, and residential/business city.
              </li>
              <li>
                <strong className="text-neutral-200">Vehicle Preferences:</strong> Brand division (Tata Cars / Hero Two-Wheelers), vehicle model of interest, variant, preferred dealership location, and scheduled test drive timing.
              </li>
              <li>
                <strong className="text-neutral-200">Service &amp; Ownership Data:</strong> Existing vehicle registration number, chassis/VIN (when scheduling workshop service), and trade-in exchange specifications.
              </li>
              <li>
                <strong className="text-neutral-200">Technical Log Information:</strong> IP address, device type, browser metadata, and referral sources (UTM parameters) collected automatically for security and lead routing analytics.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Purpose of Data Processing</h2>
            <p>Your personal data is used solely for the following legitimate purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
              <li>Scheduling doorstep or showroom test drives and test rides.</li>
              <li>Processing workshop maintenance bookings and genuine parts inquiries.</li>
              <li>Assisting with auto finance quotes, EMI calculators, and insurance renewals through authorized financial partners.</li>
              <li>Communicating order status, delivery schedules, and vehicle service reminders via phone, SMS, WhatsApp, or email.</li>
              <li>Evaluating candidate applications submitted through our Careers desk.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. Information Sharing &amp; Third Parties</h2>
            <p>
              <strong className="text-white">We never sell, trade, or rent your personal information to third-party marketers.</strong>
            </p>
            <p>
              Personal data is shared strictly on a need-to-know basis with:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
              <li>Official Original Equipment Manufacturers (OEMs: Tata Motors Limited, Hero MotoCorp Limited) for vehicle warranty registration, subsidies, and official recalls.</li>
              <li>Authorized lending banks and NBFCs, strictly upon your affirmative request for vehicle financing assistance.</li>
              <li>Government vehicle registration and transport authorities (Vahan / RTO) to execute vehicle registration.</li>
              <li>Trusted cloud hosting, communications, and database infrastructure providers bound by non-disclosure and security covenants.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">6. Data Security &amp; Storage</h2>
            <p>
              We implement industry-standard encryption, firewalls, and role-based access controls to safeguard customer records. Our database servers follow modern security baselines, and lead submissions are encrypted in transit via SSL/TLS.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">7. Your Data Rights</h2>
            <p>Under applicable Indian data protection law, you possess the right to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
              <li>Request a summary of personal data held about you.</li>
              <li>Request correction or updating of inaccurate records.</li>
              <li>Withdraw consent for promotional communications at any time by contacting our privacy desk.</li>
              <li>Nominate a representative in the event of incapacity.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">8. Contact Our Privacy Officer</h2>
            <p>
              For questions regarding this policy or to exercise your data rights, please contact our administrative desk:
            </p>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 space-y-1">
              <p className="font-semibold text-white">Kosmo Group Privacy &amp; Compliance</p>
              <p>{SITE_CONFIG.legalEntity}</p>
              <p>{SITE_CONFIG.office.address}, {SITE_CONFIG.office.city}, {SITE_CONFIG.office.state} - {SITE_CONFIG.office.pincode}</p>
              <p>Email: {SITE_CONFIG.office.email}</p>
              <p>Phone: {SITE_CONFIG.office.phone}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
