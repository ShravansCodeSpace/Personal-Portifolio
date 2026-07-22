import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { works } from "@/lib/data/portfolio";

export function WorksSection() {
  return (
    <section className="relative px-[clamp(1.5rem,5vw,5rem)] py-[clamp(2rem,10vh,8rem)]" id="works">
      <SectionHeading eyebrow="Professional journey" title="Module experience" />
      <div className="mx-auto mt-16 grid max-w-[1600px] gap-[clamp(3rem,10vh,7rem)] pb-[35vh]">
        {works.map((work, index) => (
          <article
            key={work.id}
            className="journey-card sticky overflow-hidden rounded-lg p-6 shadow-lift shadow-rim glass-panel md:p-12"
            style={{
              top: `calc(5.75rem + ${index * 0.75}rem)`,
              zIndex: index + 1
            }}
          >
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-start">
              <div>
                <p className="font-label text-label-caps uppercase text-primary/40">Company // {work.period}</p>
                <h3 className="font-display text-[3rem] font-bold uppercase leading-none text-primary md:text-[4rem]">
                  {work.title}
                </h3>
                <p className="mt-3 font-label text-label-caps uppercase tracking-widest text-primary-container/70">
                  Project: {work.client}
                </p>
              </div>
              <div className="md:text-right">
                <p className="font-label text-label-caps uppercase text-primary/40">Role</p>
                <p className="mt-1 text-on-surface-variant">{work.role}</p>
              </div>
            </div>
            <div className="grid gap-10 md:grid-cols-2">
              <div className={`space-y-6 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <p className="text-xl leading-relaxed text-on-surface-variant">{work.description}</p>
                <ul className="space-y-3 font-label text-sm uppercase tracking-widest text-primary/60">
                  {work.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-center gap-4">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      {outcome}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <Button href={`/work/${work.id}`} variant="ghost">
                  View case study
                </Button>
              </div>
              <Link
                href={`/work/${work.id}`}
                className="group relative min-h-72 overflow-hidden rounded-lg bg-surface-container focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <Image
                  src={work.image}
                  alt={work.imageAlt}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 90vw, 42vw"
                  className="object-cover opacity-75 grayscale transition duration-300 group-hover:scale-[1.02] group-hover:grayscale-0 group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <p className="absolute bottom-6 left-6 font-label text-label-caps uppercase tracking-widest text-white/50">
                  {work.client} // {work.year}
                </p>
                <ArrowUpRight aria-hidden className="absolute right-6 top-6 h-6 w-6 text-white/50 transition group-hover:text-white" />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <Reveal className="mx-auto mt-16 max-w-2xl text-center text-on-surface-variant">
        Each card is backed by resume content and avoids unverified claims, private details, and personal imagery.
      </Reveal>
    </section>
  );
}
