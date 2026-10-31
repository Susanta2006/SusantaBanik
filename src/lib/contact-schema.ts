import { z } from "zod";

/**
 * Contact form rules. Shared by the browser (instant feedback) and the
 * server (the check that actually counts).
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name (at least 2 characters).")
    .max(120, "Name is too long."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254, "Email is too long."),
  subject: z
    .string()
    .trim()
    .max(200, "Subject is too long.")
    .optional()
    .transform((v) => v ?? ""),
  message: z
    .string()
    .trim()
    .min(10, "Write at least 10 characters so I can understand your request.")
    .max(4000, "Message is too long (4,000 characters maximum)."),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Field name → first error message. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
