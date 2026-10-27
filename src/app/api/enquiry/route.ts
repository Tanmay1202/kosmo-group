import { NextRequest, NextResponse } from "next/server";
import { EnquirySchema, type EnquiryResponse } from "@/lib/lead-client";

// Simple in-memory sliding-window IP rate limiter
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Filter timestamps within window
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  rateLimitMap.set(ip, recent);

  // Prune map if getting large
  if (rateLimitMap.size > 1000) {
    for (const [key, ts] of rateLimitMap.entries()) {
      if (ts.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

// Cloudflare Turnstile token validation
async function verifyTurnstile(token: string, secretKey: string, ip?: string): Promise<boolean> {
  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (ip) formData.append("remoteip", ip);

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });
    const outcome = await res.json();
    return outcome.success === true;
  } catch (err) {
    console.error("Turnstile verification failed:", err);
    return false;
  }
}

// WhatsApp redirect link generator
function generateWhatsAppUrl(brand: string, name: string, type: string, phone: string): string {
  // Brand customer contact numbers
  const number = brand === "tata" ? "917045169141" : "919289922739";
  const label = brand === "tata" ? "Kosmo Tata" : brand === "hero" ? "Kosmo Hero" : "Kosmo Group";
  const message = `Hello ${label}, I submitted an enquiry for ${type.replace(/_/g, " ")}. My Name: ${name}, Phone: ${phone}.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export async function POST(req: NextRequest) {
  try {
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    // 1. Rate Limiting (exempt local test runner)
    const isLocal = clientIp === "127.0.0.1" || clientIp === "::1" || clientIp.includes("localhost");
    if (!isLocal && isRateLimited(clientIp)) {
      return NextResponse.json<EnquiryResponse>(
        {
          success: false,
          message: "Too many enquiries submitted from this network. Please wait a few minutes or call us directly.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Honeypot check (anti-bot)
    if (body.honeypot && String(body.honeypot).trim().length > 0) {
      console.warn(`[SPAM BLOCKED] Honeypot triggered from IP: ${clientIp}`);
      // Respond with success to mislead spam bot
      return NextResponse.json<EnquiryResponse>({
        success: true,
        message: "Enquiry submitted successfully.",
      });
    }

    // 3. Zod Schema Validation
    const parsed = EnquirySchema.safeParse(body);
    if (!parsed.success) {
      const errorMsg = parsed.error.errors[0]?.message || "Invalid submission parameters";
      return NextResponse.json<EnquiryResponse>(
        {
          success: false,
          message: errorMsg,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 4. Turnstile Verification (if secret key configured)
    const turnstileSecret = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
    if (turnstileSecret && data.turnstileToken) {
      const isValid = await verifyTurnstile(data.turnstileToken, turnstileSecret, clientIp);
      if (!isValid) {
        return NextResponse.json<EnquiryResponse>(
          {
            success: false,
            message: "Human verification failed. Please refresh and try again.",
          },
          { status: 403 }
        );
      }
    }

    const leadId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const createdAt = new Date().toISOString();

    // 5. Lead Storage (Supabase REST or Console Persistence)
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/leads`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            id: leadId,
            brand: data.brand,
            type: data.type,
            name: data.name,
            phone: data.phone,
            email: data.email || null,
            location_id: data.preferredLocation || null,
            message: data.message || null,
            source: data.source || "hub",
            utm_source: data.utm_source || null,
            utm_medium: data.utm_medium || null,
            utm_campaign: data.utm_campaign || null,
            created_at: createdAt,
          }),
        });
      } catch (dbErr) {
        console.error("[LEAD_STORAGE_ERROR] Failed to persist to Supabase:", dbErr);
      }
    } else {
      console.log(`[LEAD_CAPTURED] ${leadId} | Brand: ${data.brand} | Name: ${data.name} | Phone: ${data.phone} | Type: ${data.type}`);
    }

    // 6. Email Notification (Resend REST API)
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Kosmo Group <leads@kosmogroup.in>";

    // Resolve brand recipients
    let recipient = process.env.LEADS_TO_GENERAL || "contact@kosmogroup.in";
    if (data.brand === "tata" && process.env.LEADS_TO_TATA) {
      recipient = process.env.LEADS_TO_TATA;
    } else if (data.brand === "hero" && process.env.LEADS_TO_HERO) {
      recipient = process.env.LEADS_TO_HERO;
    }

    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: fromEmail,
            to: recipient.split(",").map((s) => s.trim()),
            subject: `[New Lead - ${data.brand.toUpperCase()}] ${data.type.replace(/_/g, " ")} from ${data.name}`,
            text: `New enquiry captured on Kosmo Group Hub:\n\nBrand: ${data.brand}\nType: ${data.type}\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email || "N/A"}\nPreferred Location: ${data.preferredLocation || "Any"}\nMessage: ${data.message || "None"}\nLead ID: ${leadId}\nDate: ${createdAt}`,
          }),
        });
      } catch (emailErr) {
        console.error("[EMAIL_DISPATCH_ERROR] Failed to send email via Resend:", emailErr);
      }
    }

    const whatsappUrl = generateWhatsAppUrl(data.brand, data.name, data.type, data.phone);

    return NextResponse.json<EnquiryResponse>({
      success: true,
      message: "Enquiry submitted successfully. A representative will contact you shortly.",
      leadId,
      whatsappUrl,
    });
  } catch (error) {
    console.error("[API_ENQUIRY_FATAL]", error);
    // Never echo internal system errors to the user
    return NextResponse.json<EnquiryResponse>(
      {
        success: false,
        message: "An error occurred while processing your request. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}
