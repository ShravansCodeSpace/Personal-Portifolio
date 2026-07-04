import { NextResponse } from "next/server";
import { createServerSupabase, hasSupabaseServerConfig } from "@/lib/supabase";
import { eventSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const payload = eventSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) {
    return NextResponse.json({ ok: false, error: "Invalid event payload." }, { status: 400 });
  }

  if (!hasSupabaseServerConfig()) {
    return NextResponse.json({ ok: true, mode: "offline" });
  }

  const supabase = createServerSupabase();
  const data = payload.data;

  if (data.type === "visit") {
    const { error } = await supabase!.from("visits").insert({
      session_id: data.sessionId,
      path: data.path || "/",
      referrer: data.referrer || "",
      user_agent_family: request.headers.get("user-agent")?.slice(0, 160) || "",
      created_at: new Date().toISOString()
    });
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const { error } = await supabase!.from("events").insert({
    session_id: data.sessionId,
    event_type: data.type,
    section: data.section || "",
    path: data.path || "/",
    created_at: new Date().toISOString()
  });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
