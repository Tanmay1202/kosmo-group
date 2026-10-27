import React from "react";
import { Award, ShieldCheck, Wrench, Sparkles } from "lucide-react";

export function WhyKosmoSection() {
  const points = [
    {
      icon: Award,
      title: "Authorized OEM Partnerships",
      description:
        "Direct manufacturer backing for Tata Motors and Hero MotoCorp, ensuring authentic warranties, certified pricing, and official vehicle allocations.",
    },
    {
      icon: ShieldCheck,
      title: "Dedicated Regional Network",
      description:
        "Multi-branch presence across Jalandhar and Punjab with state-of-the-art showrooms, dedicated customer lounges, and easy highway access.",
    },
    {
      icon: Wrench,
      title: "Master Mechanics & Genuine Parts",
      description:
        "Factory-trained master technicians utilizing computerized diagnostic scan tools and 100% genuine OEM spare parts and approved lubricants.",
    },
    {
      icon: Sparkles,
      title: "Transparent & Digital First",
      description:
        "Instant doorstep test drive bookings, digital trade-in valuations, rapid finance processing, and direct WhatsApp communication.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-3">
            The Group Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Why Punjab Chooses Kosmo Group
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Delivering automotive trust, operational integrity, and certified after-sales care across every vehicle category.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-6 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                    {pt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pt.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
