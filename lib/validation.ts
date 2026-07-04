import { z } from "zod";

export const eventSchema = z.object({
  sessionId: z.string().min(8).max(128),
  type: z.enum(["visit", "section_view", "email_click", "linkedin_click", "resume_download", "voice_enable"]),
  path: z.string().max(256).optional(),
  section: z.string().max(96).optional(),
  referrer: z.string().max(512).optional()
});

export const feedbackSchema = z.object({
  name: z.string().max(80).optional(),
  email: z.string().email().max(160).optional().or(z.literal("")),
  message: z.string().min(10, "Please share at least 10 characters.").max(1200),
  website: z.string().max(0).optional()
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required.").max(80),
  email: z.string().email("Enter a valid email address.").max(160),
  message: z.string().min(20, "Please share at least 20 characters.").max(1600),
  website: z.string().max(0).optional()
});
