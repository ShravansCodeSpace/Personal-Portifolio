import { NextResponse } from "next/server";
import { createServerSupabase, hasSupabaseServerConfig } from "@/lib/supabase";
import { feedbackSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const payload = feedbackSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) {
    return NextResponse.json({ ok: false, error: payload.error.issues[0]?.message || "Invalid feedback." }, { status: 400 });
  }

  if (!hasSupabaseServerConfig()) {
    return NextResponse.json({ ok: true, mode: "offline" });
  }

  const supabase = createServerSupabase();
  const { error } = await supabase!.from("feedback").insert({
    name: payload.data.name || "Visitor",
    email: payload.data.email || "",
    message: payload.data.message,
    status: "new",
    created_at: new Date().toISOString()
  });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
