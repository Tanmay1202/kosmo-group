import type { ActiveSite } from "./types";

/**
 * Generates raw HTML string for the Kosmo Group top bar.
 * Suitable for direct SSR string injection or vanilla JS DOM insertion.
 */
export function getGroupBarHtml(options: {
  currentSite?: ActiveSite;
  groupHubUrl?: string;
  tataUrl?: string;
  heroUrl?: string;
}): string {
  const {
    currentSite = "hub",
    groupHubUrl = "/",
    tataUrl = "https://kosmo-tata.vercel.app",
    heroUrl = "https://kosmo-hero.vercel.app",
  } = options;

  const tataLink =
    currentSite !== "tata"
      ? `<a href="${tataUrl}" style="color:#d1d5db;text-decoration:none;display:inline-flex;align-items:center;gap:4px;font-size:11px;margin-right:16px;"><span style="width:6px;height:6px;border-radius:50%;background:#2334f5;display:inline-block;"></span>Kosmo Tata</a>`
      : "";

  const heroLink =
    currentSite !== "hero"
      ? `<a href="${heroUrl}" style="color:#d1d5db;text-decoration:none;display:inline-flex;align-items:center;gap:4px;font-size:11px;margin-right:16px;"><span style="width:6px;height:6px;border-radius:50%;background:#ee2326;display:inline-block;"></span>Kosmo Hero</a>`
      : "";

  const hubLink =
    currentSite !== "hub"
      ? `<a href="${groupHubUrl}" style="color:#9ca3af;text-decoration:underline;font-size:11px;">Group Hub</a>`
      : "";

  return `
    <div id="kosmo-group-bar" style="background:#111317;color:#fff;font-family:system-ui,-apple-system,sans-serif;font-size:11px;border-bottom:1px solid rgba(255,255,255,0.1);line-height:32px;height:32px;box-sizing:border-box;padding:0 16px;display:flex;justify-content:space-between;align-items:center;position:relative;z-index:99999;">
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="color:#9ca3af;">Part of</span>
        <a href="${groupHubUrl}" style="color:#fff;font-weight:700;text-decoration:none;letter-spacing:0.05em;text-transform:uppercase;">Kosmo Group</a>
      </div>
      <div style="display:flex;align-items:center;">
        ${tataLink}
        ${heroLink}
        ${hubLink}
      </div>
    </div>
  `;
}
