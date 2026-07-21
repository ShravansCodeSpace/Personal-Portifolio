import { Cpu, Network, ShieldCheck } from "lucide-react";
import { MotionArticle, Reveal, Stagger, revealVariants } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { capabilities } from "@/lib/data/portfolio";

const icons = [Cpu, Network, ShieldCheck];

export function AboutSection() {
  return (
    <>
      <section className="relative overflow-hidden px-[clamp(1.5rem,5vw,5rem)] py-[clamp(2rem,10vh,8rem)]" id="expertise">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <SectionHeading eyebrow="Core philosophy" title="Bridging stable commerce systems and AI-enabled engineering." />
          <Reveal>
            <p className="mt-10 font-display text-[2.35rem] font-light leading-[1.1] text-on-surface sm:text-[3.5rem] md:text-[4rem]">
              I build SAP Commerce Cloud foundations, then use AI-assisted workflows to improve delivery speed, code quality, and technical clarity.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="rounded-t-[4rem] bg-primary px-[clamp(1.5rem,5vw,5rem)] py-[clamp(2rem,10vh,8rem)] text-[var(--pitch-black)]" id="systems">
        <div className="mx-auto max-w-[1920px]">
          <SectionHeading eyebrow="Technical evolution" title="Core capabilities" align="left" tone="light" />
          <Stagger className="mt-16 space-y-8">
            {capabilities.map((capability, index) => {
              const Icon = icons[index] ?? Cpu;
              return (
                <MotionArticle
                  key={capability.title}
                  variants={revealVariants}
                  className="group flex flex-col border-b border-black/10 py-10 transition duration-300 hover:px-3 md:flex-row"
                >
                  <span className="font-display text-[4rem] font-bold leading-none text-black/5 transition-colors group-hover:text-black md:w-1/4 md:text-[6rem]">
                    {capability.number}
                  </span>
                  <div className="flex flex-1 flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div>
                      <h3 className="font-display text-[2.4rem] uppercase leading-none">{capability.title}</h3>
                      <p className="mt-3 max-w-xl text-base leading-relaxed text-black/60">{capability.description}</p>
                    </div>
                    <Icon aria-hidden className="h-10 w-10 text-black/20 transition-colors group-hover:text-black" />
                  </div>
                </MotionArticle>
              );
            })}
          </Stagger>
          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <Reveal className="space-y-8">
              <h4 className="font-label text-label-caps uppercase tracking-widest text-black">Technical proficiency</h4>
              {[
                ["SAP Hybris/Commerce", "98%"],
                ["Core Java / Spring MVC", "95%"],
                ["AI-assisted engineering", "90%"]
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between font-semibold">
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                  <div className="h-1 rounded-full bg-black/10">
                    <div className="h-full rounded-full bg-black" style={{ width: value }} />
                  </div>
                </div>
              ))}
            </Reveal>
            <Reveal className="rounded-lg bg-black p-8 text-white md:p-12">
              <h4 className="font-label text-label-caps uppercase tracking-widest text-white/40">Leadership</h4>
              <p className="mt-6 font-display text-[2.2rem] leading-tight">
                Technical POC for a 7-member engineering team across commerce delivery work.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
