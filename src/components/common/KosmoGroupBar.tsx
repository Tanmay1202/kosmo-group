import React from "react";
import type { GroupBarProps } from "./types";

declare const process: { env: Record<string, string | undefined> };

const getDefaultTataUrl = (): string => {
  return "https://kosmo-tata.vercel.app";
};

const getDefaultHeroUrl = (): string => {
  return "https://kosmo-hero.vercel.app";
};

const getDefaultHubUrl = (): string => {
  if (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_HUB_URL && !process.env.NEXT_PUBLIC_HUB_URL.includes("<")) {
    return process.env.NEXT_PUBLIC_HUB_URL;
  }
  const domain = typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_GROUP_DOMAIN : undefined;
  if (domain && !domain.includes("<")) {
    return `https://${domain}`;
  }
  if (typeof process !== "undefined" && process.env?.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  return "/";
};

export const KosmoGroupBar: React.FC<GroupBarProps> = ({
  currentSite = "hub",
  groupHubUrl = getDefaultHubUrl(),
  tataUrl = getDefaultTataUrl(),
  heroUrl = getDefaultHeroUrl(),
  className = "",
}) => {
  return (
    <div
      role="banner"
      aria-label="Kosmo Group Navigation"
      className={`w-full bg-[#111317] text-white text-[11px] sm:text-xs border-b border-white/10 select-none z-50 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between">
        {/* Left: Parent Group Brand Link */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400 font-normal hidden xs:inline">Part of</span>
          <a
            href={groupHubUrl}
            className="font-bold tracking-wider uppercase text-white hover:text-white/80 transition-colors flex items-center gap-1.5"
            title="Kosmo Group Homepage"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
            <span>Kosmo Group</span>
          </a>
        </div>

        {/* Right: Sibling Brand Switcher */}
        <nav aria-label="Brand Websites" className="flex items-center space-x-3 sm:space-x-5 text-gray-300 font-medium">
          {currentSite !== "tata" && (
            <a
              href={tataUrl}
              className="hover:text-white transition-colors flex items-center gap-1 text-[11px]"
              title="Visit Kosmo Tata Motors Dealership"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2334f5]"></span>
              <span>Kosmo Tata</span>
            </a>
          )}

          {currentSite !== "hero" && (
            <a
              href={heroUrl}
              className="hover:text-white transition-colors flex items-center gap-1 text-[11px]"
              title="Visit Kosmo Hero MotoCorp Dealership"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ee2326]"></span>
              <span>Kosmo Hero</span>
            </a>
          )}
        </nav>
      </div>
    </div>
  );
};
