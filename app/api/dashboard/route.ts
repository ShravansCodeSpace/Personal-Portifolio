import { NextResponse } from "next/server";
import { createServerSupabase, hasSupabaseServerConfig } from "@/lib/supabase";

const ownerEmail = process.env.OWNER_EMAIL || "chshravankumar97@gmail.com";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const emailHeader = request.headers.get("x-owner-email");

  if (!hasSupabaseServerConfig()) {
    if (emailHeader !== ownerEmail) {
      return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
    }
    return NextResponse.json({
      ok: true,
      mode: "offline",
      metrics: {
        visits: 0,
        uniqueSessions: 0,
        feedback: 0,
        contacts: 0,
        emailClicks: 0,
        linkedinClicks: 0,
        resumeDownloads: 0,
        sectionViews: 0
      },
      feedback: []
    });
  }

  const supabase = createServerSupabase()!;
  const token = authHeader?.replace("Bearer ", "");
  const user = token ? await supabase.auth.getUser(token) : null;
  const email = user?.data.user?.email;

  if (email !== ownerEmail) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const [visits, feedback, contacts, events] = await Promise.all([
    supabase.from("visits").select("session_id", { count: "exact", head: false }),
    supabase.from("feedback").select("name,message,created_at,status", { count: "exact" }).order("created_at", { ascending: false }).limit(12),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
    supabase.from("events").select("event_type,session_id", { count: "exact", head: false })
  ]);

  if (visits.error || feedback.error || contacts.error || events.error) {
    return NextResponse.json({ ok: false, error: "Dashboard query failed." }, { status: 500 });
  }

  const eventRows = events.data || [];
  const uniqueSessions = new Set((visits.data || []).map((row) => row.session_id)).size;
  const countEvents = (type: string) => eventRows.filter((row) => row.event_type === type).length;

  return NextResponse.json({
    ok: true,
    metrics: {
      visits: visits.count || 0,
      uniqueSessions,
      feedback: feedback.count || 0,
      contacts: contacts.count || 0,
      emailClicks: countEvents("email_click"),
      linkedinClicks: countEvents("linkedin_click"),
      resumeDownloads: countEvents("resume_download"),
      sectionViews: countEvents("section_view")
    },
    feedback: feedback.data || []
  });
}
