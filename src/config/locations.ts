import type { Brand } from "./brands";

export type Location = {
  id: string;
  brand: Brand["slug"];
  name: string;
  address: string; // exact string from live dealership portals
  city: string;
  pincode: string;
  phone: string; // client-confirmed phone
  whatsapp?: string;
  hours: string;
  type: "sales" | "service" | "both";
  mapUrl?: string;
  verified: boolean; // false => hidden in production builds
};

export const LOCATIONS: Location[] = [
  // --- KOSMO TATA LOCATIONS (Verified from kosmo-tata.vercel.app/dealer-locator) ---
  {
    id: "tata-jalandhar-main",
    brand: "tata",
    name: "Kosmo Tata - Flagship Jalandhar",
    address: "Kosmo Tata Motors, GT Road, Jalandhar, Punjab - 144001",
    city: "Jalandhar",
    pincode: "144001",
    phone: "+91 70451-69141",
    whatsapp: "+91 70451 69141",
    hours: "09:30 AM - 07:00 PM (Mon-Sun)",
    type: "both",
    mapUrl: "https://maps.google.com/?q=Kosmo+Tata+Motors+GT+Road+Jalandhar",
    verified: true,
  },
  {
    id: "tata-ludhiana-jp",
    brand: "tata",
    name: "Kosmo JP Mobility - Ludhiana",
    address: "G.T. Road, Dhandari Kalan, Ludhiana – 141014",
    city: "Ludhiana",
    pincode: "141014",
    phone: "+91 91670-58038",
    whatsapp: "+91 97800 26839",
    hours: "09:30 AM - 07:00 PM (Mon-Sun)",
    type: "both",
    mapUrl: "https://maps.google.com/?q=Kosmo+JP+Mobility+GT+Road+Dhandari+Kalan+Ludhiana",
    verified: true, // Confirmed on kosmo-tata.vercel.app/dealer-locator (GM: Raghav Ahuja)
  },
  {
    id: "tata-dasuya",
    brand: "tata",
    name: "Kosmo Tata - Dasuya",
    address: "GT Road, Dasuya, Punjab - 144205",
    city: "Dasuya",
    pincode: "144205",
    phone: "+91 91673-72329",
    hours: "09:30 AM - 07:00 PM (Mon-Sun)",
    type: "both",
    mapUrl: "https://maps.google.com/?q=Kosmo+Tata+Motors+GT+Road+Dasuya",
    verified: true, // Confirmed on kosmo-tata.vercel.app/dealer-locator (GM: Pritpal Mehta)
  },
  {
    id: "tata-hoshiarpur",
    brand: "tata",
    name: "Kosmo Tata - Hoshiarpur",
    address: "245, Main Jalandhar Road, Singriwal, Hoshiarpur - 146022",
    city: "Hoshiarpur",
    pincode: "146022",
    phone: "+91 91673-72329",
    hours: "09:30 AM - 07:00 PM (Mon-Sun)",
    type: "both",
    mapUrl: "https://maps.google.com/?q=245+Main+Jalandhar+Road+Singriwal+Hoshiarpur",
    verified: true, // Confirmed on kosmo-tata.vercel.app/dealer-locator (GM: Pawan Naialwal)
  },

  // --- KOSMO HERO LOCATIONS (Verified from kosmo-hero.vercel.app/dealer-locator) ---
  {
    id: "hero-jalandhar-lamba-pind",
    brand: "hero",
    name: "Kosmo Hero - Head Branch (Lamba Pind Chowk)",
    address: "G.T Road, Near Lamba Pind Chowk, Jalandhar, Punjab - 144001",
    city: "Jalandhar",
    pincode: "144001",
    phone: "+91 92899-22739",
    whatsapp: "+91 92899 22739",
    hours: "09:30 AM - 07:00 PM (Mon-Sun)",
    type: "both",
    mapUrl: "https://maps.google.com/?q=GT+Road+Near+Lamba+Pind+Chowk+Jalandhar",
    verified: true,
  },
  {
    id: "hero-jalandhar-model-house",
    brand: "hero",
    name: "Kosmo Hero - Model House (Basti Sheikh)",
    address: "Opp. Royal Palace, Basti Sheikh Rd, Model House, Jalandhar, Punjab - 144001",
    city: "Jalandhar",
    pincode: "144001",
    phone: "+91 78143-03163",
    whatsapp: "+91 78143 03163",
    hours: "09:30 AM - 07:00 PM (Mon-Sun)",
    type: "both",
    mapUrl: "https://maps.google.com/?q=Basti+Sheikh+Rd+Model+House+Jalandhar",
    verified: true, // Confirmed active on kosmo-hero.vercel.app/dealer-locator
  },
  {
    id: "hero-jalandhar-bus-stand",
    brand: "hero",
    name: "Kosmo Hero - Jawahar Nagar (Opp. Bus Stand)",
    address: "39, G.T Road, Opp. Bus Stand, Jawahar Nagar, Jalandhar, Punjab - 144001",
    city: "Jalandhar",
    pincode: "144001",
    phone: "+91 77173-03578",
    whatsapp: "+91 77173 03578",
    hours: "09:30 AM - 07:00 PM (Mon-Sun)",
    type: "sales",
    mapUrl: "https://maps.google.com/?q=39+GT+Road+Opp+Bus+Stand+Jawahar+Nagar+Jalandhar",
    verified: true, // Confirmed active on kosmo-hero.vercel.app/dealer-locator
  },
  {
    id: "hero-jalandhar-kishangarh",
    brand: "hero",
    name: "Kosmo Hero - Kishangarh (Highway Branch)",
    address: "Jalandhar-Pathankot Highway, Kishangarh, Jalandhar District, Punjab - 144301",
    city: "Jalandhar",
    pincode: "144301",
    phone: "+91 70871-17350",
    whatsapp: "+91 70871 17350",
    hours: "09:30 AM - 07:00 PM (Mon-Sun)",
    type: "both",
    mapUrl: "https://maps.google.com/?q=Jalandhar-Pathankot+Highway+Kishangarh+Punjab",
    verified: true, // Confirmed active on kosmo-hero.vercel.app/dealer-locator
  },
  {
    id: "hero-jalandhar-urban-estate",
    brand: "hero",
    name: "Kosmo Hero - Urban Estate Phase-1 (Upcoming)",
    address: "Opp. Gurudwara Singh Sabha, Urban Estate Phase-1, Jalandhar, Punjab - 144005",
    city: "Jalandhar",
    pincode: "144005",
    phone: "+91 92899-22739",
    hours: "Opening Soon",
    type: "both",
    mapUrl: "https://maps.google.com/?q=Urban+Estate+Phase-1+Jalandhar",
    verified: false, // Explicitly marked as "Upcoming Dealership • Opening Soon" on live site
  },
];

/**
 * Filter to locations that have verified: true.
 * Unverified / upcoming branches are excluded from public operational lists to prevent publishing premature claims.
 */
export function getVerifiedLocations(brandSlug?: string): Location[] {
  return LOCATIONS.filter((loc) => {
    if (!loc.verified) return false;
    if (brandSlug && loc.brand !== brandSlug) return false;
    return true;
  });
}
