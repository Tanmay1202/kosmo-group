import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Briefcase, GraduationCap, TrendingUp, Users, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers | Join Kosmo Group Automotive Dealerships",
  description:
    "Build a rewarding automotive career in Punjab with Kosmo Group. Openings across Tata Motors & Hero MotoCorp dealership sales, master service, and administration.",
};

const DEPARTMENTS = [
  {
    title: "Automotive Sales & EV Advisory",
    description:
      "Engage customers, demonstrate leading Tata passenger cars and Hero two-wheelers, coordinate test drives, and facilitate vehicle deliveries.",
    locations: "Jalandhar Outlets",
    type: "Full-Time",
  },
  {
    title: "Certified Master Technicians",
    description:
      "Perform precision vehicle diagnostics, OEM warranty servicing, electronic troubleshooting, and component maintenance in world-class workshop facilities.",
    locations: "Flagship Service Centers",
    type: "Technical Certified",
  },
  {
    title: "Service Advisors & Customer Experience",
    description:
      "Guide owners through service check-ins, estimate repair scopes transparently, coordinate status updates, and ensure customer satisfaction.",
    locations: "Jalandhar Outlets",
    type: "Full-Time",
  },
  {
    title: "Finance, Insurance & Corporate Desk",
    description:
      "Assist buyers with auto loan approvals, insurance renewals, exchange valuations, and registration documentation.",
    locations: "Group Head Office",
    type: "Full-Time",
  },
];

const PERKS = [
  {
    icon: GraduationCap,
    title: "OEM Manufacturer Training",
    description: "Receive direct, certified factory training and skill upgrades from Tata Motors and Hero MotoCorp.",
  },
  {
    icon: TrendingUp,
    title: "Merit-Based Growth",
    description: "Clear internal promotion ladders from technician to workshop manager, sales consultant to division head.",
  },
  {
    icon: Users,
    title: "Professional Culture",
    description: "Collaborative team environment prioritizing safety, respect, work-life balance, and continuous learning.",
  },
  {
    icon: HeartHandshake,
    title: "Competitive Compensation",
    description: "Industry-competitive basic salary plus performance-linked incentive bonuses and health coverage.",
  },
];

export default function CareersPage() {
  return (
    <div className="py-12 sm:py-16 lg:py-20 space-y-16 sm:space-y-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            People &amp; Culture
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Build Your Automotive Career With Kosmo Group
          </h1>
          <p className="mt-4 text-lg text-neutral-300 leading-relaxed">
            Join one of Punjab&apos;s leading automotive networks. We cultivate talent, provide direct manufacturer certification, and foster an environment where automotive professionals thrive.
          </p>
        </div>
      </section>

      {/* Culture & Perks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PERKS.map((perk) => {
            const Icon = perk.icon;
            return (
              <div key={perk.title} className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 flex flex-col justify-between">
                <Icon className="w-8 h-8 text-amber-400 mb-4" />
                <div>
                  <h3 className="text-base font-bold text-white mb-2">{perk.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{perk.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Active Departments & Open Application */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Department List */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">Department Streams</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Where You Can Make An Impact
              </h2>
              <p className="mt-2 text-sm text-neutral-400">
                We recruit talent across sales, technical operations, customer care, and leadership tracks.
              </p>
            </div>

            <div className="space-y-4">
              {DEPARTMENTS.map((dept) => (
                <div
                  key={dept.title}
                  className="rounded-xl bg-neutral-900/60 border border-neutral-800/80 p-5 hover:bg-neutral-900 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-white">{dept.title}</h3>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {dept.type}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-neutral-400 leading-relaxed">{dept.description}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-neutral-500">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{dept.locations}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div className="lg:col-span-6">
            <EnquiryForm
              defaultType="career"
              title="Apply to Kosmo Group"
              subtitle="Submit your profile to our talent team. Please specify your role of interest and relevant background in the message field."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
