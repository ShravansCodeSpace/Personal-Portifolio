import Link from "next/link";
import { ArrowUpRight, Database, FileText, ShieldCheck } from "lucide-react";
import { CaseStudyMedia } from "@/components/case-studies/CaseStudyMedia";
import { Reveal, Stagger, MotionArticle, revealVariants } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudies } from "@/lib/data/caseStudies";

export function CaseStudiesSection() {
  const featuredStudies = caseStudies.slice(0, 2);
  const moreStudies = caseStudies.slice(2);

  return (
    <section className="px-[clamp(1.5rem,5vw,5rem)] py-[clamp(2rem,10vh,8rem)]" id="case-studies">
      <SectionHeading eyebrow="Implementation notes" title="How I solve commerce problems" />
      <Reveal className="mx-auto mt-6 max-w-3xl text-pretty text-center text-lg leading-relaxed text-on-surface-variant">
        Public-safe architecture notes based on real SAP Commerce delivery work, focused on the problem,
        implementation thinking, tradeoffs, and lessons learned without exposing client details or internal code.
      </Reveal>
      <Stagger className="mx-auto mt-14 grid max-w-[1400px] gap-5 lg:grid-cols-2">
        {featuredStudies.map((study) => (
          <MotionArticle
            key={study.id}
            variants={revealVariants}
            className="group grid gap-8 overflow-hidden rounded-lg border border-outline-variant/20 bg-surface-container-low p-6 shadow-rim transition duration-300 hover:-translate-y-1 hover:border-primary/40 md:p-10"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-label text-label-caps uppercase tracking-[0.3em] text-primary/40">{study.eyebrow}</p>
                <h3 className="mt-4 font-display text-[2.8rem] uppercase leading-none text-primary md:text-[4rem]">
                  {study.title}
                </h3>
              </div>
              <Database aria-hidden className="mt-2 h-8 w-8 shrink-0 text-primary-container/50" />
            </div>
            <CaseStudyMedia
              src={study.image}
              alt={study.imageAlt}
              sizes="(max-width: 1024px) 90vw, 42vw"
              className="relative aspect-[16/9] overflow-hidden rounded-lg border border-outline-variant/20 bg-background"
              imageClassName="object-cover opacity-90 transition duration-300 group-hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </CaseStudyMedia>
            <p className="max-w-3xl text-left text-lg leading-relaxed text-on-surface-variant">{study.summary}</p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded border border-outline-variant/20 bg-background/40 p-5">
                <p className="font-label text-label-caps uppercase text-primary/40">Problem</p>
                <p className="mt-3 text-sm leading-6 text-on-surface-variant">{study.problem}</p>
              </div>
              <div className="rounded border border-outline-variant/20 bg-background/40 p-5">
                <p className="font-label text-label-caps uppercase text-primary/40">Resolution</p>
                <p className="mt-3 text-sm leading-6 text-on-surface-variant">{study.resolution}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <Link
              href={`/case-studies/${study.id}`}
              className="inline-flex w-fit items-center gap-3 rounded border border-outline-variant/40 px-6 py-3 font-label text-label-caps uppercase text-primary transition duration-300 hover:bg-primary hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Read full implementation note
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </Link>
          </MotionArticle>
        ))}
      </Stagger>

      {moreStudies.length > 0 && (
        <Stagger className="mx-auto mt-8 grid max-w-[1400px] gap-4 md:grid-cols-2 xl:grid-cols-3">
          {moreStudies.map((study) => (
            <MotionArticle
              key={study.id}
              variants={revealVariants}
              className="group flex min-h-[22rem] flex-col rounded-lg border border-outline-variant/20 bg-surface-container-low p-5 shadow-rim transition duration-300 hover:-translate-y-1 hover:border-primary/40 md:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-label text-label-caps uppercase tracking-[0.24em] text-primary/40">{study.eyebrow}</p>
                  <h3 className="mt-3 font-display text-[2.3rem] uppercase leading-none text-primary md:text-[2.8rem]">
                    {study.title}
                  </h3>
                </div>
                <FileText aria-hidden className="mt-1 h-6 w-6 shrink-0 text-primary-container/50" />
              </div>
              <p className="mt-5 line-clamp-4 text-sm leading-6 text-on-surface-variant">{study.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {study.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <Link
                href={`/case-studies/${study.id}`}
                className="mt-auto inline-flex w-fit items-center gap-3 rounded border border-outline-variant/40 px-5 py-3 font-label text-label-caps uppercase text-primary transition duration-300 hover:bg-primary hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Read note
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </Link>
            </MotionArticle>
          ))}
        </Stagger>
      )}

      <Stagger className="mx-auto mt-5 grid max-w-[1400px] gap-5">
        <MotionArticle
          variants={revealVariants}
          className="flex min-h-full flex-col rounded-lg border border-outline-variant/20 bg-primary p-6 text-[var(--pitch-black)] md:p-10"
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-label text-label-caps uppercase tracking-[0.3em] text-black/40">Confidential by design</p>
              <p className="mt-4 font-display text-[2.3rem] uppercase leading-none md:text-[3.4rem]">
                No client internals, no private code, only reusable engineering thinking.
              </p>
            </div>
            <ShieldCheck aria-hidden className="mt-1 h-10 w-10 shrink-0 text-black/40" />
          </div>
          <div className="mt-10 grid gap-3">
            {[
              ["Requirement", "Explain the business/technical need without naming private systems."],
              ["Implementation", "Describe architecture decisions, modules, indexes, APIs, and tradeoffs."],
              ["Proof", "Show outcomes, validations, and lessons that other engineers can review."]
            ].map(([label, description]) => (
              <div key={label} className="rounded border border-black/10 bg-black/[0.04] p-5">
                <p className="font-label text-label-caps uppercase text-black/45">{label}</p>
                <p className="mt-2 text-sm leading-6 text-black/70">{description}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 border-t border-black/10 pt-6 text-sm leading-6 text-black/60">
            This keeps the portfolio useful for developers and architects while protecting client data, internal code,
            credentials, and project-specific implementation details.
          </p>
        </MotionArticle>
      </Stagger>
    </section>
  );
}
