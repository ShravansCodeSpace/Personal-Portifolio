import { NextResponse } from "next/server";
import { createServerSupabase, hasSupabaseServerConfig } from "@/lib/supabase";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const payload = contactSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) {
    return NextResponse.json({ ok: false, error: payload.error.issues[0]?.message || "Invalid contact request." }, { status: 400 });
  }

  if (!hasSupabaseServerConfig()) {
    return NextResponse.json({ ok: true, mode: "offline" });
  }

  const supabase = createServerSupabase();
  const { error } = await supabase!.from("contact_submissions").insert({
    name: payload.data.name,
    email: payload.data.email,
    message: payload.data.message,
    spam_check: "honeypot_passed",
    created_at: new Date().toISOString()
  });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
