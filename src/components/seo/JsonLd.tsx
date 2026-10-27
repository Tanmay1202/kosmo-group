import React from "react";
import { SITE_CONFIG, BRANDS, getVerifiedLocations } from "@/config";

export function JsonLd() {
  const verifiedLocations = getVerifiedLocations();
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (SITE_CONFIG.domain && !SITE_CONFIG.domain.includes("<")
      ? `https://${SITE_CONFIG.domain}`
      : "https://kosmogroup.in");

  // 1. Organization schema with subOrganizations
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalEntity,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: SITE_CONFIG.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.office.address,
      addressLocality: SITE_CONFIG.office.city,
      addressRegion: SITE_CONFIG.office.state,
      postalCode: SITE_CONFIG.office.pincode,
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.office.phone,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["en", "pa", "hi"],
      },
      {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.emergencyRSA.tollFree,
        contactType: "emergency",
        areaServed: "IN",
      },
    ],
    subOrganization: BRANDS.map((brand) => ({
      "@type": "AutoDealer",
      name: brand.name,
      url: brand.url,
      description: brand.tagline,
    })),
  };

  // 2. AutoDealer schema per verified location
  const locationSchemas = verifiedLocations.map((loc) => ({
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": `${siteUrl}/locations#${loc.id}`,
    name: loc.name,
    parentOrganization: {
      "@id": `${siteUrl}/#organization`,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address,
      addressLocality: loc.city,
      addressRegion: "Punjab",
      postalCode: loc.pincode,
      addressCountry: "IN",
    },
    telephone: loc.phone,
    openingHours: "Mo-Su 09:30-19:00",
    url: loc.mapUrl || `${siteUrl}/locations`,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {locationSchemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
