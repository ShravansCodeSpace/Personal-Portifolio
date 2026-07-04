"use client";

import { useEffect, useMemo } from "react";

function getSessionId() {
  const key = "portfolio-session-id";
  let value = window.sessionStorage.getItem(key);
  if (!value) {
    value = crypto.randomUUID();
    window.sessionStorage.setItem(key, value);
  }
  return value;
}

export function trackEvent(type: string, section?: string) {
  if (typeof window === "undefined") return;
  const sessionId = getSessionId();
  navigator.sendBeacon?.(
    "/api/track",
    new Blob([JSON.stringify({ sessionId, type, section, path: window.location.pathname, referrer: document.referrer })], { type: "application/json" })
  );
}

export function Tracker() {
  const sectionIds = useMemo(() => ["about", "skills", "experience", "modules", "achievements", "contact"], []);

  useEffect(() => {
    trackEvent("visit");
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id && !seen.has(entry.target.id)) {
            seen.add(entry.target.id);
            trackEvent("section_view", entry.target.id);
          }
        });
      },
      { threshold: 0.45 }
    );

    sectionIds.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return null;
}
