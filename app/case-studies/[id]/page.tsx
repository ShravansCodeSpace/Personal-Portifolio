import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { CaseStudyMedia } from "@/components/case-studies/CaseStudyMedia";
import { CommentsThread } from "@/components/case-studies/CommentsThread";
import { Badge } from "@/components/ui/Badge";
import { caseStudies } from "@/lib/data/caseStudies";

interface CaseStudyPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ id: study.id }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { id } = await params;
  const study = caseStudies.find((item) => item.id === id);

  if (!study) {
    return {};
  }

  return {
    title: `${study.title} | SAP Commerce Case Study`,
    description: study.summary
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { id } = await params;
  const study = caseStudies.find((item) => item.id === id);

  if (!study) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--pitch-black)] px-[clamp(1.25rem,5vw,5rem)] py-10 text-on-surface sm:py-16">
      <article className="mx-auto max-w-[1180px]">
        <Link
          href="/#case-studies"
          className="inline-flex items-center gap-3 font-label text-label-caps uppercase text-primary-container/70 transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <ArrowLeft aria-hidden className="h-4 w-4" />
          Back to implementation notes
        </Link>

        <header className="mx-auto mt-14 max-w-4xl border-b border-outline-variant/20 pb-10 text-left sm:pb-12">
          <p className="font-label text-label-caps uppercase tracking-[0.3em] text-primary/40">{study.eyebrow}</p>
          <h1 className="mt-5 font-display text-[clamp(3.5rem,12vw,8rem)] uppercase leading-[0.86] gradient-text-hero">
            {study.title}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-on-surface-variant sm:text-xl sm:leading-9">
            {study.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </header>

        <CaseStudyMedia
          src={study.image}
          alt={study.imageAlt}
          priority
          sizes="(max-width: 1024px) 92vw, 1120px"
          className="relative mt-10 aspect-video overflow-hidden rounded-lg border border-outline-variant/20 bg-surface-container shadow-lift"
          imageClassName="object-contain"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        </CaseStudyMedia>

        <section className="mx-auto grid max-w-5xl gap-5 border-b border-outline-variant/20 py-10 lg:grid-cols-2">
          <div className="rounded-lg border border-outline-variant/20 bg-surface-container-low p-6">
            <p className="font-label text-label-caps uppercase text-primary/40">Problem pattern</p>
            <p className="mt-4 leading-7 text-on-surface-variant">{study.problem}</p>
          </div>
          <div className="rounded-lg border border-outline-variant/20 bg-surface-container-low p-6">
            <p className="font-label text-label-caps uppercase text-primary/40">Resolution pattern</p>
            <p className="mt-4 leading-7 text-on-surface-variant">{study.resolution}</p>
          </div>
        </section>

        <div className="grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <div className="max-w-3xl space-y-14">
            {study.sections.map((section) => (
              <section key={section.heading} className="scroll-mt-28 border-b border-outline-variant/10 pb-10 last:border-b-0 last:pb-0">
                <h2 className="font-display text-[clamp(2.2rem,7vw,3.5rem)] uppercase leading-none text-primary">
                  {section.heading}
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-on-surface-variant sm:text-lg sm:leading-9">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <aside className="rounded-lg border border-outline-variant/20 bg-surface-container-low p-6 lg:sticky lg:top-28">
            <p className="font-label text-label-caps uppercase tracking-[0.2em] text-primary/40">Key takeaways</p>
            <ul className="mt-6 space-y-4">
              {study.takeaways.map((takeaway) => (
                <li key={takeaway} className="flex gap-3 text-sm leading-6 text-on-surface-variant">
                  <CheckCircle2 aria-hidden className="mt-1 h-4 w-4 shrink-0 text-primary-container/70" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
        <CommentsThread caseStudyId={study.id} />
      </article>
    </main>
  );
}
