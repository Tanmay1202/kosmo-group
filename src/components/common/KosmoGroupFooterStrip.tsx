import React from "react";
import type { GroupFooterStripProps } from "./types";

declare const process: { env: Record<string, string | undefined> };

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

export const KosmoGroupFooterStrip: React.FC<GroupFooterStripProps> = ({
  groupHubUrl = getDefaultHubUrl(),
  className = "",
}) => {
  return (
    <div className={`py-3 text-center text-xs text-gray-400 border-t border-white/10 ${className}`}>
      <span>Part of </span>
      <a
        href={groupHubUrl}
        className="font-bold text-white hover:underline transition"
      >
        Kosmo Group
      </a>
      <span className="text-gray-500"> • Punjab&apos;s Flagship Dealership Network</span>
    </div>
  );
};
