declare const process: { env: Record<string, string | undefined> };

export type Brand = {
  slug: "tata" | "hero" | (string & {});
  name: string; // e.g. "Kosmo Tata"
  tagline: string; // one line, client-approved
  url: string; // resolved destination URL
  accent: string; // hex, from Phase 0 tokens
  services: string[]; // only what the brand site really offers
  enquiryRecipients: string[]; // env-resolved at runtime, never literal emails
  status: "live" | "coming-soon";
  description?: string;
};

export function getTataUrl(): string {
  if (process.env.NEXT_PUBLIC_TATA_URL && !process.env.NEXT_PUBLIC_TATA_URL.includes("<")) {
    return process.env.NEXT_PUBLIC_TATA_URL;
  }
  const domain = process.env.NEXT_PUBLIC_GROUP_DOMAIN;
  if (domain && !domain.includes("<")) {
    return `https://tata.${domain}`;
  }
  if (typeof process !== "undefined" && process.env.NODE_ENV === "development") {
    return "http://localhost:3001";
  }
  return "https://kosmo-tata.vercel.app";
}

export function getHeroUrl(): string {
  if (process.env.NEXT_PUBLIC_HERO_URL && !process.env.NEXT_PUBLIC_HERO_URL.includes("<")) {
    return process.env.NEXT_PUBLIC_HERO_URL;
  }
  const domain = process.env.NEXT_PUBLIC_GROUP_DOMAIN;
  if (domain && !domain.includes("<")) {
    return `https://hero.${domain}`;
  }
  if (typeof process !== "undefined" && process.env.NODE_ENV === "development") {
    return "http://localhost:5173";
  }
  return "https://kosmo-hero.vercel.app";
}

export const BRANDS: Brand[] = [
  {
    slug: "tata",
    name: "Kosmo Tata",
    tagline: "Nothing's Too Far.",
    url: getTataUrl(),
    accent: "#2334f5",
    services: ["New Cars", "Doorstep Test Drive", "Authorized Service", "Exchange", "Car Finance"],
    enquiryRecipients: ["LEADS_TO_TATA"],
    status: "live",
    description: "Punjab's flagship digital dealership featuring the complete Tata Motors passenger car and EV range.",
  },
  {
    slug: "hero",
    name: "Kosmo Hero",
    tagline: "Punjab’s premier destination for Hero MotoCorp two-wheelers.",
    url: getHeroUrl(),
    accent: "#ee2326",
    services: ["Motorcycles", "Scooters", "Instant Test Ride", "Joyride Workshop", "Hero Sure Exchange", "Hero FinCorp"],
    enquiryRecipients: ["LEADS_TO_HERO"],
    status: "live",
    description: "Authorized multi-branch dealership network offering certified Hero motorcycles, scooters, and genuine parts.",
  },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug);
}
