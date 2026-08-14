"use server";

import { z } from "zod";

type FormState = {
  status: "idle" | "success" | "error" | "configuration_required";
  message: string;
};

const newsletterSchema = z.object({
  email: z.email().max(254),
  newsletterId: z.string().min(1).max(120),
  placement: z.string().min(1).max(80),
  website: z.string().max(0).optional(),
});

const contactSchema = z.object({
  kind: z.enum([
    "general",
    "tip",
    "correction",
    "advertising",
    "careers",
    "technical",
  ]),
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  subject: z.string().trim().min(4).max(180),
  message: z.string().trim().min(20).max(8000),
  consent: z.literal("on"),
  website: z.string().max(0).optional(),
});

function stringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function subscribeToNewsletter(
  _previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const result = newsletterSchema.safeParse({
    email: stringValue(formData, "email"),
    newsletterId: stringValue(formData, "newsletterId"),
    placement: stringValue(formData, "placement"),
    website: stringValue(formData, "website"),
  });

  if (!result.success) {
    return {
      status: "error",
      message: "Enter a valid email address and try again.",
    };
  }

  const endpoint = process.env.NEWSLETTER_PROVIDER_API_URL;
  const token = process.env.NEWSLETTER_PROVIDER_API_TOKEN;
  if (!endpoint || !token) {
    return {
      status: "configuration_required",
      message:
        "Signup preview: connect a newsletter provider before collecting subscriptions.",
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(result.data),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return {
        status: "error",
        message: "We could not complete the signup. Please try again shortly.",
      };
    }

    return {
      status: "success",
      message: "Check your inbox to confirm your subscription.",
    };
  } catch {
    return {
      status: "error",
      message: "The signup service is temporarily unavailable.",
    };
  }
}

export async function submitContactForm(
  _previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const result = contactSchema.safeParse({
    kind: stringValue(formData, "kind"),
    name: stringValue(formData, "name"),
    email: stringValue(formData, "email"),
    subject: stringValue(formData, "subject"),
    message: stringValue(formData, "message"),
    consent: stringValue(formData, "consent"),
    website: stringValue(formData, "website"),
  });

  if (!result.success) {
    return {
      status: "error",
      message: "Review the highlighted information and try again.",
    };
  }

  const endpoint = process.env.EMAIL_PROVIDER_API_URL;
  const token = process.env.EMAIL_PROVIDER_API_TOKEN;
  if (!endpoint || !token) {
    return {
      status: "configuration_required",
      message:
        "Form preview: connect the server-side email adapter before accepting submissions.",
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(result.data),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    return response.ok
      ? {
          status: "success",
          message: "Your message has been sent to the appropriate GlobHub desk.",
        }
      : {
          status: "error",
          message: "We could not send your message. Please try again shortly.",
        };
  } catch {
    return {
      status: "error",
      message: "The message service is temporarily unavailable.",
    };
  }
}

export async function revalidateContent(type = "story", slug?: string) {
  const { revalidatePath, revalidateTag } = await import("next/cache");
  try {
    revalidateTag(type, "max");
    if (slug) {
      revalidateTag(`${type}:${slug}`, "max");
      if (type === "story") revalidatePath(`/story/${slug}`);
      if (type === "category") revalidatePath(`/category/${slug}`);
    }
    revalidatePath("/");
    revalidatePath("/latest");
    revalidatePath("/news");
  } catch {
    // Graceful fallback when invoked outside request context
  }
  return { revalidated: true, timestamp: Date.now() };
}

