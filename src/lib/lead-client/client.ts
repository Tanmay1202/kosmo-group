import { EnquiryInput, EnquiryResponse, EnquirySchema } from "./schema";

export async function submitEnquiry(
  input: EnquiryInput,
  endpoint: string = "/api/enquiry"
): Promise<EnquiryResponse> {
  // Validate on the client before network request
  const validation = EnquirySchema.safeParse(input);
  if (!validation.success) {
    const firstError = validation.error.errors[0]?.message || "Invalid form submission";
    return {
      success: false,
      message: firstError,
    };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validation.data),
    });

    const data: EnquiryResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Enquiry submission failed:", error);
    return {
      success: false,
      message: "We encountered a network issue submitting your enquiry. Please try again or reach us directly via WhatsApp.",
    };
  }
}
