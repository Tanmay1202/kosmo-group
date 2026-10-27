# Subdomain Routing & Multi-Site Architecture Guide

## Overview

Kosmo Group operates three separate, decoupled web applications:
1. **Kosmo Group Hub** (this repository): Primary corporate portal (`kosmo-group.in` or `kosmo-group.com`).
2. **Kosmo Tata Dealership** (separate Vercel deployment): Authorized Tata Motors passenger vehicles (`tata.kosmo-group.in` or `kosmo-tata.vercel.app`).
3. **Kosmo Hero Dealership** (separate Vercel deployment): Authorized Hero MotoCorp two-wheelers (`hero.kosmo-group.in` or `kosmo-hero.vercel.app`).

Because each project is an independent Vercel project, subdomain routing is handled at the **Vercel DNS & Edge Routing layer**, with zero monorepo bloat.

---

## 1. How to Route Subdomains in Vercel

When your client registers the custom domain (e.g. `kosmo-group.in` or `kosmo-group.com`):

### Step A: Kosmo Group Hub (Main Site)
1. Go to your **Kosmo Group Hub** project in the Vercel Dashboard.
2. Navigate to **Settings** > **Domains**.
3. Add `kosmo-group.in` and `www.kosmo-group.in`.
4. Configure DNS in your domain registrar:
   - **Type `A`**: `@` $\rightarrow$ `76.76.21.21`
   - **Type `CNAME`**: `www` $\rightarrow$ `cname.vercel-dns.com`

### Step B: Kosmo Tata Dealership
1. Go to your existing **Kosmo Tata** project in the Vercel Dashboard (`kosmo-tata`).
2. Navigate to **Settings** > **Domains**.
3. Add `tata.kosmo-group.in`.
4. Configure DNS in your domain registrar:
   - **Type `CNAME`**: `tata` $\rightarrow$ `cname.vercel-dns.com`

### Step C: Kosmo Hero Dealership
1. Go to your existing **Kosmo Hero** project in the Vercel Dashboard (`kosmo-hero`).
2. Navigate to **Settings** > **Domains**.
3. Add `hero.kosmo-group.in`.
4. Configure DNS in your domain registrar:
   - **Type `CNAME`**: `hero` $\rightarrow$ `cname.vercel-dns.com`

> [!NOTE]
> Vercel automatically provisions and renews SSL certificates for each subdomain with zero manual configuration.

---

## 2. Environment Variables on the Hub

Set these in the **Kosmo Group Hub** Vercel project settings:
```bash
NEXT_PUBLIC_GROUP_DOMAIN=kosmo-group.in
NEXT_PUBLIC_TATA_URL=https://tata.kosmo-group.in
NEXT_PUBLIC_HERO_URL=https://hero.kosmo-group.in
```

---

## 3. Top Group Bar for Tata & Hero Repositories

To show the unified **"Kosmo Group | Tata | Hero"** navigation bar on the Tata and Hero websites, copy this component into their respective repositories:

### React / Next.js Component (`KosmoGroupBar.tsx`)
```tsx
import React from "react";

interface GroupBarProps {
  currentBrand?: "hub" | "tata" | "hero";
}

export function KosmoGroupBar({ currentBrand = "tata" }: GroupBarProps) {
  const hubUrl = process.env.NEXT_PUBLIC_HUB_URL || "https://kosmo-group.in";
  const tataUrl = process.env.NEXT_PUBLIC_TATA_URL || "https://tata.kosmo-group.in";
  const heroUrl = process.env.NEXT_PUBLIC_HERO_URL || "https://hero.kosmo-group.in";

  return (
    <div className="w-full bg-slate-900 text-white text-xs py-1.5 px-4 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href={hubUrl} className="font-semibold tracking-wider uppercase text-slate-300 hover:text-white transition-colors">
          Part of <span className="text-white font-bold">Kosmo Group</span>
        </a>
        <div className="flex items-center gap-4">
          <a
            href={tataUrl}
            className={`transition-colors ${currentBrand === "tata" ? "text-blue-400 font-semibold" : "text-slate-400 hover:text-white"}`}
          >
            Kosmo Tata
          </a>
          <span className="text-slate-600">|</span>
          <a
            href={heroUrl}
            className={`transition-colors ${currentBrand === "hero" ? "text-red-400 font-semibold" : "text-slate-400 hover:text-white"}`}
          >
            Kosmo Hero
          </a>
        </div>
      </div>
    </div>
  );
}
```
