# Kosmo Group Launch Runbook & Deployment Guide

This document supplies the step-by-step instructions for deploying the Kosmo Group Hub and linking the two brand sites under a unified subdomain family on Vercel.

---

## 1. Monorepo Project Architecture on Vercel

The monorepo contains three independent deployable applications:

| Application | Monorepo Path | Target Hostname | Vercel Project Name | Framework Preset |
| :--- | :--- | :--- | :--- | :--- |
| **Kosmo Hub** | `apps/hub` | `<GROUP_DOMAIN>` (Apex) | `kosmo-group-hub` | Next.js |
| **Kosmo Tata** | `apps/tata` | `tata.<GROUP_DOMAIN>` | Existing (`kosmo-tata`) | Next.js |
| **Kosmo Hero** | `apps/hero` | `hero.<GROUP_DOMAIN>` | Existing (`kosmo-hero`) | Vite / Other |

---

## 2. Vercel Project Setup & Configuration

### A. Existing Projects (Kosmo Tata & Kosmo Hero)
> **Ground Rule:** Do not delete existing Vercel projects or recreate them. Update their settings to point to the new monorepo without disrupting production traffic.

1. **Link Repository:**
   * Go to **Vercel Dashboard** → Select project (`kosmo-tata` / `kosmo-hero`) → **Settings** → **Git**.
   * Connect to the new monorepo repository (`kosmo-group`).
2. **Configure Root Directory:**
   * Go to **Settings** → **General** → **Root Directory**.
   * Set Root Directory to:
     * For Tata: `apps/tata`
     * For Hero: `apps/hero`
   * Check **"Include source files outside of the Root Directory in the Build Step"** (Required for shared packages `@kosmo/*`).
3. **Ignored Build Step (Optimized Deployment Caching):**
   * Under **Settings** → **Git** → **Ignored Build Step**, select **Custom** and enter:
     ```bash
     # Rebuild only if app code or shared packages changed
     git diff --quiet HEAD^ HEAD -- ./ ../../packages/
     ```

### B. New Project (Kosmo Hub)
1. In Vercel, click **Add New...** → **Project**.
2. Select the `kosmo-group` repository.
3. Configure settings:
   * **Project Name:** `kosmo-group-hub`
   * **Framework Preset:** `Next.js`
   * **Root Directory:** `apps/hub` (Ensure outside source files toggle is checked).
   * **Build Command:** `pnpm build`
   * **Install Command:** `pnpm install`

---

## 3. Environment Variables Reference

Configure under **Settings** → **Environment Variables** for each project:

### `apps/hub` (Kosmo Hub)
```env
NEXT_PUBLIC_GROUP_DOMAIN="<GROUP_DOMAIN>"
NEXT_PUBLIC_SITE_URL="https://<GROUP_DOMAIN>"
NEXT_PUBLIC_TATA_URL="https://tata.<GROUP_DOMAIN>"
NEXT_PUBLIC_HERO_URL="https://hero.<GROUP_DOMAIN>"

# Lead Routing Notification Emails
LEADS_TO_TATA="customercare@kosmotata.in"
LEADS_TO_HERO="customercare@kosmohero.in"
LEADS_TO_GENERAL="contact@kosmogroup.in"

# Lead Storage & Notification (Optional)
RESEND_API_KEY=""
RESEND_FROM_EMAIL="Kosmo Group Leads <leads@kosmogroup.in>"
SUPABASE_URL=""
SUPABASE_SERVICE_ROLE_KEY=""

# Security & Analytics
CLOUDFLARE_TURNSTILE_SECRET_KEY=""
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=""
NEXT_PUBLIC_ANALYTICS_ID=""
```

### `apps/tata` & `apps/hero`
```env
NEXT_PUBLIC_GROUP_DOMAIN="<GROUP_DOMAIN>"
NEXT_PUBLIC_HUB_URL="https://<GROUP_DOMAIN>"
```

---

## 4. DNS Configuration at Domain Registrar

Log in to the DNS management portal of the domain registrar (e.g., Cloudflare, GoDaddy, Namecheap) and configure the following DNS records:

| Hostname / Type | Record Type | Value / Destination | Purpose |
| :--- | :---: | :--- | :--- |
| `@` (Apex) | `A` | `76.76.21.21` (or Vercel CNAME) | Points group apex to Kosmo Hub |
| `www` | `CNAME` | `cname.vercel-dns.com` | Redirects `www` to apex |
| `tata` | `CNAME` | `cname.vercel-dns.com` | Subdomain for Kosmo Tata Motors |
| `hero` | `CNAME` | `cname.vercel-dns.com` | Subdomain for Kosmo Hero MotoCorp |

*Once added, add `<GROUP_DOMAIN>` in the Hub project's **Domains** tab, `tata.<GROUP_DOMAIN>` in Tata project, and `hero.<GROUP_DOMAIN>` in Hero project. Vercel will issue automated Let's Encrypt SSL/TLS certificates.*

---

## 5. Launch Order & Step-by-Step Execution

Follow this sequential checklist on launch day:

- [ ] **Step 1: Merge Feature Branch**
  * Merge `feat/brand-site-integration` into `main`.
- [ ] **Step 2: Verify Vercel Previews**
  * Check Vercel Preview deployments for all three applications (`hub`, `tata`, `hero`).
  * Verify top bar navigation, brand links, and responsive styling.
- [ ] **Step 3: Deploy Hub to Production**
  * Promote `apps/hub` to production on custom apex domain `<GROUP_DOMAIN>`.
  * Validate that home page loads in under 1 second.
- [ ] **Step 4: Connect Hero Subdomain**
  * Add `hero.<GROUP_DOMAIN>` to `kosmo-hero` Vercel domains. Verify SSL issuance.
- [ ] **Step 5: Connect Tata Subdomain**
  * Add `tata.<GROUP_DOMAIN>` to `kosmo-tata` Vercel domains. Verify SSL issuance.
- [ ] **Step 6: Submit Test Enquiries**
  * Submit a test enquiry on the Hub for Tata, Hero, and General.
  * Verify dispatch to team customer care emails and test WhatsApp deep-link generation.
- [ ] **Step 7: Enable 301 Redirects from Legacy URLs**
  * In Vercel domain settings, configure 301 redirect:
    * `kosmo-tata.vercel.app` → `https://tata.<GROUP_DOMAIN>`
    * `kosmo-hero.vercel.app` → `https://hero.<GROUP_DOMAIN>`
- [ ] **Step 8: Google Search Console Submission**
  * Add Domain Property for `<GROUP_DOMAIN>` in Google Search Console (covers apex and all subdomains).
  * Submit `https://<GROUP_DOMAIN>/sitemap.xml`.
- [ ] **Step 9: 48-Hour Soak Period**
  * Monitor real customer traffic, lead arrivals, and ensure error logs remain zero.

---

## 6. Rollback Protocol

If an unexpected critical issue arises during cutover:

1. **Instant Vercel Rollback:**
   * Go to the affected Vercel project → **Deployments**.
   * Locate the previous stable production deployment.
   * Click the three dots `...` → **Instant Rollback (Promote to Production)**.
   * Rollback completes within ~2 seconds globally via Vercel Edge Network.
2. **Legacy URL Preservation:**
   * Until 301 redirects are enabled in Step 7, the existing `*.vercel.app` URLs remain fully functional and independent.
