# Kosmo Group Launch Runbook & Vercel Deployment Guide

This document provides step-by-step instructions for deploying the Kosmo Group Hub to Vercel and connecting subdomains to your brand deployments.

---

## 1. Architecture Overview

Each site runs as an independent, decoupled project on Vercel:

| Website | Repository | Target Hostname | Vercel Deployment | Framework |
| :--- | :--- | :--- | :--- | :--- |
| **Kosmo Group Hub** | `Tanmay1202/kosmo-group` | `kosmo-group.in` (Apex) | New Vercel project | Next.js 16 (App Router) |
| **Kosmo Tata** | Independent repo | `tata.kosmo-group.in` | Existing (`kosmo-tata.vercel.app`) | Next.js |
| **Kosmo Hero** | Independent repo | `hero.kosmo-group.in` | Existing (`kosmo-hero.vercel.app`) | Vite + React |

---

## 2. Deploying Kosmo Group Hub to Vercel (1-Click)

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** > **Project**.
3. Select **`Tanmay1202/kosmo-group`** from GitHub.
4. Vercel automatically detects:
   - **Framework Preset:** `Next.js`
   - **Root Directory:** `./`
   - **Build Command:** `next build` (or `pnpm build`)
   - **Output Directory:** `.next`
   - **Install Command:** `pnpm install`
5. *(Optional)* Add any production environment variables from `.env.example` (e.g., `RESEND_API_KEY`, `NEXT_PUBLIC_ANALYTICS_ID`). If omitted, defaults are automatically used and leads are logged to server output.
6. Click **Deploy**.
7. The build finishes in ~15-20 seconds with 100% static page optimization.

---

## 3. Subdomain & DNS Configuration

Once your client registers their domain (e.g. `kosmo-group.in` or `kosmo-group.com`), configure your DNS provider:

| Host / Subdomain | Type | Target / Value | Destination Project |
| :--- | :---: | :--- | :--- |
| `@` (Apex) | **A** | `76.76.21.21` | Kosmo Group Hub |
| `www` | **CNAME** | `cname.vercel-dns.com` | Kosmo Group Hub (redirects to apex) |
| `tata` | **CNAME** | `cname.vercel-dns.com` | Existing Kosmo Tata Vercel Project |
| `hero` | **CNAME** | `cname.vercel-dns.com` | Existing Kosmo Hero Vercel Project |

### Adding Domains in Vercel Dashboards:
1. **Hub Project:** Settings > Domains > Add `kosmo-group.in` and `www.kosmo-group.in`.
2. **Tata Project:** Settings > Domains > Add `tata.kosmo-group.in`.
3. **Hero Project:** Settings > Domains > Add `hero.kosmo-group.in`.

Vercel automatically issues and auto-renews free SSL/TLS certificates for each subdomain.

---

## 4. Verification Checklist

- [x] Standalone Next.js root layout with no monorepo dependencies.
- [x] Zero heavy binary assets or orphaned files.
- [x] Next.js patch 16.4.3 installed (zero security advisory interruptions).
- [x] Production build passes with 0 errors (`pnpm build`).
- [x] Automated E2E QA acceptance suite passes (`pnpm test`: 7/7 passed).
- [x] Security headers configured in `vercel.json`.
- [x] Brand hyperlinks routed to live Vercel deployments (`https://kosmo-tata.vercel.app` & `https://kosmo-hero.vercel.app`).
