import { z } from "zod";

/**
 * Validates 10-digit Indian mobile numbers (starts with 6, 7, 8, or 9).
 * Strips out leading +91, 0, spaces, and hyphens before validating.
 */
export const phoneRegex = /^[6-9]\d{9}$/;

export const cleanPhoneNumber = (val: string): string => {
  let cleaned = val.replace(/[\s\-\(\)]/g, "");
  if (cleaned.startsWith("+91")) {
    cleaned = cleaned.slice(3);
  } else if (cleaned.startsWith("91") && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.startsWith("0") && cleaned.length === 11) {
    cleaned = cleaned.slice(1);
  }
  return cleaned;
};

export const EnquiryBrandEnum = z.enum(["tata", "hero", "general"]);
export type EnquiryBrand = z.infer<typeof EnquiryBrandEnum>;

export const EnquiryTypeEnum = z.enum([
  "test_drive",
  "test_ride",
  "service",
  "finance",
  "exchange",
  "career",
  "other",
]);
export type EnquiryType = z.infer<typeof EnquiryTypeEnum>;

export const EnquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),

  phone: z
    .string()
    .trim()
    .min(10, "Please enter a valid phone number")
    .transform(cleanPhoneNumber)
    .refine((val) => phoneRegex.test(val), {
      message: "Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)",
    }),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),

  brand: EnquiryBrandEnum,

  type: EnquiryTypeEnum,

  preferredLocation: z.string().trim().optional().or(z.literal("")),

  message: z.string().trim().max(1000, "Message cannot exceed 1000 characters").optional().or(z.literal("")),

  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must consent to be contacted regarding your enquiry",
    }),

  // Spam protection fields
  honeypot: z.string().max(0, "Spam detected").optional().or(z.literal("")),
  turnstileToken: z.string().optional(),

  // Analytics & origin attribution
  source: z.string().default("hub"),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
});

export type EnquiryInput = z.input<typeof EnquirySchema>;
export type EnquiryData = z.output<typeof EnquirySchema>;

export type EnquiryResponse = {
  success: boolean;
  message: string;
  leadId?: string;
  whatsappUrl?: string;
};
