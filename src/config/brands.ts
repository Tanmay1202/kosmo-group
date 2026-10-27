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

export const TATA_VERCEL_URL = "https://kosmo-tata.vercel.app";
export const HERO_VERCEL_URL = "https://kosmo-hero.vercel.app";

export function getTataUrl(): string {
  return TATA_VERCEL_URL;
}

export function getHeroUrl(): string {
  return HERO_VERCEL_URL;
}

export const BRANDS: Brand[] = [
  {
    slug: "tata",
    name: "Kosmo Tata",
    tagline: "Nothing's Too Far.",
    url: TATA_VERCEL_URL,
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
    url: HERO_VERCEL_URL,
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
