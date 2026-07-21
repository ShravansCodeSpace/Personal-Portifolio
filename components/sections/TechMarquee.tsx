import { techStack } from "@/lib/data/portfolio";

export function TechMarquee() {
  const repeated = [...techStack, ...techStack];

  return (
    <section className="marquee-container overflow-hidden border-y border-outline-variant/10 py-10" aria-label="Technology stack">
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
        {repeated.map((skill, index) => (
          <span key={`${skill}-${index}`} className="flex items-center gap-12 font-display text-[1.35rem] uppercase tracking-widest text-primary/40">
            {skill}
            <span aria-hidden className="h-2 w-2 rounded-full bg-primary/20" />
          </span>
        ))}
      </div>
    </section>
  );
}
