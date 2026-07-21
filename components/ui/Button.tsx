import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "ghost" | "dark";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
}

export function Button({ href, children, variant = "primary", className = "", ...props }: ButtonProps) {
  const classes: Record<ButtonVariant, string> = {
    primary:
      "cta-gradient text-on-primary shadow-lift hover:brightness-110 focus-visible:outline-primary",
    ghost:
      "border border-outline-variant/40 text-primary hover:bg-primary hover:text-background focus-visible:outline-primary",
    dark:
      "border border-black/20 text-black hover:bg-black hover:text-white focus-visible:outline-black"
  };

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded px-6 py-3 font-label text-label-caps uppercase transition duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${classes[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
