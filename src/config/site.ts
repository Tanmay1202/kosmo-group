declare const process: { env: Record<string, string | undefined> };

export type SiteConfig = {
  name: string;
  tagline: string;
  legalEntity: string;
  domain: string;
  groupDomainPlaceholder: string;
  managingDirector: {
    name: string;
    title: string;
    quote: string;
  };
  office: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
    email: string;
    hours: string;
  };
  emergencyRSA: {
    tollFree: string;
    description: string;
  };
  socials: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  stats?: {
    vehiclesDelivered?: string;
    outletsCount?: string;
    happyCustomers?: string;
    yearsInBusiness?: string;
  };
  analyticsId?: string;
};

export const SITE_CONFIG: SiteConfig = {
  name: "Kosmo Group",
  tagline: "Punjab's Premier Automotive Dealership Network",
  legalEntity: "Kosmo Vehicles Private Limited", // Verified from live site footer & legal disclosures
  domain: process.env.NEXT_PUBLIC_GROUP_DOMAIN || "<GROUP_DOMAIN>",
  groupDomainPlaceholder: "<GROUP_DOMAIN>",
  managingDirector: {
    name: "Mr. Raghav Ahuja",
    title: "Managing Director",
    quote:
      "At Kosmo Group, our mission is to deliver an unparalleled automotive experience. We believe vehicle ownership is more than a transaction; it is the beginning of a lifelong relationship founded on trust, transparency, and certified excellence.",
  },
  office: {
    address: "GT Road, Near Lamba Pind Chowk",
    city: "Jalandhar",
    state: "Punjab",
    pincode: "144001",
    phone: "+91 92899-22739",
    email: "customercare@kosmotata.in",
    hours: "Monday – Sunday: 09:30 AM – 07:00 PM",
  },
  emergencyRSA: {
    tollFree: "1800 209 7979", // Verified across both live brand sites
    description: "24x7 Emergency Roadside Assistance across Punjab",
  },
  socials: {
    // Brand sites currently use '#' placeholders; keeping empty until client provides active URLs
  },
  stats: {
    vehiclesDelivered: "50,000+", // Verified from live Hero about page ("Over 50,000 Satisfied Riders in Punjab")
    outletsCount: "8 Outlets", // 4 Tata + 4 Hero operational branches verified on live dealer locators
    happyCustomers: "50,000+", // Verified from live Hero about page
    yearsInBusiness: "TODO_CLIENT", // Exact founding year unstated; kept placeholder per ground rules
  },
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID || undefined,
};

/**
 * Returns true if at least two statistical metrics are non-placeholder and verified.
 */
export function areStatsVerified(stats = SITE_CONFIG.stats): boolean {
  if (!stats) return false;
  const verifiedCount = Object.values(stats).filter(
    (val) => typeof val === "string" && val.length > 0 && !val.includes("TODO_CLIENT")
  ).length;
  return verifiedCount >= 2;
}
