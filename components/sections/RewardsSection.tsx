import { BadgeCheck, Gem, Star } from "lucide-react";
import { MotionArticle, Stagger, revealVariants } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { rewards } from "@/lib/data/portfolio";

const icons = [Gem, Star, BadgeCheck];

export function RewardsSection() {
  return (
    <section className="px-[clamp(1.5rem,5vw,5rem)] py-[clamp(2rem,10vh,8rem)]" id="rewards">
      <SectionHeading eyebrow="Rewards and recognition" title="Trust signals" />
      <Stagger className="mx-auto mt-14 grid max-w-[1400px] gap-4 md:grid-cols-3">
        {rewards.map((reward, index) => {
          const Icon = icons[index] ?? BadgeCheck;
          return (
            <MotionArticle key={reward.id} variants={revealVariants} className="rounded-lg border border-outline-variant/20 bg-surface-container-low p-8">
              <Icon aria-hidden className="h-8 w-8 text-primary-container/70" />
              <p className="mt-8 font-label text-label-caps uppercase text-primary/40">{reward.signal}</p>
              <h3 className="mt-3 font-display text-[2.2rem] uppercase leading-none text-primary">{reward.title}</h3>
              <p className="mt-4 text-sm leading-6 text-on-surface-variant">{reward.description}</p>
            </MotionArticle>
          );
        })}
      </Stagger>
    </section>
  );
}
