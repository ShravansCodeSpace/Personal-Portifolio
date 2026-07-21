"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const navItems = [
  { label: "Expertise", href: "#expertise" },
  { label: "Systems", href: "#systems" },
  { label: "Proof", href: "#achievements" },
  { label: "Works", href: "#works" },
  { label: "Contact", href: "#contact" }
];

export function Navbar() {
  const [active, setActive] = useState("expertise");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target.id) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0.1 }
    );

    navItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-outline-variant/20 bg-background">
      <div className="mx-auto flex max-w-[1920px] items-center justify-between px-[clamp(1.5rem,5vw,5rem)] py-5">
        <a href="#top" className="font-display text-[1.25rem] font-extrabold uppercase text-primary sm:text-[1.65rem]">
          Shravankumar Chinnaram
        </a>
        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            return (
              <a
                key={item.href}
                className={`border-b pb-1 font-label text-label-caps uppercase tracking-[0.2em] transition duration-300 hover:scale-105 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
                  active === id ? "border-primary text-primary" : "border-transparent text-primary-container/70"
                }`}
                href={item.href}
              >
                {item.label}
              </a>
            );
          })}
        </div>
        <div className="hidden md:block">
          <Button href="#contact" variant="ghost">
            Contact Me
          </Button>
        </div>
        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          className="rounded border border-outline-variant/40 p-3 text-primary md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-outline-variant/20 bg-background px-[clamp(1.5rem,5vw,5rem)] py-5 md:hidden">
          <div className="grid gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                className="rounded border border-outline-variant/20 px-4 py-3 font-label text-label-caps uppercase text-primary-container"
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
