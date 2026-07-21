import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import heroImage from "@/assets/commerce-cloud-hero.png";
import { Badge } from "@/components/ui/Badge";
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
    description: work.description
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { id } = await params;
  const work = works.find((item) => item.id === id);

  if (!work) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--pitch-black)] px-[clamp(1.5rem,5vw,5rem)] py-16 text-on-surface">
      <Link href="/#works" className="font-label text-label-caps uppercase text-primary-container/70 hover:text-primary">
        Back to works
      </Link>
      <section className="mx-auto mt-16 max-w-[1400px]">
        <p className="font-label text-label-caps uppercase tracking-[0.3em] text-primary/40">Company // {work.period}</p>
        <h1 className="mt-4 font-display text-headline-lg uppercase gradient-text-hero">{work.title}</h1>
        <p className="mt-4 font-label text-label-caps uppercase tracking-widest text-primary-container/70">
          Project: {work.client}
        </p>
        <p className="mt-6 max-w-3xl text-xl leading-relaxed text-on-surface-variant">{work.description}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {work.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-lg border border-outline-variant/20 bg-surface-container">
          <Image
            src={heroImage}
            alt={work.imageAlt}
            fill
            sizes="(max-width: 768px) 90vw, 80vw"
            className="object-cover opacity-40 grayscale"
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-[1fr_2fr]">
          <div className="rounded-lg border border-outline-variant/20 bg-surface-container-low p-6">
            <p className="font-label text-label-caps uppercase text-primary/40">Role</p>
            <p className="mt-3 text-xl text-primary">{work.role}</p>
            <p className="mt-8 font-label text-label-caps uppercase text-primary/40">Project</p>
            <p className="mt-3 text-on-surface-variant">{work.client}</p>
          </div>
          <div className="rounded-lg border border-outline-variant/20 bg-surface-container-low p-6">
            <h2 className="font-display text-[2rem] uppercase text-primary">Outcomes</h2>
            <ul className="mt-6 space-y-4 text-on-surface-variant">
              {work.outcomes.map((outcome) => (
                <li key={outcome} className="border-b border-outline-variant/10 pb-4">
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
