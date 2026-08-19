import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { works } from "@/lib/data/portfolio";

interface WorkPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return works.map((work) => ({ id: work.id }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { id } = await params;
  const work = works.find((item) => item.id === id);

  if (!work) {
    return {};
  }

  return {
    title: `${work.client} at ${work.title} | Shravankumar Chinnaram`,
    description: work.caseStudySummary
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { id } = await params;
  const work = works.find((item) => item.id === id);

  if (!work) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--pitch-black)] px-[clamp(1.5rem,5vw,5rem)] py-10 text-on-surface sm:py-16">
      <section className="mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1280px] flex-col justify-center">
        <Link href="/#works" className="mb-10 w-fit font-label text-label-caps uppercase text-primary-container/70 hover:text-primary">
          Back to works
        </Link>
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="font-label text-label-caps uppercase tracking-[0.3em] text-primary/40">
              {work.title} // {work.period}
            </p>
            <h1 className="mt-4 font-display text-headline-lg uppercase gradient-text-hero">{work.client}</h1>
            <p className="mt-5 font-label text-label-caps uppercase tracking-[0.3em] text-primary/40">Project briefing</p>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-on-surface-variant">{work.caseStudySummary}</p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-outline-variant/20 bg-surface-container shadow-lift">
            <Image
              src={work.image}
              alt={work.imageAlt}
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 90vw, 55vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          </div>
        </div>
      </section>
    </main>
  );
}
