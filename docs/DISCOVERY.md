# Phase 0: Discovery Report — Kosmo Group Codebases

**Date of Discovery:** 27 October 2026  
**Repositories Analyzed:**
1. `car-dealer/` (Kosmo Tata — Next.js Flagship Digital Dealership)
2. `hero/` (Kosmo Hero MotoCorp — Vite React Multi-Branch Dealership)

---

## 1. Executive Summary & Core Facts

Both codebases represent authorized automobile dealerships in Punjab operating under the Kosmo umbrella. Notably:
- **Managing Director Identified:** Both sites cite **Mr. Raghav Ahuja** as Managing Director, featuring an MD quote section and leadership attribution.
- **Central Geography:** Jalandhar, Punjab is the operational anchor for both brands, with additional Tata presence in Ludhiana, Dasuya, and Hoshiarpur.
- **Lead Capture Paradigm Divergence:**
  - **Tata:** Hybrid flow sending POST requests to `/api/contact` (via `nodemailer` to `customercare@kosmotata.in`) while simultaneously redirecting users to WhatsApp (`+91 70451 69141`).
  - **Hero:** Purely client-side SPA with zero backend routes or database. Submissions generate local reference ticket IDs (`KSM-######`) and deep-link directly into WhatsApp (`https://wa.me/<branchPhone>?text=...`).
- **Brand Assets:**
  - **Tata:** Local `.avif` vehicle images copied from OEM CDN patterns (`aeris-i-petrol-banner-d_$BA-1920-925-D$_fit_crop_fmt_avif-alpha.avif`), plus a `tata.cars` header logo.
  - **Hero:** 100% remote hotlinks to Hero MotoCorp's Adobe Scene7 CDN (`https://s7ap1.scene7.com/is/image/hmcl/...`).
- **SEO & Legal State:**
  - Neither project contains `robots.txt`, `sitemap.xml`, or JSON-LD structured data.
  - Tata legal pages (`/privacy-policy`, `/terms`) are empty stubs returning `null`. Hero has complete, written policies referencing "Kosmo Hero Motors" and Jalandhar jurisdiction.

---

## 2. Technical Comparison

| Dimension | Kosmo Tata (`car-dealer`) | Kosmo Hero (`hero`) |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.4.0 (App Router, Turbopack) | Vite 6.1.0 + React Router DOM 7.1.5 (SPA / CSR) |
| **React Version** | React 19.3.0 | React 19.0.0 |
| **Package Manager** | `npm` (`package-lock.json`) | `npm` (`package-lock.json`) |
| **Node.js Engines** | `>=20.9.0` | `>=18.0.0` (implicit) |
| **Build Command** | `next build` | `tsc -b && vite build` |
| **Dev Command** | `next dev` | `vite` |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/postcss` 4.3.3) | Tailwind CSS v4 (`@tailwindcss/vite` 4.0.0) |
| **TypeScript** | TypeScript 5 (Strict) | TypeScript ~5.7.2 (Strict) |
| **Animation / 3D** | `framer-motion` 14.0.0, `three` 0.186.1, `@react-three/fiber` | Pure CSS transitions & hover effects |
| **Icon Library** | `lucide-react` 1.52.0, `@heroicons/react` 2.2.0 | `lucide-react` 1.16.0 |
| **Email / Dispatch** | `nodemailer` 10.0.16 | None (Client-side WhatsApp only) |
| **Rendering Mode** | Static Site Generation (SSG) + 1 dynamic API route | Client-Side Rendering (CSR) only |

---

## 3. Project Detail: Kosmo Tata (`car-dealer`)

### 3.1 Routing Structure
- **Production Pages (31 routes):**
  - `/` — Homepage with Cinematic Hero Carousel, Meet our cars slider, Youtube/Test Drive sections
  - `/about` — About Kosmo Tata, MD message from Mr. Raghav Ahuja, head branch highlight
  - `/models` — Full Tata car model showcase
  - `/models/[slug]` — Dynamic model pages (`aeris`, `sierra`, `harrier`, `safari`, `nexon`, `punch`, `altroz`, `tiago`, `curvv`)
  - `/dealer-locator` — 4 branch locations across Jalandhar, Ludhiana, Dasuya, Hoshiarpur
  - `/offers` — Promotional and festive offers
  - `/reviews` — Customer reviews and Google review button
  - `/gallery` — Dealership and model media gallery
  - `/careers` — Career opportunities (Sales Executive, Service Advisor, Showroom Host)
  - `/contact-us` — Contact information and general enquiry form
  - `/book-now` & `/book-online` — Online reservation flow
  - `/book-test-drive` — VIP Doorstep test drive booking form
  - `/exchange-car` — Used car valuation calculator
  - `/service` — Dealership service facilities overview
  - `/service/book-service` — Workshop appointment booking
  - `/service/cost-calculator` — Maintenance cost estimator
  - `/service/roadside-assistance` — 24x7 RSA assistance guide
  - `/api/contact` — Lead email dispatcher (`nodemailer`)
- **Stub / Placeholder Pages (empty `return null`):**
  - `/blog` & `/blog/[slug]`
  - `/digital-showroom`
  - `/electric` & `/electric/[slug]`
  - `/owners`, `/owners/manuals`, `/owners/warranty`
  - `/privacy-policy`
  - `/terms`

### 3.2 Design Tokens
- **Colors:**
  - Tata Blue: `#2334f5` (`--color-tata-blue`)
  - Obsidian Dark: `#0B0F17` (`--color-obsidian`), `#161C28` (`--color-obsidian-light`)
  - Metallic: `#94a3b8` (`--color-metallic`), `#cbd5e1` (`--color-metallic-light`), `#64748b` (`--color-metallic-dark`)
  - Canvas / Overscroll Background: `#2f3032`
  - Body Text: `text-slate-900`, Background: `bg-white`
- **Typography (Local Next.js Fonts in `public/assets/fonts/`):**
  - Display Font: `ParallelDisplay` (`--font-parallel-display`, weights: Regular 400, Medium 500, Bold 700)
  - Body Font: `Supreme` (`--font-supreme`, weights: Light 300, Regular 400, Medium 500, Variable 100-900)
- **Border Radius & Shadows:**
  - Modern smooth styling: `rounded-lg` (8px), `rounded-2xl` (16px), `rounded-3xl` (24px)
  - Soft card elevations: `shadow-sm`, `shadow-md`, `shadow-2xl`

### 3.3 Content Inventory
- **Company Name:** "Kosmo Tata", "Kosmo Tata Motors", "Kosmo JP Mobility - Ludhiana", Header wordmark: `tata.cars`
- **Tagline:** "Nothing's Too Far."
- **Managing Director:** Mr. Raghav Ahuja
- **MD Quote:** *"At Kosmo Tata, our mission is to provide an unparalleled automotive experience. We believe that buying a car is more than just a transaction; it's the beginning of a lifelong relationship. Our state-of-the-art flagship dealership in Jalandhar is designed to offer you comfort, transparency, and a premium environment as you explore the safest and most advanced cars in India."*
- **Head Office Address:** `Kosmo Tata Motors, G.T. Road, Jalandhar, Punjab 144001, India`
- **Customer Care Email:** `customercare@kosmotata.in`
- **Phone Numbers:** `+91 70451-69141`, `+91 75060-21479`
- **WhatsApp Number:** `+91 70451 69141` (`917045169141`)
- **Emergency Roadside Assistance:** `1800 209 8282` (in footer) and `1800 209 7979` (in contact page)
- **Branches in Code (`dealer-locator/page.tsx`):**
  1. *Kosmo Tata Jalandhar:* Kosmo Tata Motors, GT Road Jalandhar | Phone: `+91 70451-69141, +91 75060-21479` | Manager: Umesh Arora (`+91 75270-04021`)
  2. *Kosmo JP Mobility - Ludhiana:* 📍 G.T. Road, Dhandari Kalan, Ludhiana – 141014 \| 📍 Ikom Avenue, Chandigarh Road, Samrala – 141114 | Phone: `+91 9167058038, +91 8291023882` | Manager: Raghav Ahuja (`+91 97800-26839`)
  3. *Kosmo Dasuya:* GT Road Dasuya | Phone: `+91 91673-72329, +91 91673-36882, +91 61884-25228` | Manager: Pritpal Mehta (`+91 78883-98875`)
  4. *Kosmo Hoshiarpur:* 245, Main Jalandhar Road, Singriwal Hoshiarpur - 146022 | Phone: `+91 91673-72329, +91 91673-36882, +91 61884-25228` | Manager: Pawan Naialwal
- **Social Media:** Facebook, Twitter, Instagram, YouTube links in footer point to `#`.

### 3.4 Lead Capture & Backend
- **Forms:** `ContactForm`, `ServiceBookingForm`, `TestDriveForm`, `LeadCaptureModal`, `OnlineBooking`.
- **Validation:** HTML5 required attributes + client regex.
- **Backend Route:** `POST /api/contact` using `nodemailer`.
- **Env Vars Required:** `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`.
- **Behavior:** Attempts to send email to `customercare@kosmotata.in`. If SMTP env vars are absent, logs to console and returns `{ success: true, message: 'Submission logged successfully.' }` without erroring. Opens WhatsApp in parallel.

### 3.5 Third-Party Services
- Google Maps embed iframe (`google.com/maps/embed?...`)
- Google Review link: `https://g.page/kosmotata/review`
- Unused env stubs: `NEXT_PUBLIC_GOOGLE_MAPS_KEY`, `NEXT_PUBLIC_ANALYTICS_ID`, `DATABASE_URL`

### 3.6 Assets & OEM Compliance
- Header Wordmark: `/logo/tata-cars-logo.png` (reads `tata.cars`)
- Dealership Logo: `/logo/logo.png` ("Kosmo Tata Logo")
- Car Imagery: `public/assets/images/cars/` containing over 100 high-res vehicle renders following OEM naming scheme.
- 3D Assets: `public/assets/360-viewer/` and `public/assets/3d/` containing 360-degree rotation arrays and WebGL HDR environments.

---

## 4. Project Detail: Kosmo Hero (`hero`)

### 4.1 Routing Structure
- **23 Client-Side Routes in `App.tsx`:**
  - `/` — Homepage (HeroSlider, QuickActions, VehicleShowcaseTabs, DealershipPillars, MDQuoteSection, JoyrideBanner, BranchPreview)
  - `/motorcycles` — All 17 Hero motorcycle models with cc filter
  - `/motorcycles/:slug` — Vehicle detail page with specs, EMI calculator, variants, colors
  - `/scooters` — All 7 Hero scooter models
  - `/scooters/:slug` — Scooter detail page
  - `/dealer-locator` — All 5 branches with facility badges, Google Maps links, phone links
  - `/about` — About Kosmo Hero, MD Raghav Ahuja message, Hero MotoCorp heritage, core values
  - `/offers` — 4 promotional schemes (Hero Sure Exchange, Hero FinCorp 6.99%, Corporate, Joyride AMC)
  - `/service` — Scheduled service intervals (1st to 5th free), Joyride benefits, 5-year warranty policy
  - `/book-service` — Workshop appointment booking form
  - `/book-test-ride` — Test ride scheduling form
  - `/parts-and-accessories` — Hero Genuine Parts & 4T Plus lubricants enquiry
  - `/finance` — Hero FinCorp EMI calculator and loan application
  - `/exchange` — Hero Sure valuation request
  - `/digital-showroom` — Interactive 360° vehicle viewer
  - `/gallery` — Categorized media gallery (Adventure, Motorcycles, Scooters)
  - `/reviews` — 5 detailed customer reviews
  - `/careers` — 4 job openings with apply modal
  - `/blog` — Riding tips and vehicle guides
  - `/contact-us` — Dealership directory and enquiry form
  - `/privacy-policy` — Complete customer data protection policy
  - `/terms` — Complete dealership policies and terms
  - `*` — 404 Not Found fallback

### 4.2 Design Tokens
- **Colors:**
  - Hero Red: `#ee2326` (`--color-hero-red`, primary brand accent)
  - Hero Red Hover: `#d30000` (`--color-hero-red-hover`)
  - Hero Black: `#181818` (`--color-hero-black`, utility top bar, footers)
  - Charcoal / Slate: `#232323`, `#303030`
  - Gray Body: `#595959`, Gray Light: `#f5f6f7`, Gray Border: `#e5e7eb`
- **Typography (Google Fonts in `index.html`):**
  - Headings: `'Outfit', 'Montserrat', sans-serif` (weights: 400 to 900)
  - Body: `'Montserrat', system-ui, sans-serif` (weights: 300 to 900)
- **Border Radius & Shadows:**
  - Sharp, aggressive athletic aesthetic: `rounded-sm` (2px to 4px)
  - Custom buttons: `.hero-btn-primary`, `.hero-btn-secondary`, `.hero-btn-outline`

### 4.3 Content Inventory
- **Company Name:** "Kosmo Vehicles Hero", "Kosmo Hero MotoCorp", "Kosmo Hero Motors", "Kosmo Dealership Group"
- **Tagline:** "Punjab’s premier destination for Hero MotoCorp two-wheelers." / "Authorised Two Wheelers Dealership"
- **Managing Director:** Mr. Raghav Ahuja ("Mr. Raghav Ahuja, Managing Director - Kosmo Dealership Network")
- **MD Quote:** *"At Kosmo Hero, our mission is to provide an unparalleled two-wheeler automotive experience. We believe that buying a vehicle is more than just a transaction; it's the beginning of a lifelong relationship. Across our flagship dealership at Lamba Pind Chowk, Model House, Opp. Bus Stand, Kishangarh Highway, and our upcoming showroom at Urban Estate Phase-1, we are committed to offering you comfort, transparency, and a premium environment as you explore the safest, most efficient, and most technologically advanced motorcycles and scooters in India."*
- **Central Phone:** `+91 92899-22739`
- **Central Email:** `customercare@kosmohero.in`
- **Emergency Roadside Assistance:** `1800 209 7979`
- **Working Hours:** `09:30 AM - 07:00 PM (Monday - Sunday)`
- **Branches in Code (`branches.ts`):**
  1. *Head Branch (Lamba Pind Chowk):* G.T Road, Near Lamba Pind Chowk, Jalandhar, Punjab - 144001 | Phone: `+91 92899-22739` | Email: `customercare@kosmohero.in`
  2. *Model House (Basti Sheikh):* Opp. Royal Palace, Basti Sheikh Rd, Model House, Jalandhar, Punjab - 144001 | Phone: `+91 78143-03163` | Email: `modelhouse@kosmohero.in`
  3. *Jawahar Nagar (Opp. Bus Stand):* 39, G.T Road, Opp. Bus Stand, Jawahar Nagar, Jalandhar, Punjab - 144001 | Phone: `+91 77173-03578` | Email: `busstand@kosmohero.in`
  4. *Kishangarh (Highway Branch):* Jalandhar-Pathankot Highway, Kishangarh, Jalandhar District, Punjab - 144301 | Phone: `+91 70871-17350` | Email: `kishangarh@kosmohero.in`
  5. *Urban Estate Phase-1 (Upcoming):* Opp. Gurudwara Singh Sabha, Urban Estate Phase-1, Jalandhar, Punjab - 144005 | Phone: `+91 92899-22739` | Email: `customercare@kosmohero.in` (Hero Vida / EV ready)

### 4.4 Lead Capture & Backend
- **Backend:** None. Zero API routes, zero serverless functions.
- **Client Flow:** All forms (`ContactForm`, `TestRideModal`, `ServiceBookingForm`, `JobApplyModal`, `FinanceCalculator`, `ExchangePage`, `PartsAccessoriesPage`) validate user input, generate a client-side reference code (`KSM-######`), and render an immediate WhatsApp direct-link (`https://wa.me/<branchPhone>?text=...`).
- **Env Vars Required:** None.

### 4.5 Third-Party Services
- Google Fonts CDN
- Hero MotoCorp Scene7 CDN (`https://s7ap1.scene7.com/is/image/hmcl/...`)
- Google Maps Search URLs (`https://www.google.com/maps/search/?api=1&query=...`)
- No analytics or CRM integrations.

### 4.6 Assets & OEM Compliance
- Local Logo: `public/assets/hero-logo.jpeg` and `public/assets/brand/hero-icon.svg` (Hero MotoCorp logo image).
- Vehicle Imagery: 100% hotlinked to Hero MotoCorp's Adobe Scene7 enterprise CDN (`https://s7ap1.scene7.com/is/image/hmcl/...`). If Hero rotates CDN tokens or restricts referrers, images will break.

---

## 5. Facts for the Hub

The following verified data points are extracted directly from the existing codebases and are ready to be configured in `packages/group-config`:

| Field | Discovered Value | Source File | Status / Confidence |
| :--- | :--- | :--- | :--- |
| **Managing Director** | Mr. Raghav Ahuja | `car-dealer/src/app/about/page.tsx`<br>`hero/src/pages/AboutPage.tsx` | High (confirmed in both codebases) |
| **Tata Primary Brand Color** | `#2334f5` | `car-dealer/src/app/globals.css` | High |
| **Tata Display Font** | `ParallelDisplay` (local .otf) | `car-dealer/src/app/layout.tsx` | High |
| **Tata Body Font** | `Supreme` (local .ttf) | `car-dealer/src/app/layout.tsx` | High |
| **Hero Primary Brand Color** | `#ee2326` | `hero/src/index.css` | High |
| **Hero Heading Font** | `Outfit` (Google Fonts) | `hero/index.html` | High |
| **Hero Body Font** | `Montserrat` (Google Fonts) | `hero/index.html` | High |
| **Tata Tagline** | "Nothing's Too Far." | `car-dealer/src/components/home/HomeContent.tsx` | High |
| **Hero Tagline** | "Punjab’s premier destination for Hero MotoCorp two-wheelers." | `hero/src/pages/AboutPage.tsx` | High |
| **Tata Customer Care Email**| `customercare@kosmotata.in` | `car-dealer/src/app/contact-us/page.tsx` | High |
| **Hero Customer Care Email**| `customercare@kosmohero.in` | `hero/src/data/branches.ts` | High |
| **Tata WhatsApp Number** | `+91 70451 69141` (`917045169141`) | `car-dealer/src/utils/whatsapp.ts` | High |
| **Hero Central WhatsApp** | `+91 92899 22739` (`919289922739`) | `hero/src/data/branches.ts` | High |
| **Tata Jalandhar Head Branch**| Kosmo Tata Motors, GT Road Jalandhar | `car-dealer/src/app/dealer-locator/page.tsx` | High |
| **Hero Jalandhar Head Branch**| G.T Road, Near Lamba Pind Chowk, Jalandhar - 144001 | `hero/src/data/branches.ts` | High |
| **Operating Hours** | 09:30 AM - 07:00 PM (Monday - Sunday) | Both codebases | High |
| **Emergency RSA Number** | `1800 209 8282` (Tata) / `1800 209 7979` (Hero / Tata) | Footers / Quick Bars | Medium (Needs confirmation) |

---

## 6. Conflicts & Discrepancies Between Sites

1. **Hero Branch Count Discrepancy:**
   - `hero/index.html` meta description claims **3 branches**: *(Lamba Pind Chowk, Model House, and Opp. Bus Stand)*.
   - `hero/src/data/branches.ts` defines **5 branches**: *(Lamba Pind Chowk, Model House, Opp. Bus Stand, Kishangarh Highway, and Upcoming Urban Estate Phase-1)*.
   - External aggregator data lists only **1 branch** (Lamba Pind) and attributes "Opp. Bus Stand" to another dealer.
   - *Action:* Mark branches other than Lamba Pind with `verified: false` until client confirmation.
2. **Tata Branch Network Discrepancy:**
   - `dealer-locator/page.tsx` lists **4 branches**: Jalandhar (GT Road), Ludhiana ("Kosmo JP Mobility"), Dasuya (GT Road), Hoshiarpur (Singriwal).
   - Third-party aggregator lists 3 Jalandhar outlets: *Basti Bawa Khel, Paragpur (DPS), and Suchi Pind*.
   - *Action:* Confirm whether "Kosmo JP Mobility - Ludhiana" is part of Kosmo Group and verify the exact Jalandhar address list.
3. **Emergency RSA Toll-Free Numbers:**
   - Tata footer says: `1800 209 8282`.
   - Tata contact page says: `1800 209 7979`.
   - Hero says: `1800 209 7979`.
   - *Action:* Clarify whether `1800 209 7979` is the standard group roadside assistance line.
4. **Tata Wordmark vs Company Name:**
   - Tata header wordmark displays `tata.cars` with a small logo, while the copyright and text say "Kosmo Tata Motors".
   - *Action:* The hub will display "Kosmo Tata" cleanly in text without OEM artwork.
5. **Lead Capture Backend Inconsistency:**
   - Tata has an active server API route `/api/contact` using SMTP `nodemailer`.
   - Hero has zero backend and relies entirely on client-side WhatsApp link generation.
   - *Action:* The hub's `/api/enquiry` will unify lead capture into a real pipeline (Supabase / SMTP + WhatsApp link) routing by brand.
6. **Legal Pages & Entity Name:**
   - Tata has empty stubs for Privacy Policy and Terms.
   - Hero has complete written legal policies under "Kosmo Hero Motors", naming Jalandhar as jurisdiction.
   - Neither codebase discloses a corporate CIN, LLPIN, or GST number.
   - *Action:* Adapt Hero's written policies for the Group Hub and have the client provide legal entity and registration numbers.

---

## 7. Next Steps & Checkpoint 0 Status

Phase 0 discovery is complete with zero code modifications to either brand project.  
`docs/OPEN_QUESTIONS.md` has been initialized with all pending client questions.

Proceed to **CHECKPOINT 0** review.
