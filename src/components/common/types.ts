export type ActiveSite = "hub" | "tata" | "hero";

export interface GroupBarProps {
  currentSite?: ActiveSite;
  groupHubUrl?: string;
  tataUrl?: string;
  heroUrl?: string;
  className?: string;
}

export interface GroupFooterStripProps {
  groupHubUrl?: string;
  className?: string;
}
