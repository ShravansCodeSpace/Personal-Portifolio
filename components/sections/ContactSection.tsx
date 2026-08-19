import { ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contact } from "@/lib/data/portfolio";

export function ContactSection() {
  return (
    <footer className="mt-20 border-t border-outline-variant/10 bg-background px-[clamp(1.5rem,5vw,5rem)] py-[clamp(2rem,10vh,8rem)]" id="contact">
      <div className="mx-auto flex max-w-[1920px] flex-col justify-between gap-[1.5rem] md:flex-row md:items-center">
        <div>
          <p className="font-display text-headline-lg uppercase text-primary">Shravankumar Chinnaram</p>
          <p className="mt-4 max-w-2xl text-on-surface-variant">
            Let us talk about SAP Commerce Cloud platforms, complex integrations, production delivery, or AI-assisted engineering workflows.
          </p>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <div className="flex flex-wrap gap-3">
            <Button href={`mailto:${contact.email}`}>
              <Mail aria-hidden className="mr-2 h-4 w-4" />
              Email
            </Button>
            <Button href={contact.linkedin} variant="ghost" target="_blank" rel="noreferrer">
              <ExternalLink aria-hidden className="mr-2 h-4 w-4" />
              LinkedIn
            </Button>
          </div>
          <p className="font-label text-label-caps uppercase text-on-surface-variant/40">
            2026 Senior SAP Commerce Cloud Developer // Portfolio
          </p>
        </div>
      </div>
    </footer>
  );
}
