"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/components/Tracker";

type TrackLinkProps = {
  href: string;
  eventType: "email_click" | "linkedin_click" | "resume_download";
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

export function TrackLink({ href, eventType, children, className, target, rel }: TrackLinkProps) {
  return (
    <a className={className} href={href} target={target} rel={rel} onClick={() => trackEvent(eventType)}>
      {children}
    </a>
  );
}
