"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, profile } from "@/lib/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.4, 0.7] }
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-md" style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--background) 88%, transparent)" }}>
      <div className="container-shell flex min-h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3 font-semibold" aria-label={`${profile.name} home`}>
          <span className="grid size-10 place-items-center rounded-lg border text-sm" style={{ borderColor: "var(--border)", color: "var(--primary)" }}>
            SC
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium transition"
              style={{ color: active === item.id ? "var(--primary)" : "var(--text-secondary)" }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button className="button md:hidden" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={18} /> : <Menu size={18} />}
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>

      {open ? (
        <nav id="mobile-menu" className="container-shell grid gap-1 pb-4 md:hidden" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a key={item.id} href={item.href} className="rounded-lg px-3 py-2 text-sm font-medium" onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
