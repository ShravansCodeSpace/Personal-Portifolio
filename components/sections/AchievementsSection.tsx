import { Award, Rocket, ShieldCheck } from "lucide-react";
import { MotionArticle, Stagger, revealVariants } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { achievements } from "@/lib/data/portfolio";

const iconMap = {
  certification: Award,
  delivery: Rocket,
  milestone: ShieldCheck
};

export function AchievementsSection() {
  return (
    <section className="px-[clamp(1.5rem,5vw,5rem)] py-[clamp(2rem,10vh,8rem)]" id="achievements">
      <SectionHeading eyebrow="Achievements" title="Evidence of ownership" />
      <Stagger className="mx-auto mt-14 grid max-w-[1600px] gap-4 md:grid-cols-2 xl:grid-cols-4">
        {achievements.map((achievement) => {
          const Icon = iconMap[achievement.type];
          return (
            <MotionArticle key={achievement.id} variants={revealVariants} className="glass-panel rounded-lg p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="font-label text-label-caps uppercase text-primary/40">{achievement.date}</p>
                <Icon aria-hidden className="h-5 w-5 text-primary-container/60" />
              </div>
              <h3 className="mt-8 font-display text-[2rem] uppercase leading-none text-primary">{achievement.title}</h3>
              <p className="mt-4 text-sm leading-6 text-on-surface-variant">{achievement.description}</p>
            </MotionArticle>
          );
        })}
      </Stagger>
    </section>
  );
}
