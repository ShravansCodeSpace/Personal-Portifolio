"use client";

import { createClient } from "@supabase/supabase-js";
import { BarChart3, Lock, MailCheck, RefreshCw } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

type Metrics = {
  visits: number;
  uniqueSessions: number;
  feedback: number;
  contacts: number;
  emailClicks: number;
  linkedinClicks: number;
  resumeDownloads: number;
  sectionViews: number;
};

type DashboardResponse = {
  ok: boolean;
  mode?: string;
  metrics: Metrics;
  feedback: Array<{ name: string; message: string; status: string; created_at: string }>;
  error?: string;
};

const ownerEmail = "chshravankumar97@gmail.com";

export function Dashboard() {
  const [email, setEmail] = useState(ownerEmail);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    return url && anon ? createClient(url, anon) : null;
  }, []);

  async function requestMagicLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    if (email !== ownerEmail) {
      setStatus("Dashboard access is restricted to the portfolio owner.");
      return;
    }
    if (!supabase) {
      setStatus("Supabase is not configured yet. Add env vars to enable owner login.");
      return;
    }
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/#dashboard`
      }
    });
    setStatus(error ? error.message : "Magic link sent. After opening it, return here and load metrics.");
  }

  async function loadMetrics() {
    setLoading(true);
    setStatus("");
    try {
      let authToken = token;
      if (!authToken && supabase) {
        const session = await supabase.auth.getSession();
        authToken = session.data.session?.access_token || "";
      }
      const response = await fetch("/api/dashboard", {
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : { "x-owner-email": email }
      });
      const json = (await response.json()) as DashboardResponse;
      if (!response.ok || !json.ok) throw new Error(json.error || "Unable to load dashboard.");
      setData(json);
      setStatus(json.mode === "offline" ? "Supabase server env vars are not configured, so metrics are in offline mode." : "Metrics loaded.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  }

  const metrics = data?.metrics;

  return (
    <section className="section-block border-t" id="dashboard" style={{ borderColor: "var(--border)" }}>
      <div className="container-shell grid gap-8">
        <div>
          <p className="eyebrow">Owner dashboard</p>
          <h2 className="heading-lg">Login to review portfolio performance.</h2>
          <p className="muted mt-3 max-w-2xl">
            Dashboard access is restricted to {ownerEmail}. Metrics come from Supabase when environment variables and schema are configured.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <form className="card grid gap-4" onSubmit={requestMagicLink}>
            <Lock aria-hidden size={22} style={{ color: "var(--primary)" }} />
            <label className="grid gap-2 text-sm font-medium">
              Owner email
              <input className="field" value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
            </label>
            <button className="button button-primary w-fit" type="submit">
              <MailCheck size={16} />
              Send magic link
            </button>
            <label className="grid gap-2 text-sm font-medium">
              Access token optional
              <input className="field" value={token} onChange={(event) => setToken(event.target.value)} placeholder="Paste Supabase access token for local testing" />
            </label>
            <button className="button button-secondary w-fit" type="button" onClick={loadMetrics} disabled={loading}>
              <RefreshCw size={16} />
              {loading ? "Loading..." : "Load metrics"}
            </button>
            <p className="min-h-6 text-sm muted" role="status" aria-live="polite">
              {status}
            </p>
          </form>

          <div className="grid gap-4">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ["Visits", metrics?.visits ?? 0],
                ["Unique sessions", metrics?.uniqueSessions ?? 0],
                ["Section views", metrics?.sectionViews ?? 0],
                ["Feedback", metrics?.feedback ?? 0],
                ["Contacts", metrics?.contacts ?? 0],
                ["Email clicks", metrics?.emailClicks ?? 0],
                ["LinkedIn clicks", metrics?.linkedinClicks ?? 0],
                ["Resume downloads", metrics?.resumeDownloads ?? 0]
              ].map(([label, value]) => (
                <div className="card" key={label}>
                  <BarChart3 aria-hidden className="mb-3" size={18} style={{ color: "var(--secondary)" }} />
                  <strong className="block text-3xl font-semibold">{value}</strong>
                  <span className="muted text-sm">{label}</span>
                </div>
              ))}
            </div>
            <div className="card">
              <h3 className="heading-md mb-3">Recent feedback</h3>
              {data?.feedback?.length ? (
                <div className="grid gap-3">
                  {data.feedback.map((item) => (
                    <p className="muted text-sm" key={`${item.created_at}-${item.message}`}>
                      <strong style={{ color: "var(--text)" }}>{item.name || "Visitor"}:</strong> {item.message}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="muted text-sm">No feedback loaded yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
