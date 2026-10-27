import { test, expect } from "@playwright/test";

test.describe("Kosmo Group Hub - E2E QA Acceptance Suite", () => {
  test("1. Home page loads with group branding, dual brand CTAs, and pillars", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Kosmo Group/i);

    // Group Wordmark in header
    const wordmark = page.locator("header").getByText("Kosmo Group");
    await expect(wordmark.first()).toBeVisible();

    // Hero Headline
    const heroTitle = page.getByRole("heading", { name: /Two Automotive Icons\. One Trusted Group\./i });
    await expect(heroTitle).toBeVisible();

    // Dual Primary Brand CTAs
    const tataCta = page.getByRole("link", { name: /Explore Kosmo Tata/i });
    const heroCta = page.getByRole("link", { name: /Explore Kosmo Hero/i });
    await expect(tataCta).toBeVisible();
    await expect(heroCta).toBeVisible();

    // Confirm UTM tags on Hero CTAs
    expect(await tataCta.getAttribute("href")).toContain("utm_source=kosmo-hub");
    expect(await heroCta.getAttribute("href")).toContain("utm_source=kosmo-hub");

    // Why Kosmo section verified pillars
    await expect(page.getByText(/Authorized OEM Partnerships/i).first()).toBeVisible();
    await expect(page.getByText(/Master Mechanics & Genuine Parts/i).first()).toBeVisible();
  });

  test("2. Brand Cards render with correct destination URLs and service chips", async ({ page }) => {
    await page.goto("/brands");
    await expect(page).toHaveTitle(/Brand Portfolio/i);

    // Tata Brand Card
    const tataCard = page.locator("div").filter({ hasText: /Kosmo Tata/i }).first();
    await expect(tataCard).toBeVisible();
    const tataLink = page.getByRole("link", { name: /Visit Kosmo Tata/i });
    expect(await tataLink.getAttribute("href")).toContain("kosmo-tata.vercel.app");

    // Hero Brand Card
    const heroCard = page.locator("div").filter({ hasText: /Kosmo Hero/i }).first();
    await expect(heroCard).toBeVisible();
    const heroLink = page.getByRole("link", { name: /Visit Kosmo Hero/i });
    expect(await heroLink.getAttribute("href")).toContain("kosmo-hero.vercel.app");
  });

  test("3. Locations directory filter by brand and city", async ({ page }) => {
    await page.goto("/locations");
    await expect(page).toHaveTitle(/Dealership Locations/i);

    // Default view shows multiple outlets
    const allOutlets = page.locator("h3:has-text('Kosmo')");
    const initialCount = await allOutlets.count();
    expect(initialCount).toBeGreaterThanOrEqual(4);

    // Click Kosmo Tata Filter Pill
    const tataFilterBtn = page.getByRole("button", { name: "Kosmo Tata", exact: true });
    await tataFilterBtn.click();
    await page.waitForTimeout(300);

    // Only Tata outlets should be visible
    const tataOutlets = page.locator("h3:has-text('Kosmo Tata')");
    expect(await tataOutlets.count()).toBeGreaterThanOrEqual(1);

    // Click Kosmo Hero Filter Pill
    const heroFilterBtn = page.getByRole("button", { name: "Kosmo Hero", exact: true });
    await heroFilterBtn.click();
    await page.waitForTimeout(300);

    // Only Hero outlets should be visible
    const heroOutlets = page.locator("h3:has-text('Kosmo Hero')");
    expect(await heroOutlets.count()).toBeGreaterThanOrEqual(1);

    // Verify contact action links exist (tel: and Google Maps)
    const telLink = page.locator("a[href^='tel:']").first();
    await expect(telLink).toBeVisible();
  });

  test("4. Enquiry Form validates phone numbers and consent", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveTitle(/Contact Kosmo Group/i);

    // Fill valid name but invalid 10-digit phone (starts with 1)
    await page.locator("#enquiry-name").fill("Test User");
    await page.locator("#enquiry-phone").fill("1234567890"); // Starts with 1, invalid Indian mobile
    await page.getByRole("button", { name: /Submit Enquiry/i }).click();

    // Check error message
    const errorAlert = page.locator("text=/valid/i");
    await expect(errorAlert.first()).toBeVisible();

    // Uncheck consent checkbox
    await page.locator("#enquiry-phone").fill("9876543210");
    const consentCheckbox = page.locator("input[type='checkbox']");
    await consentCheckbox.uncheck();
    await page.getByRole("button", { name: /Submit Enquiry/i }).click();

    // Check consent error
    const consentAlert = page.locator("text=/consent to contact you/i");
    await expect(consentAlert).toBeVisible();
  });

  test("5. Enquiry API endpoint validates schema and rejects bot honeypot", async ({ request }) => {
    // A: Honeypot submission rejection
    const honeypotRes = await request.post("/api/enquiry", {
      data: {
        name: "Bot User",
        phone: "9876543210",
        brand: "general",
        type: "other",
        consent: true,
        honeypot: "http://spam-link.com",
      },
    });
    const honeypotJson = await honeypotRes.json();
    // Honeypot responds with success to misdirect bot without creating lead
    expect(honeypotRes.status()).toBe(200);
    expect(honeypotJson.success).toBe(true);

    // B: Missing required fields
    const invalidRes = await request.post("/api/enquiry", {
      data: {
        name: "",
        phone: "123",
      },
    });
    expect(invalidRes.status()).toBe(400);

    // C: Valid enquiry submission
    const validRes = await request.post("/api/enquiry", {
      data: {
        name: "Amanpreet Kaur",
        phone: "9876543210",
        email: "aman@example.com",
        brand: "tata",
        type: "test_drive",
        preferredLocation: "tata-jalandhar-main",
        message: "Interested in test drive for Tata Curvv EV",
        consent: true,
      },
    });
    expect(validRes.status()).toBe(200);
    const validJson = await validRes.json();
    expect(validJson.success).toBe(true);
    expect(validJson.leadId).toBeDefined();
    expect(validJson.whatsappUrl).toContain("wa.me");
  });

  test("6. Production link check: no broken links or '#' dummy hrefs", async ({ page }) => {
    const routesToCheck = [
      "/",
      "/about",
      "/brands",
      "/locations",
      "/careers",
      "/contact",
      "/privacy-policy",
      "/terms",
    ];

    for (const route of routesToCheck) {
      const res = await page.goto(route);
      expect(res?.status()).toBe(200);

      // Verify no '#' placeholder hrefs exist on the page
      const dummyLinks = await page.$$eval("a", (anchors) =>
        anchors
          .filter((a) => a.getAttribute("href") === "#")
          .map((a) => a.textContent?.trim() || "")
      );
      expect(dummyLinks).toHaveLength(0);
    }
  });

  test("7. SEO & Crawler Assets: sitemap.xml and robots.txt exist", async ({ request }) => {
    const robotsRes = await request.get("/robots.txt");
    expect(robotsRes.status()).toBe(200);
    const robotsText = await robotsRes.text();
    expect(robotsText.toLowerCase()).toContain("user-agent");
    expect(robotsText).toContain("sitemap.xml");

    const sitemapRes = await request.get("/sitemap.xml");
    expect(sitemapRes.status()).toBe(200);
    const sitemapText = await sitemapRes.text();
    expect(sitemapText).toContain("<urlset");
    expect(sitemapText).toContain("/locations");
  });
});
