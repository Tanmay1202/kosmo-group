import React from "react";
import { SITE_CONFIG, areStatsVerified } from "@/config";

export function StatStrip() {
  // Ground rule: Hide completely unless all stats are non-placeholder and verified by client
  if (!areStatsVerified(SITE_CONFIG.stats) || !SITE_CONFIG.stats) {
    return null;
  }

  const { stats } = SITE_CONFIG;

  const statItems = [
    { label: "Years of Automotive Trust", value: stats.yearsInBusiness },
    { label: "Vehicles Delivered", value: stats.vehiclesDelivered },
    { label: "Authorized Outlets in Punjab", value: stats.outletsCount },
    { label: "Happy Customers", value: stats.happyCustomers },
  ].filter((item) => item.value && !item.value.includes("TODO_CLIENT"));

  if (statItems.length === 0) return null;

  return (
    <section className="bg-slate-900 text-white py-14 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          {statItems.map((item, idx) => (
            <div key={idx} className="pt-4 lg:pt-0 lg:px-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {item.value}
              </div>
              <div className="mt-2 text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
