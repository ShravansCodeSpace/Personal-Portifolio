import { Reveal } from "@/components/motion/Reveal";
import { HeroPortraitReveal } from "@/components/sections/HeroPortraitReveal";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-[clamp(1.5rem,5vw,5rem)] pt-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(255_255_255_/_5%),transparent_42%)]" />
      <HeroPortraitReveal />
      <div className="absolute bottom-8 z-30 flex w-full max-w-[1920px] items-end justify-between gap-8 px-[clamp(1.5rem,5vw,5rem)] sm:bottom-12">
        <Reveal className="max-w-md">
          <p className="font-label text-label-caps uppercase tracking-[0.3em] text-primary-container/50">Persona</p>
          <p className="mt-3 max-w-xl text-base leading-tight text-on-surface-variant sm:text-lg">
            Senior SAP Commerce Cloud Developer using AI-assisted engineering to deliver enterprise
            modules, integrations, production rollouts, and cleaner technical workflows.
          </p>
        </Reveal>
        <Reveal className="hidden flex-col items-end gap-4 sm:flex">
          <p className="font-label text-label-caps uppercase tracking-[0.3em] text-primary-container/40">
            Scroll to engineer
          </p>
          <div className="h-12 w-px bg-primary/20" />
        </Reveal>
      </div>
    </section>
  );
}
